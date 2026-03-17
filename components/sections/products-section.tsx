"use client";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { motion } from "framer-motion";

import { ArrowRightIcon } from "@/components/icons";
import { useOrder } from "@/components/order-provider";

const products = [
  {
    id: "wonjo",
    name: "Wonjo",
    subtitle: "Hibiscus Juice",
    price: "$12",
    color: "#C41E3A",
    gradientFrom: "#C41E3A",
    gradientTo: "#8B1428",
    bgTint: "#C41E3A",
    description:
      "Deep ruby-red hibiscus juice, a staple of Gambian celebrations. Rich in antioxidants with a naturally tart, cranberry-like kick.",
    benefits: ["Antioxidant-rich", "Vitamin C", "Anti-inflammatory"],
    imagePlaceholder:
      "[Photo: 500ml clear PLA bottle, deep red wonjo juice, natural light, fresh hibiscus flowers arranged beside it, condensation on bottle]",
  },
  {
    id: "ginger",
    name: "Ginger",
    subtitle: "Fresh Ginger Juice",
    price: "$12",
    color: "#D4A017",
    gradientFrom: "#D4A017",
    gradientTo: "#9B7410",
    bgTint: "#D4A017",
    description:
      "Warm, spicy golden ginger juice from fresh root. An anti-inflammatory powerhouse with a natural kick that warms you from the inside out.",
    benefits: ["Anti-inflammatory", "Digestive aid", "Immune boost"],
    imagePlaceholder:
      "[Photo: 500ml clear PLA bottle, golden amber ginger juice, fresh ginger root and lemon slices, warm lighting]",
  },
  {
    id: "bouye",
    name: "Bouye",
    subtitle: "Baobab Juice",
    price: "$12",
    color: "#1B4332",
    gradientFrom: "#F5F0E8",
    gradientTo: "#DDD5C4",
    bgTint: "#D4A017",
    description:
      "Creamy, silky baobab fruit juice — the drink that inspired our name. A prebiotic superfruit with 6x the vitamin C of oranges.",
    benefits: ["Prebiotic", "6x Vitamin C", "Calcium-rich"],
    imagePlaceholder:
      "[Photo: 500ml clear PLA bottle, creamy off-white baobab juice, baobab fruit and powder beside it, minimal background]",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const ProductsSection = () => {
  const { openOrder } = useOrder();

  return (
    <section className="py-28 sm:py-36 relative overflow-hidden" id="products">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.02] blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/[0.06] text-primary text-[11px] font-semibold tracking-[0.15em] uppercase mb-6">
            The Juices
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
            Three roots.
            <br />
            <span className="text-gradient bg-gradient-to-r from-[#C41E3A] via-[#D4A017] to-[#1B4332]">
              One culture.
            </span>
          </h2>
          <p className="text-lg text-foreground/45 max-w-lg mx-auto leading-relaxed">
            $12 each · All 3 for $30.
            <br className="hidden sm:block" />
            Plant-based compostable packaging. Nothing artificial.
          </p>
        </motion.div>

        {/* Bundle CTA */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <button
            className="group/bundle inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/[0.06] border border-primary/[0.1] hover:bg-primary/[0.1] transition-all cursor-pointer"
            onClick={() => openOrder()}
          >
            <div className="flex -space-x-1.5">
              <div className="w-5 h-5 rounded-full bg-[#C41E3A] border-2 border-background" />
              <div className="w-5 h-5 rounded-full bg-[#D4A017] border-2 border-background" />
              <div className="w-5 h-5 rounded-full bg-[#1B4332] border-2 border-background" />
            </div>
            <span className="text-sm font-semibold text-primary">
              The Bouye Bundle — All 3 for $30
            </span>
            <span className="text-[11px] font-medium text-green-600 dark:text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
              Save $6
            </span>
          </button>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true, margin: "-80px" }}
          whileInView="visible"
        >
          {products.map((product) => (
            <motion.div
              key={product.name}
              className="group"
              variants={cardVariants}
            >
              <div className="relative rounded-3xl border border-foreground/[0.06] bg-content1 overflow-hidden hover-lift h-full flex flex-col">
                {/* Product image area */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <div
                    className="absolute inset-0 transition-all duration-500 group-hover:scale-105"
                    style={{
                      background: `radial-gradient(ellipse at 50% 80%, ${product.bgTint}18, ${product.bgTint}08 70%, transparent)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-24 h-40 rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 flex flex-col items-center justify-center relative overflow-hidden"
                      style={{
                        background: `linear-gradient(to bottom, ${product.gradientFrom}, ${product.gradientTo})`,
                      }}
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.2em] relative z-10 ${
                          product.id === "bouye" ? "text-[#1B4332]" : "text-white/80"
                        }`}
                      >
                        {product.name}
                      </span>
                    </div>
                  </div>
                  <div
                    className="absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                    style={{ backgroundColor: product.color }}
                  >
                    {product.price}
                  </div>
                  <p className="absolute bottom-3 left-3 right-3 text-[8px] text-foreground/20 text-center">
                    {product.imagePlaceholder}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3">
                    <h3 className="font-serif text-2xl font-bold text-foreground">
                      {product.name}
                    </h3>
                    <p
                      className="text-sm font-medium mt-0.5"
                      style={{ color: `${product.color}90` }}
                    >
                      {product.subtitle} · 500ml
                    </p>
                  </div>
                  <p className="text-sm text-foreground/50 leading-relaxed mb-5 flex-grow">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {product.benefits.map((benefit) => (
                      <Chip
                        key={benefit}
                        className="text-[11px] font-medium"
                        size="sm"
                        variant="flat"
                        style={
                          {
                            backgroundColor: `${product.color}0D`,
                            color: product.color,
                          } as React.CSSProperties
                        }
                      >
                        {benefit}
                      </Chip>
                    ))}
                  </div>
                  <Button
                    className="w-full font-semibold group/btn"
                    color="primary"
                    endContent={
                      <ArrowRightIcon
                        className="transition-transform group-hover/btn:translate-x-1"
                        size={16}
                      />
                    }
                    radius="full"
                    variant="solid"
                    onPress={() => openOrder(product.id)}
                  >
                    Order {product.name}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
