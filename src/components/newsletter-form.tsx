'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you'd handle the form submission here (e.g., using a Server Action)
    alert('Subscription submitted (placeholder)');
  };

  return (
    <form
      className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <Input
        type="email"
        placeholder="Enter your email"
        className="flex-grow"
        required
        aria-label="Email for newsletter"
      />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
