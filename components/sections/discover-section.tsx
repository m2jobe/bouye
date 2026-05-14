"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { ArrowRightIcon, SparklesIcon } from "@/components/icons";

type FlashCard = {
  topic: string;
  title: string;
  body: string;
};

type Drink = {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  color: string;
  colorSoft: string;
  image: string;
  cards: FlashCard[];
};

const drinks: Drink[] = [
  {
    id: "wonjo",
    name: "Wonjo",
    subtitle: "Hibiscus",
    emoji: "🌺",
    color: "#C41E3A",
    colorSoft: "#F4D4DA",
    image: "/wonjo.png",
    cards: [
      {
        topic: "The Name",
        title: "A drink with many names",
        body: "Wonjo is the Wolof name for hibiscus. The same flower goes by bissap in Senegal, zobo in Nigeria, karkadé in Egypt, agua de Jamaica in Mexico, and sorrel across the Caribbean. Same deep red, same tart kick.",
      },
      {
        topic: "The Plant",
        title: "Hibiscus sabdariffa",
        body: "A tropical plant whose dried calyces are steeped to release colour and flavour. Calyces are the sepals that protect the flower bud, not the petals (a common mix-up). Roughly 15–20% organic acids by weight, which is what gives it that cranberry-like tartness.",
      },
      {
        topic: "Ingredients",
        title: "Six ingredients. Nothing else.",
        body: "Water · Organic hibiscus calyces · Organic lemon juice · Organic coconut sugar · Organic monk fruit · Natural spearmint extract.",
      },
      {
        topic: "Why Each One",
        title: "Every ingredient earns its place",
        body: "Hibiscus was buried in Egyptian tombs and drunk by pharaohs to cool the heat. Coconut sugar has a glycemic index of ~35 vs ~65 for cane. Monk fruit has been used by Buddhist monks in southern China for 800+ years. Spearmint pairs naturally with hibiscus across North Africa.",
      },
      {
        topic: "Benefits",
        title: "Naturally functional",
        body: "Contains anthocyanin antioxidants. Source of Vitamin C. Caffeine-free, fat-free. Free from common allergens.",
      },
      {
        topic: "Fun Fact",
        title: "1.5–3% pigment by weight",
        body: "Anthocyanins make up 1.5–3% of dried hibiscus calyces. It's the same family of pigments that give blueberries and red cabbage their colour.",
      },
    ],
  },
  {
    id: "jinjin",
    name: "Jinjin",
    subtitle: "Fresh Ginger",
    emoji: "🫚",
    color: "#D4A017",
    colorSoft: "#F5E5BE",
    image: "/jinjin.png",
    cards: [
      {
        topic: "The Name",
        title: "The Gambian cure-all",
        body: "Jinjin is our playful name for it. The actual Mandinka word for fresh ginger is jinjero. In Gambian homes, ginger is the remedy your grandmother reaches for first.",
      },
      {
        topic: "The Plant",
        title: "Zingiber officinale",
        body: "The knobby underground rhizome (not technically a root). Fresh ginger contains 1–3% essential oils and 5–8% oleoresins, with gingerol (1–2.5% by weight) giving it that signature heat.",
      },
      {
        topic: "Ingredients",
        title: "Made from fresh root",
        body: "Water · Fresh organic ginger root · Organic lemon juice · Organic coconut sugar · Organic monk fruit · Natural spearmint extract.",
      },
      {
        topic: "Why Each One",
        title: "Tradition in every sip",
        body: "Fresh ginger has been used in Chinese medicine for 2,500+ years, and just as long across West Africa. Street vendors across the Sahel sell nyamakoudji (Mali) and gnamakoudji (Côte d'Ivoire) with this same recipe. We use fresh root, not powder.",
      },
      {
        topic: "Benefits",
        title: "Source of Vitamin C",
        body: "Made from fresh ginger root, not extract. Contains gingerols, the natural compounds that give ginger its warmth. No artificial flavours or preservatives. Free from common allergens.",
      },
      {
        topic: "Fun Fact",
        title: "Convergent heat",
        body: "Ginger's heat (gingerol), chili's heat (capsaicin), and black pepper's heat (piperine) come from three unrelated plants that independently evolved similar molecules to deter pests. Convergent evolution at the dinner table.",
      },
    ],
  },
  {
    id: "bouye",
    name: "Bouye",
    subtitle: "Baobab",
    emoji: "🌳",
    color: "#1B4332",
    colorSoft: "#C8D6CE",
    image: "/baobab.png",
    cards: [
      {
        topic: "The Tree of Life",
        title: "2,000 years old, and counting",
        body: "Gambians call the baobab the Tree of Life. Some living trees are over 2,000 years old. The fruit, bouye in Wolof, is the one your grandmother makes into a creamy, tangy drink. It inspired our brand name.",
      },
      {
        topic: "The Plant",
        title: "Adansonia digitata",
        body: "A massive tree that stores up to 120,000 litres of water in its trunk to survive the dry season. Its fruit is the only one in the world that dries naturally on the branch, so no processing is needed to preserve it.",
      },
      {
        topic: "Ingredients",
        title: "Eight ancestral ingredients",
        body: "Water · Organic baobab fruit powder · Organic tigernut powder · Organic acacia fibre · Organic coconut sugar · Sunflower lecithin · Organic monk fruit · Organic vanilla extract.",
      },
      {
        topic: "Baobab",
        title: "The Gambian heart of the drink",
        body: "Baobab pulp dries on the branch with no processing. It contains roughly 6× more vitamin C by weight than oranges, and 45% of the pulp is fibre (half of it prebiotic). The same fruit Gambian grandmothers have been mixing with water for generations.",
      },
      {
        topic: "Tigernut",
        title: "Not a nut. A tiny tuber.",
        body: "Despite the name, tigernut isn't a nut. It's a small underground tuber, like a potato or yam, eaten in Egypt for over 4,000 years and found in pharaohs' tombs. Safe for tree-nut allergies. It's what gives Bouye its creamy texture, no dairy or coconut milk needed.",
      },
      {
        topic: "Tigernut",
        title: "The base of kunnu aya",
        body: "Across Nigeria, Niger, Mali, and Senegal, tigernut is the base of kunnu aya, a creamy traditional drink. Naturally rich in iron, magnesium, zinc, vitamin E, and resistant starch.",
      },
      {
        topic: "Acacia Fibre",
        title: "Sahelian tree sap",
        body: "Harvested from the Acacia senegal tree, native to the same Sahel region as the baobab. Used in food and traditional medicine across Sudan and West Africa for over 4,000 years. A prebiotic that slows sugar absorption and feeds gut bacteria, with none of the bloat of inulin.",
      },
      {
        topic: "Sunflower Lecithin",
        title: "Soy-free, by design",
        body: "A natural emulsifier from sunflower seeds. Keeps the baobab and tigernut powders suspended so the drink stays creamy instead of separating. Contains phosphatidylcholine, which supports brain and liver function. Picked over soy lecithin so the drink stays allergen-friendly.",
      },
      {
        topic: "Coconut Sugar",
        title: "Just 3 grams",
        body: "We only use 3g per bottle because baobab and tigernut bring their own natural sweetness. Coconut sugar has a glycemic index of ~35 vs ~65 for cane, so it doesn't spike blood sugar the same way.",
      },
      {
        topic: "Monk Fruit & Vanilla",
        title: "The finishing touches",
        body: "Monk fruit, used by Buddhist monks in southern China for 800+ years, adds zero-calorie sweetness from mogrosides. Vanilla, domesticated by the Totonac people of Mexico over 1,000 years ago, is one of the only flavours that pairs naturally with baobab's tangy citrus notes.",
      },
      {
        topic: "Allergens",
        title: "Tigernut is a tuber, not a nut",
        body: "It bears repeating: tigernut is botanically a tuber (Cyperus esculentus), not a tree nut. Bouye is free from all 11 Canadian priority allergens: no peanuts, tree nuts, milk, eggs, fish, shellfish, soy, wheat, sesame, mustard, or sulphites. Plant-based and dairy-free.",
      },
      {
        topic: "Benefits",
        title: "Functional, not flavoured",
        body: "Excellent source of Fibre (82% DV) and Vitamin C (60% DV). Source of Potassium, Iron, Zinc, Magnesium, and Calcium. Prebiotic fibre from acacia and tigernut supports gut health. Plant-based, dairy-free.",
      },
      {
        topic: "Fun Fact",
        title: "Same soil, same story",
        body: "Baobab, tigernut, and acacia all grow in the same Sahelian region. They've been ingredients in West African diets for thousands of years, long before any of them were marketed as superfoods. Bouye is just the old recipe, in a bottle.",
      },
    ],
  },
];

