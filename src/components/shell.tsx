"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, FlaskConical } from "lucide-react";
import { getPerfil, type PerfilId } from "@/lib/perfis";

/** Logo principal da parceria: Aprender em destaque, Fala Tio como parceiro tecnológico. */
export function Marca({ tamanho = "md", invertida = false }: { tamanho?: "sm" | "md" | "lg"; invertida?: boolean }) {
  const h = tamanho === "lg" ? "h-12" : tamanho === "md" ? "h-[42px]" : "h-9";
  const hf = tamanho === "lg" ? "h-[50px]" : tamanho === "md" ? "h-[46px]" : "h-10";
  return (
    <div className="flex items-center gap-3" role="img" aria-label="Aprender e Fala Tio, em parceria">
      <Image
        src={invertida ? "/aprender-logo-branca.png" : "/aprender-logo.png"}
        alt=""
        width={682}
        height={265}
        className={`${h} w-auto`}
        priority
      />
      <span aria-hidden className={`h-8 w-px ${invertida ? "bg-white/30" : "bg-gray-300"}`} />
      <Image
        src="/falatio-logo.png"
        alt=""
        width={864}
        height={327}
        className={`${hf} w-auto ${invertida ? "brightness-0 invert" : ""}`}
      />
    </div>
  );
}

export function AvisoDemo() {
  return (
    <div className="flex items-center justify-center gap-2 bg-amber-100 px-4 py-1.5 text-center text-[11px] font-semibold text-amber-900">
      <FlaskConical aria-hidden className="h-3.5 w-3.5 shrink-0" />
      Protótipo de demonstração: todos os nomes, escolas, municípios e números são fictícios.
    </div>
  );
}

export function Shell({ perfil, children }: { perfil: PerfilId; children: React.ReactNode }) {
  const p = getPerfil(perfil);
  const pathname = usePathname();
  const ativo = (href: string) => (href === p.base ? pathname === href : pathname === href || pathname.startsWith(href + "/"));
  const ehAluno = perfil === "aluno";

  return (
    <div className="min-h-screen">
      <AvisoDemo />
      <div className="flex">
        {/* Menu lateral (desktop) */}
        <aside className="no-print sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-gray-200 bg-white md:flex">
          <div className="border-b border-gray-100 px-5 py-5">
            <Marca tamanho="sm" />
          </div>
          <div className="px-5 pt-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-ap-medio">{p.nome}</p>
          </div>
          <nav aria-label={`Menu de ${p.nome}`} className="flex-1 overflow-y-auto px-3 py-2">
            <ul className="flex flex-col gap-0.5">
              {p.nav.map((i) => {
                const on = ativo(i.href);
                return (
                  <li key={i.href}>
                    <Link
                      href={i.href}
                      aria-current={on ? "page" : undefined}
                      className={`flex min-h-[40px] items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors ${
                        on ? "bg-ap-fundo text-ap-escuro" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <i.icon aria-hidden className={`h-4 w-4 shrink-0 ${on ? "text-ap-medio" : "text-gray-400"}`} />
                      {i.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-t border-gray-100 p-3">
            <div className="mb-2 flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ap-verde text-sm font-black text-ap-tinta">
                {p.usuario.charAt(0)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-gray-900">{p.usuario}</span>
                <span className="block truncate text-[11px] text-gray-500">{p.papel}</span>
              </span>
            </div>
            <Link
              href="/"
              className="flex min-h-[40px] items-center gap-2 rounded-xl px-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              <ArrowLeftRight aria-hidden className="h-4 w-4" />
              Trocar de perfil
            </Link>
            <p className="mt-2 px-3 text-[10px] leading-snug text-gray-400">Tecnologia desenvolvida em parceria com Fala Tio.</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Topo (celular) */}
          <header className="no-print sticky top-0 z-30 border-b border-gray-200 bg-white md:hidden">
            <div className="flex items-center justify-between px-4 py-2.5">
              <Marca tamanho="sm" />
              <Link href="/" aria-label="Trocar de perfil" className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-50">
                <ArrowLeftRight aria-hidden className="h-5 w-5" />
              </Link>
            </div>
            {!ehAluno && (
              <nav aria-label={`Menu de ${p.nome}`} className="overflow-x-auto border-t border-gray-100 px-3 py-2">
                <ul className="flex min-w-max gap-1.5">
                  {p.nav.map((i) => (
                    <li key={i.href}>
                      <Link
                        href={i.href}
                        aria-current={ativo(i.href) ? "page" : undefined}
                        className={`flex min-h-[36px] items-center rounded-full px-3 text-xs font-semibold ${
                          ativo(i.href) ? "bg-ap-escuro text-white" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </header>

          <main className={`mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8 ${ehAluno ? "pb-28 md:pb-10" : "pb-12"}`}>{children}</main>

          {/* Barra de abas (celular, aluno) */}
          {ehAluno && (
            <nav aria-label="Menu do aluno" className="no-print pb-safe fixed inset-x-0 bottom-0 z-40 flex border-t border-gray-200 bg-white/95 backdrop-blur md:hidden">
              {p.nav.map((i) => {
                const on = ativo(i.href);
                return (
                  <Link
                    key={i.href}
                    href={i.href}
                    aria-current={on ? "page" : undefined}
                    className="flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-2"
                  >
                    <span className={`flex h-7 w-12 items-center justify-center rounded-full ${on ? "bg-ap-folha" : ""}`}>
                      <i.icon aria-hidden className={`h-5 w-5 ${on ? "text-ap-escuro" : "text-gray-400"}`} />
                    </span>
                    <span className={`truncate text-[10px] font-semibold ${on ? "text-ap-escuro" : "text-gray-400"}`}>{i.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
