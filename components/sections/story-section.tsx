"use client";

import { Divider } from "@heroui/divider";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const StorySection = () => {
  return (
    <section
      className="py-28 sm:py-36 bg-[#1B4332] dark:bg-[#0d2a1e] relative overflow-hidden"
      id="story"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-[300px] h-[300px] rounded-full bg-[#C41E3A]/[0.06] blur-[80px]" />
        <div className="absolute bottom-20 left-20 w-[250px] h-[250px] rounded-full bg-[#D4A017]/[0.06] blur-[80px]" />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image placeholder */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <div className="aspect-[4/5] rounded-3xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] flex items-center justify-center overflow-hidden relative">
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C41E3A]/10 via-transparent to-[#D4A017]/10" />
              <div className="text-center text-white/40 px-10 relative z-10">
                <p className="text-sm leading-relaxed">
                  [Photo: A warm, vibrant scene from The Gambia — a woman
                  preparing wonjo (hibiscus) juice at a wooden table, or a
                  bustling market with colourful hibiscus flowers, baobab fruit,
                  and ginger root on display. Authentic, not stock. Warm
                  golden-hour lighting.]
                </p>
              </div>
            </div>
            {/* Floating accent cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              className="absolute -top-6 -right-6 w-28 h-28 rounded-2xl bg-[#C41E3A]/20 backdrop-blur-sm border border-[#C41E3A]/10 flex items-center justify-center"
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-3xl">🌺</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl bg-[#D4A017]/20 backdrop-blur-sm border border-[#D4A017]/10 flex items-center justify-center"
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <span className="text-2xl">🫚</span>
            </motion.div>
          </motion.div>

          {/* Story copy */}
          <motion.div
            className="flex flex-col gap-8 order-1 lg:order-2"
            initial="hidden"
            viewport={{ once: true }}
            whileInView="visible"
          >
            <motion.span
              className="text-[#D4A017] text-xs font-semibold uppercase tracking-[0.2em]"
              variants={fadeUp}
            >
              Our Story
            </motion.span>

            <motion.h2
              className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1]"
              variants={fadeUp}
            >
              From Gambian
              <br />
              traditions to
              <br />
              <span className="text-gradient bg-gradient-to-r from-[#D4A017] to-[#F5F0E8]">
                Toronto tables
              </span>
            </motion.h2>

            <motion.div variants={fadeUp}>
              <Divider className="bg-white/10 w-16" />
            </motion.div>

            <motion.div
              className="space-y-5 text-white/55 text-base sm:text-[17px] leading-[1.8]"
              variants={fadeUp}
            >
              <p>
                In The Gambia,{" "}
                <strong className="text-white font-medium">wonjo</strong>{" "}
                flows at every celebration — weddings, naming ceremonies, family
                gatherings. Deep red, naturally tart, impossibly refreshing.
                It&apos;s the drink that brings people together.
              </p>
              <p>
                <strong className="text-white font-medium">Bouye</strong> is
                the one your grandmother makes — creamy, smooth, packed with the
                fruit of the iconic baobab tree. And{" "}
                <strong className="text-white font-medium">ginger juice</strong>
                ? That&apos;s the remedy for everything — or so every Gambian
                auntie will tell you.
              </p>
              <p>
                We grew up on these juices. Now we&apos;re bringing them to
                Toronto — traditional recipes, pure cane sugar, plant-based
                compostable bottles. The same wellness drinks that&apos;ve
                nourished West Africa for generations, delivered to your door.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/[0.06]"
              variants={fadeUp}
            >
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#C41E3A] font-serif">
                  <AnimatedCounter target={3} />
                </div>
                <div className="text-[13px] text-white/35 mt-2 leading-tight">
                  Traditional
                  <br />
                  recipes
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#D4A017] font-serif">
                  &lt;<AnimatedCounter target={20} />
                  <span className="text-lg">g</span>
                </div>
                <div className="text-[13px] text-white/35 mt-2 leading-tight">
                  Sugar per
                  <br />
                  bottle
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#F5F0E8] font-serif">
                  <AnimatedCounter target={100} suffix="%" />
                </div>
                <div className="text-[13px] text-white/35 mt-2 leading-tight">
                  Natural
                  <br />
                  ingredients
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
