"use client";

import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";

import { siteConfig } from "@/config/site";
import { InstagramIcon, TikTokIcon } from "@/components/icons";

export const Footer = () => {
  return (
    <footer className="border-t border-foreground/[0.04]">
      <div className="container mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-serif font-bold text-xl tracking-tight">
                BOUYE
              </span>
            </div>
            <p className="text-sm text-foreground/35 leading-relaxed max-w-xs mb-6">
              Gambian wellness juices, handcrafted in Toronto.
              Wonjo, Ginger & Baobab — delivered fresh to your door.
            </p>
            <div className="flex gap-2">
              <Link
                aria-label="Follow Bouye on Instagram"
                className="w-9 h-9 rounded-full bg-foreground/[0.04] hover:bg-foreground/[0.08] flex items-center justify-center text-foreground/40 hover:text-[#C41E3A] transition-all"
                href={siteConfig.links.instagram}
                isExternal
              >
                <InstagramIcon size={16} />
              </Link>
              <Link
                aria-label="Follow Bouye on TikTok"
                className="w-9 h-9 rounded-full bg-foreground/[0.04] hover:bg-foreground/[0.08] flex items-center justify-center text-foreground/40 hover:text-foreground transition-all"
                href={siteConfig.links.tiktok}
                isExternal
              >
                <TikTokIcon size={16} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-[0.15em] mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-sm text-foreground/35 hover:text-foreground transition-colors"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Order */}
          <div>
            <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-[0.15em] mb-5">
              Order
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-sm text-foreground/35 hover:text-foreground transition-colors"
                  href="#products"
                >
                  Order Online
                </Link>
              </li>
              <li>
                <span className="text-sm text-foreground/20">
                  Uber Eats — Coming Soon
                </span>
              </li>
              <li>
                <Link
                  className="text-sm text-foreground/35 hover:text-foreground transition-colors"
                  href="#find-us"
                >
                  Markets & Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-[0.15em] mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-sm text-foreground/35 hover:text-foreground transition-colors"
                  href="mailto:hello@bouye.ca"
                >
                  hello@bouye.ca
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-foreground/35 hover:text-foreground transition-colors"
                  href={siteConfig.links.instagram}
                  isExternal
                >
                  @bouyejuices
                </Link>
              </li>
              <li>
                <span className="text-sm text-foreground/35">
                  Toronto / GTA, Ontario
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Divider className="my-10 bg-foreground/[0.04]" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-foreground/25 tracking-wide">
            &copy; {new Date().getFullYear()} Bouye. All rights reserved.
          </p>
          <p className="text-[11px] text-foreground/15 tracking-wide">
            Gambian wellness juices, crafted with love in Toronto
          </p>
        </div>
      </div>
    </footer>
  );
};
