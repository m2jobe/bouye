/** @format */

"use client";

import { Chip } from "@heroui/chip";
import { motion } from "framer-motion";

import { CheckIcon, SparklesIcon } from "@/components/icons";

const juiceHealth = [
  {
    name: "Wonjo",
    subtitle: "Hibiscus",
    color: "#C41E3A",
    icon: "🌺",
    benefits: [
      "Rich in anthocyanin antioxidants",
      "Supports healthy blood pressure",
      "High in vitamin C",
      "Natural anti-inflammatory",
    ],
  },
  {
    name: "Jinjin",
    subtitle: "Fresh Root",
    color: "#D4A017",
    icon: "🫚",
    benefits: [
      "Powerful anti-inflammatory",
      "Aids digestion & reduces nausea",
      "Boosts immune response",
      "Improves circulation",
    ],
  },
  {
    name: "Bouye",
    subtitle: "Baobab",
    color: "#1B4332",
    icon: "🌳",
    benefits: [
      "6x more vitamin C than oranges",
      "Prebiotic — supports gut health",
      "Rich in calcium & potassium",
      "High in dietary fibre",
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const HealthSection = () => {
  return (
    <section className="py-28 sm:py-36 relative overflow-hidden" id="health">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-secondary/[0.03] blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Chip
            className="mb-6"
            color="secondary"
            size="sm"
            startContent={<SparklesIcon size={14} />}
            variant="flat"
          >
            Health Benefits
          </Chip>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
            Wellness in
            <br />
            <span className="text-[#C41E3A]">every sip.</span>
          </h2>
          <p className="text-lg text-foreground/40 max-w-lg mx-auto">
            Real ingredients. Real benefits.
          </p>
        </motion.div>

        {/* Per-juice benefit cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-5 lg:gap-6"
          initial="hidden"
          variants={stagger}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {juiceHealth.map((juice) => (
            <motion.div key={juice.name} className="group" variants={fadeUp}>
              <div className="rounded-3xl border border-foreground/[0.06] bg-content1 p-7 h-full hover-lift relative overflow-hidden">
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${juice.color}08, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{juice.icon}</span>
                    <div>
                      <h3
                        className="font-serif text-lg font-bold"
                        style={{ color: juice.color }}
                      >
                        {juice.name}
                      </h3>
                      <p className="text-[11px] text-foreground/35 uppercase tracking-wider">
                        {juice.subtitle}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {juice.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2.5 text-sm text-foreground/55"
                      >
                        <CheckIcon
                          className="flex-shrink-0 mt-0.5"
                          size={14}
                          style={{ color: juice.color }}
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
