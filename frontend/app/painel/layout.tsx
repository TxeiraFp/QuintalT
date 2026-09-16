import Link from "next/link";
import type { ReactNode } from "react";

interface PainelLayoutProps {
children: ReactNode;
}

export default function PainelLayout({
children,
}: PainelLayoutProps) {
return (
<div className="min-h-screen bg-gray-100">
<div className="flex min-h-screen">
{/* Sidebar */}
<aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white md:block">
<div className="flex h-16 items-center border-b border-gray-200 px-6">
<Link href="/painel" className="text-xl font-bold tracking-tight text-gray-900" >
Quintal
</Link>
</div>

      <nav className="p-4">
        <div className="mb-6">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Geral
          </p>

          <div className="mt-2 space-y-1">
            <Link
              href="/painel"
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Catálogo
          </p>

          <div className="mt-2 space-y-1">
            <Link
              href="/painel/produtos"
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
            >
              Produtos
            </Link>

            <Link
              href="/painel/categorias"
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
            >
              Categorias
            </Link>
          </div>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Site
          </p>

          <div className="mt-2 space-y-1">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
            >
              Ver site
            </Link>
          </div>
        </div>
      </nav>
    </aside>

    {/* Conteúdo */}
    <div className="flex min-w-0 flex-1 flex-col">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">
            Painel administrativo
          </h1>
        </div>

        <Link
          href="/"
          className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          Ver site
        </Link>
      </header>

      {/* Conteúdo da página */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  </div>
</div>


);
}