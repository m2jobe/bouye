"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { useState } from "react";
import { motion } from "framer-motion";

import { CheckIcon } from "@/components/icons";

const products = [
  { id: "wonjo", name: "Wonjo", subtitle: "Hibiscus", price: 12.0, color: "#C41E3A" },
  { id: "ginger", name: "Ginger", subtitle: "Fresh Root", price: 12.0, color: "#D4A017" },
  { id: "bouye", name: "Bouye", subtitle: "Baobab", price: 12.0, color: "#1B4332" },
];

const BUNDLE_PRICE = 30.0;

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselect?: string;
}

export const OrderModal = ({ isOpen, onClose, preselect }: OrderModalProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = { wonjo: 0, ginger: 0, bouye: 0 };

    if (preselect && init[preselect] !== undefined) {
      init[preselect] = 1;
    }

    return init;
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const regularTotal = products.reduce(
    (sum, p) => sum + p.price * (quantities[p.id] || 0),
    0,
  );
  const itemCount = Object.values(quantities).reduce((a, b) => a + b, 0);

  // Bundle: all 3 juices with at least 1 each = $30 per set of 3
  const hasAllThree = products.every((p) => (quantities[p.id] || 0) >= 1);
  const bundleCount = hasAllThree
    ? Math.min(...products.map((p) => quantities[p.id] || 0))
    : 0;
  const extrasTotal = products.reduce((sum, p) => {
    const extras = Math.max(0, (quantities[p.id] || 0) - bundleCount);

    return sum + extras * p.price;
  }, 0);
  const total = bundleCount * BUNDLE_PRICE + extrasTotal;
  const savings = regularTotal - total;

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(20, (prev[id] || 0) + delta)),
    }));
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || itemCount === 0) {
      setError("Please fill in your name, email, and select at least one juice.");

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

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name.trim(),
          customer_email: email.trim(),
          customer_phone: phone.trim() || null,
          items,
          notes: notes.trim() || null,
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
                  We&apos;ll reach out to confirm pickup/delivery details.
                  Check your email for confirmation.
                </p>
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
                Select your juices. We&apos;ll confirm pickup/delivery details by email.
              </p>
            </ModalHeader>
            <ModalBody className="gap-5">
              {/* Product selector */}
              <div className="space-y-3">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between py-3 px-4 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.01]"
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
                        <span className="font-serif font-bold text-sm text-foreground">
                          {p.name}
                        </span>
                        <span className="text-[11px] text-foreground/35 block">
                          {p.subtitle} · ${p.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        isIconOnly
                        className="min-w-7 h-7 text-lg"
                        radius="full"
                        size="sm"
                        variant="flat"
                        onPress={() => updateQty(p.id, -1)}
                      >
                        −
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold text-foreground">
                        {quantities[p.id]}
                      </span>
                      <Button
                        isIconOnly
                        className="min-w-7 h-7 text-lg"
                        color="primary"
                        radius="full"
                        size="sm"
                        variant="flat"
                        onPress={() => updateQty(p.id, 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bundle upsell */}
              {itemCount > 0 && !hasAllThree && (
                <div className="px-4 py-3 rounded-2xl bg-primary/[0.04] border border-primary/[0.08]">
                  <p className="text-xs text-primary font-medium">
                    🎉 Get all 3 for $30 (save $6) — add{" "}
                    {products
                      .filter((p) => !quantities[p.id])
                      .map((p) => p.name)
                      .join(" & ")}{" "}
                    to unlock the bundle!
                  </p>
                </div>
              )}

              {itemCount > 0 && (
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <Chip color="primary" size="sm" variant="flat">
                      {itemCount} juice{itemCount > 1 ? "s" : ""}
                    </Chip>
                    {bundleCount > 0 && (
                      <Chip color="success" size="sm" variant="flat">
                        {bundleCount} bundle{bundleCount > 1 ? "s" : ""}
                      </Chip>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-serif font-bold text-lg text-foreground">
                      ${total.toFixed(2)}
                    </span>
                    {savings > 0 && (
                      <span className="block text-[11px] text-green-600 dark:text-green-400 font-medium">
                        You save ${savings.toFixed(2)}
                      </span>
                    )}
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
                  label="Phone (optional)"
                  placeholder="416-xxx-xxxx"
                  radius="lg"
                  size="sm"
                  type="tel"
                  value={phone}
                  variant="bordered"
                  onValueChange={setPhone}
                />
                <Input
                  label="Notes (optional)"
                  placeholder="Delivery address, pickup preference, etc."
                  radius="lg"
                  size="sm"
                  value={notes}
                  variant="bordered"
                  onValueChange={setNotes}
                />
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