const cardTransition = {
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -24, filter: "blur(8px)" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

export const DiscoverSection = () => {
  const [activeDrinkId, setActiveDrinkId] = useState(drinks[0].id);
  const [cardIndex, setCardIndex] = useState(0);

  const activeDrink = drinks.find((d) => d.id === activeDrinkId) ?? drinks[0];
  const card = activeDrink.cards[cardIndex];
  const totalCards = activeDrink.cards.length;

  const goPrev = () =>
    setCardIndex((i) => (i - 1 + totalCards) % totalCards);
  const goNext = () => setCardIndex((i) => (i + 1) % totalCards);

  const switchDrink = (id: string) => {
    setActiveDrinkId(id);
    setCardIndex(0);
  };

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      id="discover"
    >
      {/* Ambient color blob that shifts with the active drink */}
      <motion.div
        animate={{ backgroundColor: `${activeDrink.color}10` }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none"
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/[0.06] text-primary text-[11px] font-semibold tracking-[0.15em] uppercase mb-6">
            <SparklesIcon size={12} />
            Get to know each drink
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
            Every ingredient
            <br />
            <span
              className="text-gradient transition-colors duration-500"
              style={{
                backgroundImage: `linear-gradient(90deg, ${activeDrink.color}, ${activeDrink.color}99)`,
              }}
            >
              has a story.
            </span>
          </h2>
          <p className="text-lg text-foreground/45 max-w-xl mx-auto leading-relaxed">
            Pick a drink. Flip through the cards.
          </p>
        </motion.div>

        {/* Drink switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-content2/60 backdrop-blur-sm border border-foreground/[0.06]">
            {drinks.map((drink) => {
              const isActive = drink.id === activeDrinkId;

              return (
                <button
                  key={drink.id}
                  className="relative px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer"
                  onClick={() => switchDrink(drink.id)}
                  style={{
                    color: isActive ? "white" : "rgb(var(--foreground-rgb, 0 0 0) / 0.55)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      layoutId="drink-switcher-pill"
                      style={{ backgroundColor: drink.color }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <span className="text-base">{drink.emoji}</span>
                    {drink.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Flashcard area */}
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14 items-center">
          {/* Left: bottle image, swaps on drink change */}
          <div className="relative h-[420px] sm:h-[500px] hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDrink.id}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                className="absolute inset-0 flex items-center justify-center"
                exit={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
                initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(ellipse at 50% 55%, ${activeDrink.color}25, ${activeDrink.color}08 60%, transparent 75%)`,
                  }}
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  className="relative w-full h-full"
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    alt={`${activeDrink.name} bottle`}
                    className="object-contain drop-shadow-2xl"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    src={activeDrink.image}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: card stack */}
          <div className="relative">
            {/* Card */}
            <div className="relative">
              {/* Stacked card hints behind */}
              <div
                className="absolute inset-x-6 -top-3 h-full rounded-3xl border border-foreground/[0.04] bg-content2/40 opacity-60"
                aria-hidden
              />
              <div
                className="absolute inset-x-3 -top-1.5 h-full rounded-3xl border border-foreground/[0.05] bg-content2/60 opacity-80"
                aria-hidden
              />

              <div className="relative rounded-3xl border border-foreground/[0.07] bg-content1 overflow-hidden shadow-xl shadow-black/[0.04]">
                {/* Color rail */}
                <div
                  className="h-1.5 w-full transition-colors duration-500"
                  style={{ backgroundColor: activeDrink.color }}
                />

                <div className="p-8 sm:p-10 min-h-[380px] sm:min-h-[420px] flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeDrink.id}-${cardIndex}`}
                      animate={cardTransition.animate}
                      className="flex-1 flex flex-col"
                      exit={cardTransition.exit}
                      initial={cardTransition.initial}
                      transition={cardTransition.transition}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <span
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase"
                          style={{
                            backgroundColor: `${activeDrink.color}12`,
                            color: activeDrink.color,
                          }}
                        >
                          {card.topic}
                        </span>
                        <span className="text-[11px] font-mono text-foreground/35 tabular-nums">
                          {String(cardIndex + 1).padStart(2, "0")} /{" "}
                          {String(totalCards).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-[2rem] font-bold text-foreground leading-[1.15] mb-5">
                        {card.title}
                      </h3>

                      <p className="text-base sm:text-[17px] text-foreground/60 leading-[1.7]">
                        {card.body}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Footer: dots + nav */}
                  <div className="flex items-center justify-between gap-4 pt-8 mt-6 border-t border-foreground/[0.06]">
                    <div className="flex items-center gap-1.5">
                      {activeDrink.cards.map((c, i) => (
                        <button
                          key={`${activeDrink.id}-${i}`}
                          aria-label={`Go to card ${i + 1}: ${c.topic}`}
                          className="h-1.5 rounded-full transition-all cursor-pointer"
                          onClick={() => setCardIndex(i)}
                          style={{
                            width: i === cardIndex ? 24 : 8,
                            backgroundColor:
                              i === cardIndex
                                ? activeDrink.color
                                : `${activeDrink.color}30`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        aria-label="Previous card"
                        className="w-10 h-10 rounded-full border border-foreground/[0.1] flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/[0.2] transition-colors cursor-pointer"
                        onClick={goPrev}
                      >
                        <ArrowRightIcon
                          className="rotate-180"
                          size={16}
                        />
                      </button>
                      <button
                        aria-label="Next card"
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-90 cursor-pointer"
                        onClick={goNext}
                        style={{ backgroundColor: activeDrink.color }}
                      >
                        <ArrowRightIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile bottle, shown beneath card on small screens */}
            <div className="relative h-48 mt-10 lg:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDrink.id}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                  exit={{ opacity: 0, scale: 0.92 }}
                  initial={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(ellipse at center, ${activeDrink.color}20, transparent 65%)`,
                    }}
                  />
                  <div className="relative w-40 h-44">
                    <Image
                      alt={`${activeDrink.name} bottle`}
                      className="object-contain drop-shadow-xl"
                      fill
                      sizes="200px"
                      src={activeDrink.image}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
