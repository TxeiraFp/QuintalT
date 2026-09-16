"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto max-w-7xl px-4">

        {/* Barra principal */}
        <div className="flex h-23 items-center justify-between">

          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="Quintal"
              width={64}
              height={30}
              priority
              className="h-auto w-auto"
            />
          </Link>

          {/* Menu desktop */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              Início
            </Link>

            <Link
              href="/catalogo"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              Catálogo
            </Link>

            <Link
              href="/categorias"
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              Categorias
            </Link>
          </div>

          {/* Pesquisa desktop */}
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="w-56 rounded-full border border-gray-300 py-2 pl-4 pr-10 text-sm outline-none transition focus:border-gray-500"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          {/* Botão mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl md:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Pesquisa mobile */}
        <div className="pb-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              className="w-full rounded-full border border-gray-300 py-3 pl-4 pr-10 text-sm outline-none transition focus:border-gray-500"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col">

              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="border-b py-4 text-sm font-medium text-gray-700"
              >
                Início
              </Link>

              <Link
                href="/catalogo"
                onClick={() => setMenuOpen(false)}
                className="border-b py-4 text-sm font-medium text-gray-700"
              >
                Catálogo
              </Link>

              <Link
                href="/categorias"
                onClick={() => setMenuOpen(false)}
                className="py-4 text-sm font-medium text-gray-700"
              >
                Categorias
              </Link>

            </div>
          </div>
        )}

      </nav>
    </header>
  );
}
