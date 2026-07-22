export interface ContactFormData {
    name: string;
    email: string;
    message: string;
    honeypot?: string;
}

export interface ContactFormErrors {
    name: string;
    email: string;
    message: string;
}
