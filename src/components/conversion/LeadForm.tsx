"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import Link from 'next/link';
import { TurnstileWidget } from '../ui/TurnstileWidget';

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      setError('Please complete the security check');
      return;
    }

    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      consent: formData.get('consent') === 'on',
      turnstileToken: turnstileToken,
      source: 'Lead Form'
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const payload = await res.json();
        setError(payload.message || 'Failed to submit');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card variant="outlined" className="w-full max-w-md mx-auto text-center py-12 px-6">
        <CardContent>
          <div className="w-20 h-20 bg-accent/10 text-accent border border-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <CardTitle className="text-2xl mb-4">Request Received</CardTitle>
          <p className="text-on-surface-variant leading-relaxed">
            Our engineering team will contact you within 15 minutes to discuss the technical specifications of your project.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <form onSubmit={handleSubmit}>
        <CardHeader className="bg-surface-variant/30">
          <CardTitle className="text-xl">Discuss Your Project</CardTitle>
          <p className="text-xs text-on-surface-variant mt-1 uppercase tracking-widest font-medium">
            Personal Engineering Consultation
          </p>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <Input name="name" label="Name" placeholder="Your name" required />
          <Input name="phone" label="Phone" type="tel" placeholder="+7 (999) 000-00-00" required />
          <div>
            <label className="block text-sm font-medium text-on-surface mb-2">Project Description (Optional)</label>
            <textarea
              name="description"
              className="w-full rounded-none border border-outline p-4 bg-surface text-on-surface placeholder:text-on-surface-variant focus:ring-1 focus:ring-accent/20 focus:border-accent outline-none transition-all sm:text-sm"
              rows={3}
              placeholder="Tell us about your requirements..."
            />
          </div>

          <div className="flex items-start gap-3">
            <input 
              type="checkbox" 
              name="consent" 
              id="consent" 
              required 
              className="mt-1 w-4 h-4 rounded-none border-outline text-accent focus:ring-accent"
            />
            <label htmlFor="consent" className="text-xs text-on-surface-variant leading-tight">
              I agree to the processing of personal data in accordance with the 
              <Link href="/privacy" className="text-accent hover:underline ml-1">Privacy Policy</Link>.
            </label>
          </div>

          <div className="py-2">
            <TurnstileWidget onVerify={setTurnstileToken} />
          </div>

          {error && (
            <div className="p-4 bg-error/10 border border-error/20 text-error text-xs font-bold uppercase tracking-wider text-center">
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter className="pb-8">
          <Button type="submit" className="w-full h-12 text-xs font-black uppercase tracking-[0.2em]" isLoading={loading}>
            Get Proposal
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
