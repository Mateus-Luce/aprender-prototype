"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, ListChecks, QrCode, Sparkles } from "lucide-react";
import { COR_DISCIPLINA, LIVROS } from "@/lib/dados";
import { Barra, Titulo, cartao } from "@/components/ui";
import { LibraryBig } from "lucide-react";

export default function Biblioteca() {
  const [aberto, setAberto] = useState<string | null>("Matemática");
  const [capAberto, setCapAberto] = useState<string | null>("mat-2");

  return (
    <div>
      <Titulo
        icone={LibraryBig}
        titulo="Seus materiais"
        subtitulo="A mesma organização do livro impresso: disciplina, unidade, capítulo e assunto."
      />

      <ul className="flex flex-col gap-4">
        {LIVROS.map((l) => {
          const cor = COR_DISCIPLINA[l.disciplina];
          const media = Math.round(l.capitulos.reduce((s, c) => s + c.progresso, 0) / l.capitulos.length);
          const aberta = aberto === l.disciplina;
          const unidades = Array.from(new Set(l.capitulos.map((c) => c.unidade)));
          return (
            <li key={l.disciplina} className={cartao}>
              <button
                type="button"
                aria-expanded={aberta}
                onClick={() => setAberto(aberta ? null : l.disciplina)}
                className="flex w-full min-h-[56px] items-center gap-4 text-left"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-titulo text-lg font-black text-white" style={{ background: cor }}>
                  {l.disciplina.charAt(0)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-titulo text-lg font-black text-ap-tinta">{l.disciplina}</span>
                  <span className="block truncate text-xs text-gray-500">{l.titulo}</span>
                  <Barra valor={media} cor={cor} altura="mt-2 h-1.5" />
                </span>
                <span className="text-sm font-black" style={{ color: cor }}>
                  {media}%
                </span>
                <ChevronDown aria-hidden className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${aberta ? "rotate-180" : ""}`} />
              </button>

              {aberta && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                  {unidades.map((u) => (
                    <div key={u} className="mb-4 last:mb-0">
                      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">{u}</p>
                      <ul className="flex flex-col gap-2">
                        {l.capitulos
                          .filter((c) => c.unidade === u)
                          .map((c) => {
                            const aberto2 = capAberto === c.id;
                            const estudado = c.progresso >= 100;
                            return (
                              <li key={c.id} className="rounded-2xl border border-gray-200">
                                <button
                                  type="button"
                                  aria-expanded={aberto2}
                                  onClick={() => setCapAberto(aberto2 ? null : c.id)}
                                  className="flex w-full min-h-[52px] items-center gap-3 px-4 text-left"
                                >
                                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${estudado ? "bg-ap-escuro text-white" : "bg-gray-100 text-gray-600"}`}>
                                    {estudado ? <Check aria-hidden className="h-4 w-4" /> : c.numero}
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-bold text-gray-900">
                                      Capítulo {c.numero} · {c.titulo}
                                    </span>
                                    <span className="block text-xs text-gray-500">
                                      {estudado ? "Estudado" : c.progresso > 0 ? `${c.progresso}% estudado` : "Ainda não acessado"}
                                    </span>
                                  </span>
                                  <ChevronDown aria-hidden className={`h-4 w-4 text-gray-400 transition-transform ${aberto2 ? "rotate-180" : ""}`} />
                                </button>
                                {aberto2 && (
                                  <div className="border-t border-gray-100 px-4 pb-4 pt-3">
                                    <p className="mb-2 text-xs font-bold text-gray-500">Assuntos</p>
                                    <ul className="mb-3 flex flex-wrap gap-2">
                                      {c.assuntos.map((a) => (
                                        <li key={a} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                          {a}
                                        </li>
                                      ))}
                                    </ul>
                                    <p className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
                                      <QrCode aria-hidden className="h-3.5 w-3.5" />
                                      QR Code no livro impresso: <span className="font-mono">{c.qr}</span>
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      <Link href="/aluno/tia" className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-ap-escuro px-4 text-sm font-bold text-white">
                                        <Sparkles aria-hidden className="h-4 w-4" />
                                        Abrir TIA sobre este conteúdo
                                      </Link>
                                      <Link href="/aluno/atividades" className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-gray-300 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                                        <ListChecks aria-hidden className="h-4 w-4" />
                                        Atividades relacionadas
                                      </Link>
                                    </div>
                                  </div>
                                )}
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
