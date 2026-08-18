"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-gold-500/30 bg-cream/40 p-14 text-center"
      >
        <CheckCircle2 size={36} className="text-gold-500" strokeWidth={1.25} />
        <p className="font-serif text-xl text-ink">Message Sent</p>
        <p className="max-w-xs text-sm text-ink/55">
          Thank you for reaching out — our team will get back to you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-ink/50">Full Name</span>
          <input
            required
            className="btn-focus rounded-xl border border-ink/15 bg-warm-white px-4 py-3.5 text-sm text-ink placeholder:text-ink/30 focus:border-gold-500"
            placeholder="Your name"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-ink/50">Email</span>
          <input
            required
            type="email"
            className="btn-focus rounded-xl border border-ink/15 bg-warm-white px-4 py-3.5 text-sm text-ink placeholder:text-ink/30 focus:border-gold-500"
            placeholder="you@email.com"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-ink/50">Subject</span>
        <input
          className="btn-focus rounded-xl border border-ink/15 bg-warm-white px-4 py-3.5 text-sm text-ink placeholder:text-ink/30 focus:border-gold-500"
          placeholder="How can we help?"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-ink/50">Message</span>
        <textarea
          required
          rows={5}
          className="btn-focus resize-none rounded-xl border border-ink/15 bg-warm-white px-4 py-3.5 text-sm text-ink placeholder:text-ink/30 focus:border-gold-500"
          placeholder="Tell us more..."
        />
      </label>
      <button
        type="submit"
        className="btn-focus mt-2 self-start rounded-full bg-ink px-9 py-4 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-gold-600"
      >
        Send Message
      </button>
    </form>
  );
}
