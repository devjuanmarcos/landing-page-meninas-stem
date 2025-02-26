"use client";

import React from "react";
import SwitchWithIcon from "../ui/switchWithIcon";
import Image from "next/image";
import FontSizeSlider from "../ui/FontSizeSlider";
import { useTranslations } from "next-intl";
import { ComboboxLanguage } from "../ui/combobox-language";
import { VLibrasIntegration } from "./VLibrasIntegration";
import Link from "next/link";

import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Header from "./Header";
import { NextImage } from "../ui/NextImage";
import BarToolsSkeleton from "../barra-acessibilidade/BarToolsSkeleton";
import HeaderSkeleton from "./HeaderSkeleton";

export const CombinedHeader = ({ locale }: Readonly<{ locale: string }>) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const t = useTranslations("Header");

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const [hasScrolled, setHasScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownVisible && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible, sidebarOpen]);

  function ativarVLibras() {
    const vlibrasButton = document.querySelector('[vw-access-button="true"]') as HTMLElement;

    if (vlibrasButton) {
      vlibrasButton.click();
    }
  }

  if (!isMounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 ">
        <BarToolsSkeleton />
        <HeaderSkeleton />
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 max-h-[6.375rem] ">
      <div
        className={`relative flex justify-between gap-4 items-center ${"bg-primary dark:bg-bg-marca100"} overflow-hidden w-full max-h-[3.125rem] px-4 my-0 mx-auto p-1 text-white `}
      >
        <VLibrasIntegration />
        <div className="flex gap-4 text-white items-center">
          <div className="hidden sm:flex gap-1 items-center text-end ">
            <span className="flex flex-col text-sm justify-center">by</span>
            <NextImage
              imageUrl="/img/LOGO_INSTITUTO_BRANCA.png"
              altImage={t("logo")}
              ariaLabel={t("logo")}
              sizes="100vw"
              className="w-auto h-[1.625rem]"
            />
          </div>
          <span className="md:contents hidden h2-semibold text-[1.4rem]">{t("acessibilidade")}</span>
          <SwitchWithIcon />
          <FontSizeSlider />

          <Image
            src={"/ico/libras.svg"}
            onClick={ativarVLibras}
            alt={t("ativarVLibras")}
            height={32}
            width={32}
            className="text-white cursor-pointer"
          />
          <ComboboxLanguage locale={locale} type="header" />
        </div>
        <div className="hidden md:flex gap-4">
          <Link
            href="https://www.linkedin.com/in/meninas-stem-petr%C3%B3polis-3a205033b/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInLogoIcon className="h-6 w-6 text-white" />
          </Link>
          <Link
            href="https://www.instagram.com/meninastempetropolis?igsh=eWt4cnkydGJtYTZ5  "
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramLogoIcon className="h-6 w-6 text-white" />
          </Link>
        </div>
      </div>
      <Header />
    </header>
  );
};

export default CombinedHeader;
