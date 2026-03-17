"use client";

import { Chip } from "@heroui/chip";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { CheckIcon, XIcon, SparklesIcon } from "@/components/icons";

const comparisonRows = [
  {
    label: "Sugar per drink",
    bouye: "Under 20g",
    bouyeDetail: "Pure cane sugar",
    boba: "50–90g",
    bobaDetail: "Corn syrup",
    bouyeWins: true,
    visual: "sugar",
  },
  {
    label: "Health benefits",
    bouye: "Antioxidants, Vitamin C, Prebiotics",
    boba: "None",
    bouyeWins: true,
  },
  {
    label: "Packaging",
    bouye: "Compostable PLA",
    bouyeDetail: "Plant-based",
    boba: "Plastic cup",
    bobaDetail: "Disposable",
    bouyeWins: true,
  },
  {
    label: "Artificial ingredients",
    bouye: "Zero",
    boba: "Flavours & colours",
    bouyeWins: true,
  },
  {
    label: "Uniqueness",
    bouye: "Only Gambian brand",
    bouyeDetail: "In all of Toronto",
    boba: "Hundreds of shops",
    bouyeWins: true,
  },
];

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
    name: "Ginger",
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

function SugarBar({ amount, max, color, delay }: { amount: number; max: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full">
      <div className="h-3 rounded-full bg-foreground/[0.04] overflow-hidden">
        <motion.div
          animate={isInView ? { width: `${(amount / max) * 100}%` } : { width: 0 }}
          className="h-full rounded-full"
          initial={{ width: 0 }}
          style={{ backgroundColor: color }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

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
            Not your average
            <br />
            <span className="text-[#C41E3A]">bubble tea.</span>
          </h2>
          <p className="text-lg text-foreground/40 max-w-lg mx-auto">
            Real ingredients. Real benefits.
            <br className="hidden sm:block" />
            Here&apos;s how Bouye stacks up against boba.
          </p>
        </motion.div>

        {/* Sugar comparison — hero visual */}
        <motion.div
          className="max-w-2xl mx-auto mb-24 bg-content1 rounded-3xl border border-foreground/[0.06] p-8 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-serif text-xl font-bold text-foreground mb-8 text-center">
            Sugar per drink
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-primary">
                  Bouye Juices
                </span>
                <span className="text-sm font-bold text-primary">
                  &lt;20g
                </span>
              </div>
              <SugarBar amount={20} color="#1B4332" delay={0.2} max={90} />
              <span className="text-[11px] text-foreground/30 mt-1 block">
                Pure cane sugar
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground/40">
                  Typical Boba Tea
                </span>
                <span className="text-sm font-bold text-foreground/40">
                  50–90g
                </span>
              </div>
              <SugarBar amount={70} color="#C41E3A" delay={0.5} max={90} />
              <span className="text-[11px] text-foreground/30 mt-1 block">
                High-fructose corn syrup
              </span>
            </div>
          </div>
          <p className="text-xs text-foreground/25 text-center mt-8">
            That&apos;s up to 4.5x less sugar per drink.
          </p>
        </motion.div>

        {/* Comparison grid */}
        <motion.div
          className="max-w-3xl mx-auto mb-24"
          initial="hidden"
          variants={stagger}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {comparisonRows.map((row) => (
            <motion.div
              key={row.label}
              className="grid grid-cols-[1fr_1fr_auto_1fr] sm:grid-cols-[1.2fr_1fr_auto_1fr] items-center gap-3 sm:gap-4 py-5 border-b border-foreground/[0.04] last:border-none"
              variants={fadeUp}
            >
              <div>
                <span className="text-sm font-medium text-foreground/70">
                  {row.label}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-primary">
                  {row.bouye}
                </span>
                {row.bouyeDetail && (
                  <span className="block text-[11px] text-foreground/30">
                    {row.bouyeDetail}
                  </span>
                )}
              </div>
              <div className="flex justify-center">
                <span className="text-[10px] text-foreground/20 uppercase tracking-wider">
                  vs
                </span>
              </div>
              <div>
                <span className="text-sm text-foreground/35">{row.boba}</span>
                {row.bobaDetail && (
                  <span className="block text-[11px] text-foreground/20">
                    {row.bobaDetail}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
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
            <motion.div
              key={juice.name}
              className="group"
              variants={fadeUp}
            >
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
