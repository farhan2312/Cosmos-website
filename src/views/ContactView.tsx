'use client';
import { LandingScene } from "@/components/cosmos/LandingScene";
import { useState } from "react";
import { ContactForm } from "@/components/cosmos/ContactForm";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactPhone } from "@/lib/contact-details";

 
export default function ContactView() {
  const [sel, setSel] = useState(-1);
  return (
    <section className="section">
      <div className="container contact-layout">
        <div>
          <span className="eyebrow eyebrow-line">Start a conversation</span>
          <h2>Have a problem worth solving?</h2>
          <p>Let's talk about it. Whether you're exploring AI, modernizing your technology stack or looking for a better way to use your data, we'll start with the problem — and work from there.</p>
          <div className="contact-phone">
            <Button asChild variant="outline"><a href={contactPhone.href}><Phone size={16} aria-hidden="true" />{contactPhone.display}</a></Button>
          </div>
          <div className="contact-art"><LandingScene selected={sel} onSelect={(i) => setSel(sel === i ? -1 : i)} /></div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
