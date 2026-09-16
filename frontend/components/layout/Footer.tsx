import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">

          {/* Logo / apresentação */}
          <div>
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Quintal"
                width={120}
                height={45}
                className="mb-4 h-auto w-auto brightness-0 invert"
              />
            </Link>

            <p className="max-w-sm text-sm leading-6 text-gray-400">
              Explore nosso catálogo e conheça nossos produtos.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Navegação
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-white"
                >
                  Início
                </Link>
              </li>

              <li>
                <Link
                  href="/catalogo"
                  className="transition hover:text-white"
                >
                  Catálogo
                </Link>
              </li>

              <li>
                <Link
                  href="/categorias"
                  className="transition hover:text-white"
                >
                  Categorias
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Contato
            </h3>

            <div className="space-y-3 text-sm text-gray-400">
              <p>
                Entre em contato para saber mais
                sobre nossos produtos.
              </p>

              {/* Coloque seus contatos aqui futuramente */}
              <p>
                contato@quintal.com
              </p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-800 pt-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Quintal. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
