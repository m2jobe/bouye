"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { useState } from "react";
import { motion } from "framer-motion";

import { CheckIcon } from "@/components/icons";

// Bouye launch promo: $12 for the first 7 days, then $15
const BOUYE_PROMO_END = new Date("2026-06-08T00:00:00-04:00");
const BOUYE_REGULAR_PRICE = 15;
const BOUYE_PROMO_PRICE = 12;
const isBouyePromoActive = () => Date.now() < BOUYE_PROMO_END.getTime();

// Free delivery — June promo, expires at start of July
const FREE_DELIVERY_END = new Date("2026-07-01T00:00:00-04:00");
const REGULAR_DELIVERY_FEE = 5;
const isFreeDeliveryActive = () => Date.now() < FREE_DELIVERY_END.getTime();

const MAX_BOTTLES_PER_ORDER = 10;

type Product = {
  id: "wonjo" | "ginger" | "bouye";
  name: string;
  subtitle: string;
  price: number;
  regularPrice?: number;
  color: string;
  available: boolean;
  unavailableReason?: string;
};

const buildProducts = (): Product[] => {
  const bouyePromo = isBouyePromoActive();

  return [
    {
      id: "wonjo",
      name: "Wonjo",
      subtitle: "Hibiscus",
      price: 10,
      color: "#C41E3A",
      available: true,
    },
    {
      id: "ginger",
      name: "Jinjin",
      subtitle: "Fresh Ginger Juice",
      price: 12,
      color: "#D4A017",
      available: false,
      unavailableReason: "Back soon",
    },
    {
      id: "bouye",
      name: "Bouye",
      subtitle: "Baobab",
      price: bouyePromo ? BOUYE_PROMO_PRICE : BOUYE_REGULAR_PRICE,
      regularPrice: bouyePromo ? BOUYE_REGULAR_PRICE : undefined,
      color: "#1B4332",
      available: true,
    },
  ];
};

type ContactMethod = "text" | "call" | "email" | "either";

const contactMethods: { id: ContactMethod; label: string; emoji: string }[] = [
  { id: "text", label: "Text me", emoji: "💬" },
  { id: "call", label: "Call me", emoji: "📞" },
  { id: "email", label: "Email me", emoji: "✉️" },
  { id: "either", label: "Whatever works", emoji: "👍" },
];

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselect?: string;
}

