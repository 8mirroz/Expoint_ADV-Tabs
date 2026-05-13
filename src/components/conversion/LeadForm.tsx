"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
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
        console.error('Failed to submit');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card variant="outlined" className="w-full max-w-md mx-auto text-center py-8">
        <CardContent>
          <div className="w-16 h-16 bg-accent/20 text-accent border border-accent/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <CardTitle className="mb-2">Request Received</CardTitle>
          <p className="text-on-surface-variant">
            Our specialist will contact you within 15 minutes to discuss the details of your project.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Discuss Your Project</CardTitle>
          <p className="text-sm text-on-surface-variant mt-1">
            Leave your contact details and we&apos;ll prepare a custom proposal.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input name="name" label="Name" placeholder="Your name" required />
          <Input name="phone" label="Phone" type="tel" placeholder="+7 (999) 000-00-00" required />
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">Project Description (Optional)</label>
            <textarea
              name="description"
              className="w-full rounded-none border border-outline p-4 bg-surface text-on-surface placeholder:text-on-surface-variant focus:ring-1 focus:ring-accent/20 focus:border-accent outline-none transition-all sm:text-sm"
              rows={3}
              placeholder="Tell us about your task..."
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" isLoading={loading}>
            Get Proposal
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
