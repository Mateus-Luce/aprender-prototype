import Link from "next/link";
import { ArrowRight, QrCode, ShieldCheck } from "lucide-react";
import { AvisoDemo, Marca } from "@/components/shell";
import { PERFIS } from "@/lib/perfis";

export default function Entrada() {
  return (
    <div className="min-h-screen">
      <AvisoDemo />
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <Marca tamanho="lg" />
          <p className="hidden text-xs font-semibold text-gray-500 md:block">Plataforma de aprendizagem integrada ao material didático</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <section className="mb-10 grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-ap-medio">Piloto · 8º ano do Ensino Fundamental</p>
            <h1 className="font-titulo text-4xl font-black leading-tight text-ap-tinta md:text-5xl">
              O aprendizado não termina quando o aluno fecha o livro.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600">
              Cada livro da Aprender vira a porta de entrada de uma experiência digital: a TIA ensina a partir do conteúdo do
              livro, o professor orienta, e a escola, a secretaria e a Aprender acompanham os resultados.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/aluno/qr"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-ap-escuro px-5 text-sm font-bold text-white hover:bg-[#245510]"
              >
                <QrCode aria-hidden className="h-5 w-5" />
                Começar pelo QR Code do livro
              </Link>
              <a
                href="#perfis"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Escolher um perfil
              </a>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Como funciona</p>
            <ol className="flex flex-col gap-3">
              {[
                "O aluno recebe o livro e encontra um QR Code no capítulo.",
                "Acessa a plataforma e vê o conteúdo daquele capítulo.",
                "Estuda com a TIA: dúvidas, resumos, podcasts, questões e cartões.",
                "Resolve as atividades e acompanha o próprio progresso.",
                "Os resultados orientam o professor, a escola, a secretaria e a Aprender.",
              ].map((t, i) => (
                <li key={t} className="flex gap-3 text-sm text-gray-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ap-folha text-xs font-black text-ap-escuro">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="perfis" aria-labelledby="t-perfis" className="scroll-mt-6">
          <h2 id="t-perfis" className="font-titulo text-2xl font-black text-ap-tinta">
            Navegue pelos seis perfis
          </h2>
          <p className="mb-5 mt-1 text-sm text-gray-600">
            Em um sistema real, cada pessoa entra direto no ambiente do seu perfil. Aqui você escolhe, para ver como as
            informações circulam do aluno até a Aprender.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PERFIS.map((p) => (
              <li key={p.id}>
                <Link
                  href={p.base}
                  className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: p.cor }}>
                    <p.icon aria-hidden className="h-6 w-6 text-ap-tinta" />
                  </span>
                  <h3 className="font-titulo text-lg font-black text-ap-tinta">{p.nome}</h3>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-600">{p.descricao}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-ap-escuro">
                    Entrar como {p.usuario}
                    <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 flex items-start gap-2 rounded-xl bg-white px-4 py-3 text-xs leading-relaxed text-gray-500 ring-1 ring-gray-200">
          <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ap-medio" />
          Protótipo navegável de demonstração. Nenhuma integração está funcionando de verdade: login, QR Code, TIA e relatórios
          são simulados com dados fictícios. A versão real respeita a LGPD e o melhor interesse de crianças e adolescentes.
        </p>
      </main>

      <footer className="border-t border-gray-200 bg-white py-5 text-center text-xs text-gray-500">
        Tecnologia desenvolvida em parceria com Fala Tio.
      </footer>
    </div>
  );
}