export const OrderModal = ({ isOpen, onClose, preselect }: OrderModalProps) => {
  const products = buildProducts();
  const freeDelivery = isFreeDeliveryActive();
  const deliveryFee = freeDelivery ? 0 : REGULAR_DELIVERY_FEE;

  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = { wonjo: 0, ginger: 0, bouye: 0 };
    const target = products.find((p) => p.id === preselect);

    if (preselect && target?.available) {
      init[preselect] = 1;
    }

    return init;
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("text");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const subtotal = products.reduce(
    (sum, p) => sum + p.price * (quantities[p.id] || 0),
    0,
  );
  const itemCount = Object.values(quantities).reduce((a, b) => a + b, 0);
  const total = subtotal + deliveryFee;
  const remaining = MAX_BOTTLES_PER_ORDER - itemCount;
  const atLimit = itemCount >= MAX_BOTTLES_PER_ORDER;

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const otherTotal = Object.entries(prev).reduce(
        (sum, [k, v]) => (k === id ? sum : sum + v),
        0,
      );
      const proposed = Math.max(0, (prev[id] || 0) + delta);
      const allowed = Math.min(proposed, MAX_BOTTLES_PER_ORDER - otherTotal);

      return { ...prev, [id]: allowed };
    });
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || itemCount === 0) {
      setError("Please fill in your name, email, phone number, and select at least one juice.");

      return;
    }
    if (!address.trim()) {
      setError("Please enter your delivery address.");

      return;
    }
    if (itemCount > MAX_BOTTLES_PER_ORDER) {
      setError(`Orders are limited to ${MAX_BOTTLES_PER_ORDER} bottles per household.`);

      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const items = products
        .filter((p) => quantities[p.id] > 0)
        .map((p) => ({
          name: p.name,
          quantity: quantities[p.id],
          price: p.price,
        }));

      const contactLabel =
        contactMethods.find((m) => m.id === contactMethod)?.label ?? contactMethod;
      const composedNotes = [
        `Preferred contact: ${contactLabel}`,
        notes.trim() ? `Notes: ${notes.trim()}` : null,
      ]
        .filter(Boolean)
        .join(" · ");

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name.trim(),
          customer_email: email.trim(),
          customer_phone: phone.trim(),
          order_type: "delivery",
          delivery_address: address.trim(),
          delivery_fee: deliveryFee,
          items,
          notes: composedNotes,
          preferred_contact: contactMethod,
        }),
      });

      if (!res.ok) {
        throw new Error("Order failed");
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again or DM us on Instagram.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (success) {
      setQuantities({ wonjo: 0, ginger: 0, bouye: 0 });
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setContactMethod("text");
      setNotes("");
      setSuccess(false);
      setError("");
    }
    onClose();
  };

  return (
    <Modal
      classNames={{
        base: "bg-content1 border border-foreground/[0.06]",
        header: "border-b border-foreground/[0.04]",
        footer: "border-t border-foreground/[0.04]",
      }}
      isOpen={isOpen}
      placement="center"
      radius="lg"
      scrollBehavior="inside"
      size="lg"
      onClose={handleClose}
    >
      <ModalContent>
        {success ? (
          <>
            <ModalBody className="py-12 text-center">
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.9 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <CheckIcon className="text-primary" size={28} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Order received!
                </h3>
                <p className="text-foreground/50 text-sm max-w-sm mx-auto">
                  We&apos;ll reach out via{" "}
                  <span className="font-medium text-foreground">
                    {contactMethods.find((m) => m.id === contactMethod)?.label.toLowerCase()}
                  </span>{" "}
                  to coordinate delivery details and timing.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/[0.06] border border-primary/[0.1] text-xs text-primary font-medium">
                  <span>💵</span>
                  Payment collected on arrival (cash or e-transfer)
                </div>
              </motion.div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-full font-semibold"
                color="primary"
                radius="full"
                onPress={handleClose}
              >
                Done
              </Button>
            </ModalFooter>
          </>
        ) : (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-4">
              <h3 className="font-serif text-xl font-bold">Order Bouye</h3>
              <p className="text-xs text-foreground/40 font-normal">
                Free delivery across the GTA. Pay on arrival.
              </p>
            </ModalHeader>
            <ModalBody className="gap-5">
              {/* June promo banner */}
              {freeDelivery && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#1B4332]/[0.08] to-[#D4A017]/[0.08] border border-[#1B4332]/[0.1]">
                  <span className="text-xl">🚚</span>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-foreground">
                      Free delivery — June promo
                    </p>
                    <p className="text-[11px] text-foreground/55 leading-snug">
                      Across the GTA, this month only. No minimum.
                    </p>
                  </div>
                </div>
              )}

              {/* Product selector */}
              <div className="space-y-3">
                {products.map((p) => {
                  const qty = quantities[p.id] || 0;
                  const canAdd = p.available && !atLimit;
                  const showPromoStrike = !!p.regularPrice;

                  return (
                    <div
                      key={p.id}
                      className={`flex items-center justify-between py-3 px-4 rounded-2xl border ${
                        p.available
                          ? "border-foreground/[0.06] bg-foreground/[0.01]"
                          : "border-foreground/[0.04] bg-foreground/[0.015] opacity-70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${p.color}12` }}
                        >
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: p.color }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-sm text-foreground">
                              {p.name}
                            </span>
                            {!p.available && (
                              <Chip
                                className="text-[10px] h-5 px-2"
                                size="sm"
                                variant="flat"
                              >
                                {p.unavailableReason ?? "Unavailable"}
                              </Chip>
                            )}
                            {showPromoStrike && (
                              <Chip
                                className="text-[10px] h-5 px-2 bg-[#D4A017]/15 text-[#9B7410] dark:text-[#D4A017] font-semibold"
                                size="sm"
                                variant="flat"
                              >
                                Launch promo
                              </Chip>
                            )}
                          </div>
                          <span className="text-[11px] text-foreground/35 block">
                            {p.subtitle} ·{" "}
                            {showPromoStrike && (
                              <span className="line-through text-foreground/30 mr-1">
                                ${p.regularPrice!.toFixed(2)}
                              </span>
                            )}
                            <span className={showPromoStrike ? "font-semibold text-foreground/55" : ""}>
                              ${p.price.toFixed(2)}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          isIconOnly
                          className="min-w-7 h-7 text-lg"
                          isDisabled={!p.available || qty === 0}
                          radius="full"
                          size="sm"
                          variant="flat"
                          onPress={() => updateQty(p.id, -1)}
                        >
                          −
                        </Button>
                        <span className="w-6 text-center text-sm font-semibold text-foreground">
                          {qty}
                        </span>
                        <Button
                          isIconOnly
                          className="min-w-7 h-7 text-lg"
                          color="primary"
                          isDisabled={!canAdd}
                          radius="full"
                          size="sm"
                          variant="flat"
                          onPress={() => updateQty(p.id, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottle counter */}
              {itemCount > 0 && (
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <Chip color="primary" size="sm" variant="flat">
                      {itemCount} of {MAX_BOTTLES_PER_ORDER} bottle
                      {itemCount === 1 ? "" : "s"}
                    </Chip>
                    {atLimit && (
                      <span className="text-[11px] text-foreground/45">
                        Order limit reached
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-foreground">
                      ${total.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-foreground/40">
                      {freeDelivery
                        ? "Free delivery"
                        : `+ $${REGULAR_DELIVERY_FEE.toFixed(2)} delivery`}
                    </div>
                  </div>
                </div>
              )}

              <Divider className="bg-foreground/[0.04]" />

              {/* Customer info */}
              <div className="space-y-3">
                <Input
                  isRequired
                  label="Name"
                  placeholder="Your name"
                  radius="lg"
                  size="sm"
                  value={name}
                  variant="bordered"
                  onValueChange={setName}
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="your@email.com"
                  radius="lg"
                  size="sm"
                  type="email"
                  value={email}
                  variant="bordered"
                  onValueChange={setEmail}
                />
                <Input
                  isRequired
                  label="Phone"
                  placeholder="416-xxx-xxxx"
                  radius="lg"
                  size="sm"
                  type="tel"
                  value={phone}
                  variant="bordered"
                  onValueChange={setPhone}
                />
                <Input
                  isRequired
                  label="Delivery Address"
                  placeholder="123 Queen St W, Toronto, ON"
                  radius="lg"
                  size="sm"
                  value={address}
                  variant="bordered"
                  onValueChange={setAddress}
                />
              </div>

              {/* Contact method picker */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground/70 px-1">
                  How should we reach you to coordinate delivery?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {contactMethods.map((m) => {
                    const active = m.id === contactMethod;

                    return (
                      <button
                        key={m.id}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                          active
                            ? "bg-primary/[0.08] border-primary/40 text-primary"
                            : "bg-foreground/[0.01] border-foreground/[0.08] text-foreground/60 hover:border-foreground/[0.15]"
                        }`}
                        type="button"
                        onClick={() => setContactMethod(m.id)}
                      >
                        <span className="text-base">{m.emoji}</span>
                        {m.label}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-foreground/40 px-1">
                  We&apos;ll confirm timing and address details. No marketing,
                  just delivery coordination.
                </p>
              </div>

              <Input
                label="Notes (optional)"
                placeholder="Buzzer code, drop-off spot, allergies, etc."
                radius="lg"
                size="sm"
                value={notes}
                variant="bordered"
                onValueChange={setNotes}
              />

              {/* Payment notice */}
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-foreground/[0.025] border border-foreground/[0.06]">
                <span className="text-lg">💵</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground">
                    Pay on arrival
                  </p>
                  <p className="text-[11px] text-foreground/45 leading-snug">
                    No upfront payment. Cash or e-transfer accepted when we
                    hand off your juices.
                  </p>
                </div>
              </div>

              {error && (
                <p className="text-xs text-danger text-center">{error}</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                className="font-medium"
                radius="full"
                variant="flat"
                onPress={handleClose}
              >
                Cancel
              </Button>
              <Button
                className="font-semibold flex-grow shadow-md shadow-primary/20"
                color="primary"
                isDisabled={itemCount === 0}
                isLoading={submitting}
                radius="full"
                onPress={handleSubmit}
              >
                Place Order · ${total.toFixed(2)}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
