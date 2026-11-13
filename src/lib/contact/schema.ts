import { z } from 'zod';
import content from '@/lib/cosmos-content.json';

const services = content.services.map((s) => s.name);

export const contactSchema = z.object({
  fullName: z.string().trim().min(1, 'Please enter your full name').max(120),
  email: z.string().trim().email('Please enter a valid email address').max(255),
  company: z.string().trim().max(160).optional().default(''),
  phone: z.string().trim().max(40).regex(/^[0-9+()\-\s.]*$/, 'Please enter a valid phone number').optional().default(''),
  service: z.string().trim().max(80).optional().default('').refine((v) => !v || services.includes(v), 'Please choose a service'),
  message: z.string().trim().min(1, 'Please enter a message').max(4000),
  website: z.string().max(0).optional().default(''), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;
