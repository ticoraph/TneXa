import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();
    const [status, setStatus] = useState('');
    const [lastSubmit, setLastSubmit] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 3. Rate limit API (local safeguard)
        const now = Date.now();
        if (now - lastSubmit < 60000) {
            setStatus('error_rate_limit');
            return;
        }

        const formData = new FormData(e.target);
        
        // 2. Honeypot check
        if (formData.get('_honey')) {
            console.log('Bot detected');
            setStatus('success'); // Fake success for bots
            return;
        }

        // Simulate sending via Resend
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setLastSubmit(now);
        }, 1500);
    };

    return (
        <main className="page-content">
            <div className="container section-padding">
                <h1 className="gradient-text">{t('nav.contact')}</h1>
                <div className="contact-container glass animate">
                    <form onSubmit={handleSubmit} className="contact-form">
                        {/* 2. Honeypot field (hidden) */}
                        <div style={{ display: 'none' }}>
                            <input type="text" name="_honey" tabIndex="-1" autoComplete="off" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">{t('contact.name')}</label>
                            <input type="text" id="name" name="name" required className="glass-input" />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">{t('contact.email')}</label>
                            <input type="email" id="email" name="email" required className="glass-input" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">{t('contact.message')}</label>
                            <textarea id="message" name="message" required className="glass-input" rows="5"></textarea>
                        </div>

                        {/* 1. Cloudflare Turnstile Placeholder */}
                        <div className="turnstile-container">
                            <div className="cf-turnstile-placeholder glass">
                                <span>Cloudflare Turnstile Anti-Spam</span>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                            {status === 'sending' ? t('contact.sending') : t('contact.submit')}
                        </button>

                        {status === 'success' && <p className="status-msg success">{t('contact.success_msg')}</p>}
                        {status === 'error_rate_limit' && <p className="status-msg error">{t('contact.rate_limit_msg')}</p>}
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Contact;
