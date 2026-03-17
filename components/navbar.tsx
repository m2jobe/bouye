"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { useState, useEffect } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { useOrder } from "@/components/order-provider";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openOrder } = useOrder();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeroUINavbar
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      classNames={{
        base: `transition-all duration-300 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl shadow-sm border-b border-foreground/[0.04]"
            : "bg-transparent border-b border-transparent"
        }`,
        wrapper: "px-4 sm:px-6",
      }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-2.5 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-2.5 group"
            href="/"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-serif font-bold text-lg tracking-tight text-foreground">
              BOUYE
            </span>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden md:flex gap-1 justify-start ml-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className="text-[13px] font-medium text-foreground/50 hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-foreground/[0.04]"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden md:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="flex gap-3 items-center">
          <ThemeSwitch />
          <Button
            className="font-semibold text-[13px] shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-shadow"
            color="primary"
            radius="full"
            size="sm"
            variant="solid"
            onPress={() => openOrder()}
          >
            Order Now
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="pt-8 pb-6 bg-background/95 backdrop-blur-2xl">
        <div className="flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <Link
                className="text-lg font-medium text-foreground py-2 px-3 rounded-xl hover:bg-foreground/[0.04] transition-colors w-full block"
                href={item.href}
                size="lg"
                onPress={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-foreground/[0.06]">
            <Button
              className="w-full font-semibold"
              color="primary"
              radius="full"
              size="lg"
              variant="solid"
              onPress={() => {
                setIsMenuOpen(false);
                openOrder();
              }}
            >
              Order Now
            </Button>
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
