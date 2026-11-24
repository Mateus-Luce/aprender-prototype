import Link from "next/link";
import { BookOpen, QrCode, Sparkles } from "lucide-react";
import { ALUNO, LIVRO_ATIVO } from "@/lib/dados";
import { botaoPrimario, botaoSecundario, cartao } from "@/components/ui";

export const metadata = { title: "QR Code do livro · Aprender + Fala Tio" };

export default function QrPage() {
  const c = LIVRO_ATIVO.capitulo;
  const linhas = [
    ["Material", `Livro do aluno · ${LIVRO_ATIVO.disciplina}`],
    ["Série", ALUNO.serie],
    ["Disciplina", LIVRO_ATIVO.disciplina],
    ["Capítulo", `Capítulo ${c.numero} · ${c.titulo}`],
    ["Assunto", c.assuntos[0]],
  ];
  return (
    <div className="mx-auto max-w-xl pt-4">
      <div className={`${cartao} text-center`}>
        <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-ap-folha">
          <QrCode aria-hidden className="h-9 w-9 text-ap-escuro" />
        </span>
        <p className="text-xs font-bold uppercase tracking-widest text-ap-medio">QR Code reconhecido</p>
        <h1 className="mt-1 font-titulo text-2xl font-black text-ap-tinta">Você abriu um capítulo do seu livro</h1>
        <p className="mt-2 text-sm text-gray-600">
          A plataforma identificou o conteúdo sozinha. Você não precisa procurar nada: é só continuar.
        </p>

        <dl className="mt-5 divide-y divide-gray-100 rounded-2xl bg-gray-50 text-left">
          {linhas.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 px-4 py-3">
              <dt className="text-xs font-semibold text-gray-500">{k}</dt>
              <dd className="text-right text-sm font-bold text-ap-tinta">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-col gap-2">
          <Link href="/aluno" className={botaoPrimario}>
            <BookOpen aria-hidden className="h-4 w-4" />
            Entrar e estudar este capítulo
          </Link>
          <Link href="/aluno/tia" className={botaoSecundario}>
            <Sparkles aria-hidden className="h-4 w-4" />
            Perguntar à TIA sobre este assunto
          </Link>
        </div>
        <p className="mt-5 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
          Simulação: no produto real, o QR Code leva ao login do aluno e, em seguida, direto a este capítulo. Aqui o
          reconhecimento é demonstrativo.
        </p>
      </div>
    </div>
  );
}
