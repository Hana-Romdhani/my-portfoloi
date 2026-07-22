// @/lib/validateContactForm.test.ts
import { describe, it, expect } from 'vitest';
import { validateContactForm, isLikelySpamBot, hasErrors } from './contact-validation';
import type { ContactFormData } from '@/types/contact';

const validForm: ContactFormData = {
  name: 'Hana Romdhani',
  email: 'hana@example.com',
  message: 'Hello, I would like to discuss a project with you.',
  honeypot: '',
};

describe('validateContactForm - name', () => {
  it('rejects empty name', () => {
    const errors = validateContactForm({ ...validForm, name: '' });
    expect(errors.name).toBe('Please enter your name.');
  });

  it('rejects name too short', () => {
    const errors = validateContactForm({ ...validForm, name: 'A' });
    expect(errors.name).not.toBe('');
  });

  it('rejects name over 80 chars', () => {
    const errors = validateContactForm({ ...validForm, name: 'A'.repeat(81) });
    expect(errors.name).not.toBe('');
  });

  it('rejects name with a URL', () => {
    const errors = validateContactForm({ ...validForm, name: 'John http://spam.com' });
    expect(errors.name).toBe('Name cannot contain links.');
  });

  it('rejects name with numbers/symbols', () => {
    const errors = validateContactForm({ ...validForm, name: 'John123!!' });
    expect(errors.name).not.toBe('');
  });

  it('accepts valid name with accents/hyphen', () => {
    const errors = validateContactForm({ ...validForm, name: "Éric O'Connor-Dupont" });
    expect(errors.name).toBe('');
  });
});

describe('validateContactForm - email', () => {
  it('rejects empty email', () => {
    const errors = validateContactForm({ ...validForm, email: '' });
    expect(errors.email).not.toBe('');
  });

  it('rejects malformed email', () => {
    const errors = validateContactForm({ ...validForm, email: 'not-an-email' });
    expect(errors.email).not.toBe('');
  });

  it('accepts valid email', () => {
    const errors = validateContactForm({ ...validForm, email: 'test@domain.com' });
    expect(errors.email).toBe('');
  });

  it('rejects overly long email', () => {
    const longEmail = 'a'.repeat(250) + '@test.com';
    const errors = validateContactForm({ ...validForm, email: longEmail });
    expect(errors.email).not.toBe('');
  });
});

describe('validateContactForm - message', () => {
  it('rejects empty message', () => {
    const errors = validateContactForm({ ...validForm, message: '' });
    expect(errors.message).not.toBe('');
  });

  it('rejects too-short message', () => {
    const errors = validateContactForm({ ...validForm, message: 'hi' });
    expect(errors.message).toBe('Message is too short (min. 10 characters).');
  });

  it('rejects too-long message', () => {
    const errors = validateContactForm({ ...validForm, message: 'a'.repeat(2001) });
    expect(errors.message).toBe('Message is too long (max. 2000 characters).');
  });

  it('rejects message with multiple links', () => {
    const errors = validateContactForm({
      ...validForm,
      message: 'Check http://spam1.com and http://spam2.com now!',
    });
    expect(errors.message).toBe('Too many links in your message.');
  });

  it('rejects repeated characters', () => {
    const errors = validateContactForm({ ...validForm, message: 'hiiiiiiiiiiiiiii there' });
    expect(errors.message).toBe('Message looks invalid, please rewrite it.');
  });

  it('rejects spam keywords', () => {
    const errors = validateContactForm({
      ...validForm,
      message: 'I offer the best seo service for your website, guaranteed income!',
    });
    expect(errors.message).toBe('Message flagged as spam. Please rephrase.');
  });

  it('accepts a normal message', () => {
    const errors = validateContactForm(validForm);
    expect(errors.message).toBe('');
  });
});

describe('isLikelySpamBot', () => {
  it('flags filled honeypot as bot', () => {
    const result = isLikelySpamBot(
      { ...validForm, honeypot: 'im-a-bot' },
      Date.now() - 5000
    );
    expect(result).toBe(true);
  });

  it('flags too-fast submission as bot', () => {
    const result = isLikelySpamBot(validForm, Date.now() - 500);
    expect(result).toBe(true);
  });

  it('does not flag a normal human submission', () => {
    const result = isLikelySpamBot(validForm, Date.now() - 5000);
    expect(result).toBe(false);
  });
});

describe('hasErrors', () => {
  it('returns false when all fields valid', () => {
    expect(hasErrors(validateContactForm(validForm))).toBe(false);
  });

  it('returns true when at least one field invalid', () => {
    expect(hasErrors(validateContactForm({ ...validForm, name: '' }))).toBe(true);
  });
});