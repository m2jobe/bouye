"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { useState } from "react";

import { MailIcon, ArrowRightIcon } from "@/components/icons";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-28 sm:py-36" id="newsletter">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] bg-[#1B4332] dark:bg-[#0d2a1e] px-6 sm:px-16 py-20 sm:py-24"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        >
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[#C41E3A]/[0.12] blur-[80px] animate-blob pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[250px] h-[250px] rounded-full bg-[#D4A017]/[0.12] blur-[80px] animate-blob-reverse pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 max-w-lg mx-auto text-center">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              className="w-14 h-14 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center mx-auto mb-8"
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <MailIcon className="text-[#D4A017]" size={24} />
            </motion.div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Be the first
              <br />
              to taste Bouye
            </h2>
            <p className="text-white/40 text-base sm:text-lg mb-10 leading-relaxed">
              Launch announcements, market dates, and exclusive offers.
              <br className="hidden sm:block" />
              We only email when it matters.
            </p>

            {submitted ? (
              <motion.div
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                className="bg-white/[0.06] backdrop-blur-sm rounded-2xl px-8 py-8 border border-white/[0.08]"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-3xl mb-3">🎉</div>
                <p className="text-white font-serif font-bold text-xl">
                  You&apos;re on the list!
                </p>
                <p className="text-white/40 text-sm mt-2">
                  We&apos;ll let you know as soon as Bouye launches in the GTA.
                </p>
              </motion.div>
            ) : (
              <>
                <form
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  onSubmit={handleSubmit}
                >
                  <Input
                    classNames={{
                      inputWrapper:
                        "bg-white/[0.06] border-white/[0.1] hover:bg-white/[0.08] group-data-[focus=true]:bg-white/[0.08] h-12",
                      input: "text-white placeholder:text-white/30 text-sm",
                    }}
                    placeholder="your@email.com"
                    radius="full"
                    size="lg"
                    type="email"
                    value={email}
                    variant="bordered"
                    onValueChange={setEmail}
                  />
                  <Button
                    className="font-semibold bg-white text-[#1B4332] flex-shrink-0 h-12 px-6 shadow-lg shadow-black/10 hover:shadow-xl transition-shadow"
                    endContent={<ArrowRightIcon size={16} />}
                    isLoading={submitting}
                    radius="full"
                    size="lg"
                    type="submit"
                  >
                    Notify Me
                  </Button>
                </form>
                {error && (
                  <p className="text-red-300 text-xs mt-3">{error}</p>
                )}
              </>
            )}

            <p className="text-white/15 text-[11px] mt-8 tracking-wide">
              No spam. Unsubscribe anytime. We respect your inbox.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
