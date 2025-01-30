"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const currentPath = pathSegments.length > 1 ? `/${pathSegments[1]}` : "/";
    return currentPath === href;
  };

  // Fecha o menu ao navegar para outra página
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <header className="w-full bg-[rgb(var(--var-marca-100))] backdrop-blur-lg flex items-center justify-between px-4 py-2 z-50">
      {/* Logo */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden ">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menu Desktop */}
      <nav className="hidden md:flex gap-4">
        <NavLink href="/pt" isActive={isActive("/")}>
          Início
        </NavLink>
        <NavLink href="/noticias" isActive={isActive("/noticias")}>
          Notícias
        </NavLink>
        <NavLink href="/eventos" isActive={isActive("/eventos")}>
          Eventos
        </NavLink>
      </nav>

      <Link href="/pt" className="text-xl font-bold">
        <Image
          src={"/img/logoMeninasSTEM.png"}
          alt="Logo Meninas STEM"
          width={300}
          height={200}
          quality={100}
          className="w-[5rem] h-auto mx-auto"
        />
      </Link>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col gap-4 md:hidden"
          >
            <NavLink href="/pt" isActive={isActive("/")} onClick={() => setIsOpen(false)}>
              Início
            </NavLink>
            <NavLink href="/noticias" isActive={isActive("/noticias")} onClick={() => setIsOpen(false)}>
              Notícias
            </NavLink>
            <NavLink href="/eventos" isActive={isActive("/eventos")} onClick={() => setIsOpen(false)}>
              Eventos
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavLink = ({
  href,
  isActive,
  children,
  onClick,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link href={href} onClick={onClick} className={`top-title-medium block ${isActive ? "text-primary font-bold" : ""}`}>
    {children}
  </Link>
);

export default Header;
