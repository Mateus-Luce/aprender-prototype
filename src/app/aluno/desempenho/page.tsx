import Link from "next/link";
import { Lock, Medal, Sparkles, Trophy } from "lucide-react";
import { ALUNO, COR_DISCIPLINA, DESEMPENHO_ALUNO as D, type Disciplina } from "@/lib/dados";
import { AnelProgresso, BarrasInterativas, LinhaInterativa } from "@/components/graficos";
import { GradeKpi, Kpi, Secao, Titulo, botaoPrimario } from "@/components/ui";

export const metadata = { title: "Meu desempenho · Aprender + Fala Tio" };

export default function Desempenho() {
  return (
    <div>
      <Titulo icone={Trophy} titulo="Meu desempenho" subtitulo="Veja como você está evoluindo e o que vale a pena reforçar. Cada atividade conta!" />

      <GradeKpi>
        <Kpi rotulo="Atividades feitas" valor={String(D.atividades)} detalhe="neste mês" destaque />
        <Kpi rotulo="Concluídas" valor={`${D.conclusao}%`} detalhe="das atividades pedidas" />
        <Kpi rotulo="Questões certas" valor={String(D.acertos)} detalhe="boa evolução!" />
        <Kpi rotulo="Para treinar de novo" valor={String(D.erros)} detalhe="questões que viram aprendizado" />
      </GradeKpi>

      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Sua evolução" descricao="Porcentagem de acertos nas últimas semanas. Passe o mouse nos pontos.">
          <LinhaInterativa
            rotulo="Evolução semanal de acertos"
            pontos={D.evolucao.map((v, i) => ({ rotulo: `Sem ${i + 1}`, valor: v }))}
            min={40}
            max={80}
          />
        </Secao>

        <Secao titulo="Desempenho por disciplina" descricao="Cada cor é uma disciplina do seu livro.">
          <BarrasInterativas
            itens={D.porDisciplina.map((d) => ({
              nome: d.nome,
              valor: d.taxa,
              detalhe: `${d.atividades} atividades feitas`,
              cor: COR_DISCIPLINA[d.nome as Disciplina],
            }))}
          />
        </Secao>
      </div>

      <Secao titulo="Conteúdos que merecem reforço" descricao="Sem pressão: são só os assuntos em que dá para ganhar mais pontos com um pouco de treino.">
        <ul className="grid gap-3 md:grid-cols-3">
          {D.reforco.map((r) => (
            <li key={r.conteudo} className="rounded-2xl bg-ap-fundo p-4">
              <p className="text-xs font-bold" style={{ color: COR_DISCIPLINA[r.disciplina as Disciplina] }}>
                {r.disciplina}
              </p>
              <p className="font-bold text-ap-tinta">{r.conteudo}</p>
              <p className="mt-1 text-sm text-gray-600">{r.taxa}% de acertos até agora</p>
              <Link href="/aluno/tia" className="mt-3 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-bold text-ap-escuro hover:underline">
                <Sparkles aria-hidden className="h-4 w-4" />
                Treinar com a TIA
              </Link>
            </li>
          ))}
        </ul>
      </Secao>

      <Secao titulo="Suas conquistas" descricao={`Nível ${ALUNO.nivel} · ${ALUNO.xp} XP · ${ALUNO.sequencia} dias seguidos`}>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {D.conquistas.map((c) => (
            <li key={c.id} className={`flex flex-col items-center rounded-2xl p-4 text-center ${c.ganha ? "bg-ap-folha" : "bg-gray-100"}`}>
              <span className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${c.ganha ? "bg-ap-escuro text-white" : "bg-gray-300 text-gray-500"}`}>
                {c.ganha ? <Medal aria-hidden className="h-6 w-6" /> : <Lock aria-hidden className="h-5 w-5" />}
              </span>
              <p className="text-sm font-black text-ap-tinta">{c.nome}</p>
              <p className="text-xs text-gray-600">{c.desc}</p>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-5 rounded-2xl bg-ap-fundo p-4">
          <AnelProgresso valor={Math.round((ALUNO.xp / ALUNO.xpProximo) * 100)} tamanho={88} rotulo="Progresso para o próximo nível">
            <span className="font-titulo text-xl font-black text-ap-tinta">{ALUNO.nivel}</span>
            <span className="text-[10px] text-gray-500">nível</span>
          </AnelProgresso>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-ap-tinta">Faltam {ALUNO.xpProximo - ALUNO.xp} XP para o nível {ALUNO.nivel + 1}</p>
            <p className="text-sm text-gray-600">Faça a lista de reforço de equações e ganhe seus próximos pontos.</p>
          </div>
          <Link href="/aluno/atividades" className={botaoPrimario}>
            Retomar estudos
          </Link>
        </div>
      </Secao>
    </div>
  );
}
