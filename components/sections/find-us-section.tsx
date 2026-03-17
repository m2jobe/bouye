"use client";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";

import { MapPinIcon, ArrowRightIcon } from "@/components/icons";
import { useOrder } from "@/components/order-provider";
import { siteConfig } from "@/config/site";

const channels = [
  {
    emoji: "📦",
    name: "Order Online",
    description:
      "Order directly through our website. Pick your juices, we'll confirm pickup or delivery details by email.",
    tag: "Direct Order",
    availability: "Open Now",
    action: "order",
    accent: "#1B4332",
  },
  {
    emoji: "🛵",
    name: "Uber Eats",
    description:
      "We're coming to Uber Eats soon. Follow us on Instagram to be the first to know when we go live.",
    tag: "Delivery",
    availability: "Coming Soon",
    action: "instagram",
    accent: "#D4A017",
  },
  {
    emoji: "🏕️",
    name: "Markets & Pop-Ups",
    description:
      "Find us at weekend farmers markets across the GTA. Dates announced on Instagram.",
    tag: "In Person",
    availability: "Coming Soon",
    action: "instagram",
    accent: "#C41E3A",
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
  visible: { transition: { staggerChildren: 0.1 } },
};

export const FindUsSection = () => {
  const { openOrder } = useOrder();

  return (
    <section
      className="py-28 sm:py-36 relative overflow-hidden"
      id="find-us"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0E8]/30 via-transparent to-[#F5F0E8]/30 dark:from-[#1B4332]/5 dark:via-transparent dark:to-[#1B4332]/5 pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Chip
            className="mb-6"
            color="warning"
            size="sm"
            startContent={<MapPinIcon size={14} />}
            variant="flat"
          >
            Find Us
          </Chip>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
            Get your Bouye
          </h2>
          <p className="text-lg text-foreground/40 max-w-md mx-auto">
            Order direct through our website. More channels coming soon.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-5 lg:gap-6"
          initial="hidden"
          variants={stagger}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {channels.map((channel) => (
            <motion.div
              key={channel.name}
              className="group"
              variants={fadeUp}
            >
              <div className="rounded-3xl border border-foreground/[0.06] bg-content1 p-7 h-full flex flex-col hover-lift relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, ${channel.accent}06, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl">{channel.emoji}</span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        channel.availability === "Open Now"
                          ? "text-green-600 dark:text-green-400 bg-green-500/10"
                          : "text-foreground/40 bg-foreground/[0.04]"
                      }`}
                    >
                      {channel.availability}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                    {channel.name}
                  </h3>
                  <p className="text-sm text-foreground/45 leading-relaxed mb-6 flex-grow">
                    {channel.description}
                  </p>

                  {channel.action === "order" ? (
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
                      variant="flat"
                      onPress={() => openOrder()}
                    >
                      Order Now
                    </Button>
                  ) : (
                    <Button
                      as={Link}
                      className="w-full font-semibold group/btn"
                      color="primary"
                      endContent={
                        <ArrowRightIcon
                          className="transition-transform group-hover/btn:translate-x-1"
                          size={16}
                        />
                      }
                      href={siteConfig.links.instagram}
                      radius="full"
                      variant="flat"
                      isExternal
                    >
                      Follow for Updates
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-[13px] text-foreground/30 mt-12">
          Follow{" "}
          <Link
            className="text-primary text-[13px] font-medium"
            href={siteConfig.links.instagram}
            isExternal
          >
            @bouyejuices
          </Link>{" "}
          for all updates
        </p>
      </div>
    </section>
  );
};
