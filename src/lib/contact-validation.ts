import type { ContactFormData, ContactFormErrors } from '@/types/contact';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SPAM_KEYWORDS = [
    'seo service',
    'crypto',
    'bitcoin',
    'casino',
    'viagra',
    'click here',
    'free money',
    'work from home',
    'guaranteed income',
    'backlink',
    'increase your ranking',
    'loan approved',
];

const MAX_LINKS_ALLOWED = 1;

function countLinks(text: string): number {
    const urlRegex = /(https?:\/\/|www\.)[^\s]+/gi;
    return (text.match(urlRegex) || []).length;
}

function hasRepeatedChars(text: string): boolean {
    return /(.)\1{7,}/.test(text);
}

function containsSpamKeywords(text: string): boolean {
    const lower = text.toLowerCase();
    return SPAM_KEYWORDS.some((kw) => lower.includes(kw));
}

export function validateContactForm(form: ContactFormData): ContactFormErrors {
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    const errors: ContactFormErrors = { name: '', email: '', message: '' };

    if (!name) {
        errors.name = 'Please enter your name.';
    } else if (name.length < 2) {
        errors.name = 'Name is too short.';
    } else if (name.length > 80) {
        errors.name = 'Name is too long.';
    } else if (/(https?:\/\/|www\.)/i.test(name)) {
        errors.name = 'Name cannot contain links.';
    } else if (!/^[\p{L}\s'-]+$/u.test(name)) {
        errors.name = 'Name contains invalid characters.';
    }

    if (!email) {
        errors.email = 'Please enter a valid email address.';
    } else if (!EMAIL_REGEX.test(email)) {
        errors.email = 'Please enter a valid email address.';
    } else if (email.length > 254) {
        errors.email = 'Email address is too long.';
    }

    if (!message) {
        errors.message = 'Please enter your message.';
    } else if (message.length < 10) {
        errors.message = 'Message is too short (min. 10 characters).';
    } else if (message.length > 2000) {
        errors.message = 'Message is too long (max. 2000 characters).';
    } else if (countLinks(message) > MAX_LINKS_ALLOWED) {
        errors.message = 'Too many links in your message.';
    } else if (hasRepeatedChars(message)) {
        errors.message = 'Message looks invalid, please rewrite it.';
    } else if (containsSpamKeywords(message) || containsSpamKeywords(name)) {
        errors.message = 'Message flagged as spam. Please rephrase.';
    }

    return errors;
}

export function isLikelySpamBot(form: ContactFormData, formLoadTime: number): boolean {
    if (form.honeypot && form.honeypot.trim() !== '') return true;

    const elapsed = Date.now() - formLoadTime;
    return elapsed < 2000;
}

export function hasErrors(errors: ContactFormErrors): boolean {
    return Object.values(errors).some((error) => error !== '');
}
