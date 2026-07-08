import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Turnstile } from '@marsidev/react-turnstile';

const Contact = () => {
    const { t } = useTranslation();
    const [status, setStatus] = useState('');
    const [lastSubmit, setLastSubmit] = useState(0);
    const [turnstileToken, setTurnstileToken] = useState(null);
    const formRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 1. Client-side Rate limit (1 minute)
        const now = Date.now();
        if (now - lastSubmit < 60000) {
            setStatus('error_rate_limit');
            return;
        }

        // 2. Turnstile Verification
        if (!turnstileToken) {
            setStatus('error_turnstile');
            return;
        }

        const formData = new FormData(e.target);
        
        // 3. Honeypot check
        if (formData.get('_honey')) {
            console.log('Bot detected');
            setStatus('success'); // Fake success for bots
            return;
        }

        setStatus('sending');

        try {
            // 4. API integration via PHP proxy (production ready)
            const response = await fetch('/api/send-email.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message'),
                    turnstileToken: turnstileToken
                })
            });

            if (response.ok) {
                setStatus('success');
                setLastSubmit(now);
                formRef.current.reset();
            } else {
                setStatus('error_server');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error_server');
        }
    };

    return (
        <main className="page-content">
            <div className="container section-padding">
                <h1 className="gradient-text">{t('nav.contact')}</h1>
                <div className="contact-container glass animate">
                    <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
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

                        {/* 1. Cloudflare Turnstile */}
                        <div className="turnstile-container">
                            <Turnstile 
                                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
                                onSuccess={(token) => setTurnstileToken(token)}
                                onExpire={() => setTurnstileToken(null)}
                                onError={() => setStatus('error_turnstile')}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                            {status === 'sending' ? t('contact.sending') : t('contact.submit')}
                        </button>

                        {status === 'success' && <p className="status-msg success">{t('contact.success_msg')}</p>}
                        {status === 'error_rate_limit' && <p className="status-msg error">{t('contact.rate_limit_msg')}</p>}
                        {status === 'error_turnstile' && <p className="status-msg error">{t('contact.error_turnstile_msg')}</p>}
                        {status === 'error_server' && <p className="status-msg error">{t('contact.error_server_msg')}</p>}
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Contact;
