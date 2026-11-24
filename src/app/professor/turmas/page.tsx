import Link from "next/link";
import { AlertTriangle, UsersRound } from "lucide-react";
import { TURMAS } from "@/lib/dados";
import { Barra, Selo, Titulo, botaoPrimario, botaoSecundario, corTaxa, cartao } from "@/components/ui";

export const metadata = { title: "Minhas turmas · Aprender + Fala Tio" };

export default function MinhasTurmas() {
  const ordenadas = [...TURMAS].sort((a, b) => b.participacao - a.participacao);
  return (
    <div>
      <Titulo icone={UsersRound} titulo="Minhas turmas" subtitulo="Veja rapidamente quais turmas participam mais e quais precisam de incentivo." />
      <ul className="grid gap-4 md:grid-cols-2">
        {ordenadas.map((t) => {
          const baixa = t.participacao < 60;
          return (
            <li key={t.id} className={`${cartao} ${baixa ? "ring-1 ring-orange-300" : ""}`}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-titulo text-xl font-black text-ap-tinta">{t.nome}</h2>
                  <p className="text-xs text-gray-500">
                    {t.serie} · {t.alunos} alunos
                  </p>
                </div>
                {baixa && (
                  <Selo tom="laranja">
                    <AlertTriangle aria-hidden className="mr-1 h-3 w-3" />
                    Baixa adesão
                  </Selo>
                )}
              </div>
              <dl className="mb-4 flex flex-col gap-3">
                {[
                  { r: "Participação", v: t.participacao },
                  { r: "Conclusão das atividades", v: t.conclusao },
                  { r: "Desempenho geral", v: t.desempenho },
                ].map((m) => (
                  <div key={m.r}>
                    <div className="mb-1 flex justify-between text-sm">
                      <dt className="font-semibold text-gray-700">{m.r}</dt>
                      <dd className="font-black text-gray-900">{m.v}%</dd>
                    </div>
                    <Barra valor={m.v} cor={m.r === "Participação" ? "#3f7d1c" : corTaxa(m.v)} />
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-2">
                <Link href={`/professor/diagnostico?turma=${t.id}`} className={botaoPrimario}>
                  Abrir turma
                </Link>
                <Link href={`/professor/engajamento?turma=${t.id}`} className={botaoSecundario}>
                  Ver alunos
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-xs text-gray-400">Participação mede quem usa a plataforma. Desempenho mede acertos nas atividades. São coisas diferentes.</p>
    </div>
  );
}
