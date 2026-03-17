"use client";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { motion } from "framer-motion";

import { ArrowRightIcon } from "@/components/icons";
import { useOrder } from "@/components/order-provider";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const HeroSection = () => {
  const { openOrder } = useOrder();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#C41E3A]/[0.08] blur-[100px] animate-blob" />
        <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] rounded-full bg-[#D4A017]/[0.08] blur-[100px] animate-blob-reverse" />
        <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] rounded-full bg-[#1B4332]/[0.06] blur-[80px] animate-blob" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(27,67,50,1) 1px, transparent 1px), linear-gradient(90deg, rgba(27,67,50,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Copy */}
          <motion.div
            className="flex flex-col gap-6 max-w-xl"
            initial="hidden"
            variants={stagger}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.08] border border-primary/[0.12] text-primary text-xs font-semibold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                Toronto&apos;s First Gambian Juice Brand
              </span>
            </motion.div>

            <motion.h1
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground"
              variants={fadeUp}
            >
              Wellness{" "}
              <span className="relative">
                <span className="text-gradient bg-gradient-to-r from-[#C41E3A] via-[#D4A017] to-[#1B4332]">
                  from
                </span>
              </span>
              <br />
              The Gambia
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-foreground/50 leading-relaxed"
              variants={fadeUp}
            >
              Three handcrafted wellness juices — Wonjo, Ginger & Baobab —
              made with pure cane sugar, in plant-based compostable bottles.
              Zero artificial anything.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-2"
              variants={fadeUp}
            >
              <Button
                className="font-semibold text-base px-8 h-12 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
                color="primary"
                endContent={<ArrowRightIcon size={18} />}
                radius="full"
                size="lg"
                variant="solid"
                onPress={() => openOrder()}
              >
                Order Now
              </Button>
              <Chip
                className="h-12 px-5 text-sm"
                color="warning"
                radius="full"
                size="lg"
                variant="flat"
              >
                🛵 Uber Eats — Coming Soon
              </Chip>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 text-sm text-foreground/40"
              variants={fadeUp}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C41E3A]" />
                Under 20g sugar
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1B4332]" />
                Compostable PLA bottles
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
                100% natural
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Floating bottle mockups */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial="hidden"
            variants={stagger}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <div className="relative w-full max-w-md lg:max-w-lg aspect-[3/4]">
              {/* Glow behind bottles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-[#C41E3A]/20 via-[#D4A017]/15 to-[#1B4332]/10 blur-[60px]" />

              {/* Wonjo bottle — center, front */}
              <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2 z-30 animate-float"
                variants={scaleIn}
              >
                <div className="w-44 sm:w-52 h-[280px] sm:h-[320px] rounded-3xl bg-gradient-to-b from-[#C41E3A] via-[#B01830] to-[#8B1428] shadow-2xl shadow-[#C41E3A]/30 flex flex-col items-center justify-between py-6 px-4 relative overflow-hidden hover-lift cursor-default">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-0 right-4 w-8 h-full bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none rounded-full blur-sm" />
                  <div className="relative z-10 flex flex-col items-center gap-1 mt-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Bouye</span>
                    <div className="w-14 h-[0.5px] bg-white/20 my-1" />
                    <span className="text-lg font-serif font-bold text-white tracking-wide">Wonjo</span>
                    <span className="text-[10px] text-white/60 uppercase tracking-widest">Hibiscus</span>
                  </div>
                  <div className="relative z-10 text-center">
                    <span className="text-[9px] text-white/40 uppercase tracking-wider">500ml · Pure Cane Sugar</span>
                  </div>
                  <p className="absolute bottom-2 left-2 right-2 text-[8px] text-white/30 text-center leading-tight">
                    [Photo: Clear PLA bottle, deep red wonjo juice glowing in natural light, condensation drops]
                  </p>
                </div>
              </motion.div>

              {/* Ginger bottle — left, back */}
              <motion.div
                className="absolute bottom-12 left-0 sm:left-4 z-20 animate-float-delayed"
                variants={scaleIn}
              >
                <div className="w-36 sm:w-44 h-[240px] sm:h-[280px] rounded-3xl bg-gradient-to-b from-[#D4A017] via-[#C49515] to-[#9B7410] shadow-2xl shadow-[#D4A017]/25 flex flex-col items-center justify-between py-5 px-3 relative overflow-hidden hover-lift cursor-default rotate-[-6deg]">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-0 right-3 w-6 h-full bg-gradient-to-b from-white/15 via-white/5 to-transparent pointer-events-none rounded-full blur-sm" />
                  <div className="relative z-10 flex flex-col items-center gap-1 mt-3">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">Bouye</span>
                    <div className="w-12 h-[0.5px] bg-white/20 my-1" />
                    <span className="text-base font-serif font-bold text-white tracking-wide">Ginger</span>
                    <span className="text-[9px] text-white/60 uppercase tracking-widest">Fresh Root</span>
                  </div>
                  <div className="relative z-10">
                    <span className="text-[8px] text-white/40 uppercase tracking-wider">500ml</span>
                  </div>
                  <p className="absolute bottom-2 left-2 right-2 text-[7px] text-white/25 text-center leading-tight">
                    [Photo: Golden amber ginger juice, warm tones]
                  </p>
                </div>
              </motion.div>

              {/* Baobab bottle — right, back */}
              <motion.div
                className="absolute bottom-8 right-0 sm:right-4 z-10 animate-float-slow"
                variants={scaleIn}
              >
                <div className="w-36 sm:w-44 h-[240px] sm:h-[280px] rounded-3xl bg-gradient-to-b from-[#FAF7F0] via-[#F5F0E8] to-[#E8E0D0] shadow-2xl shadow-[#D4A017]/10 flex flex-col items-center justify-between py-5 px-3 relative overflow-hidden hover-lift cursor-default rotate-[5deg]">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-0 right-3 w-6 h-full bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none rounded-full blur-sm" />
                  <div className="relative z-10 flex flex-col items-center gap-1 mt-3">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1B4332]/40">Bouye</span>
                    <div className="w-12 h-[0.5px] bg-[#1B4332]/15 my-1" />
                    <span className="text-base font-serif font-bold text-[#1B4332] tracking-wide">Bouye</span>
                    <span className="text-[9px] text-[#1B4332]/50 uppercase tracking-widest">Baobab</span>
                  </div>
                  <div className="relative z-10">
                    <span className="text-[8px] text-[#1B4332]/30 uppercase tracking-wider">500ml</span>
                  </div>
                  <p className="absolute bottom-2 left-2 right-2 text-[7px] text-[#1B4332]/20 text-center leading-tight">
                    [Photo: Creamy off-white baobab juice, clean]
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ opacity: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/25">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            className="w-5 h-8 rounded-full border border-foreground/15 flex items-start justify-center pt-1.5"
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-1 h-1.5 rounded-full bg-foreground/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
