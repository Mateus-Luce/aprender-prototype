import Link from "next/link";
import { Activity, AlertTriangle, ClipboardList, HeartPulse, PlusCircle, UsersRound, FileText, CheckCircle2 } from "lucide-react";
import { ATIVIDADES_PROFESSOR, PROFESSOR, TURMAS, alunosDaTurma } from "@/lib/dados";
import { GradeKpi, Kpi, Secao, Selo, Titulo, botaoPrimario, botaoSecundario } from "@/components/ui";
import { LinhaInterativa } from "@/components/graficos";

export const metadata = { title: "Início do professor · Aprender + Fala Tio" };

export default function HomeProfessor() {
  const alunos = TURMAS.reduce((s, t) => s + t.alunos, 0);
  const conclusao = Math.round(TURMAS.reduce((s, t) => s + t.conclusao * t.alunos, 0) / alunos);
  const emAcompanhamento = ATIVIDADES_PROFESSOR.filter((a) => a.prazo !== "Encerrada");
  const baixaAdesao = TURMAS.filter((t) => t.participacao < 60);
  const semAtividade = alunosDaTurma("8a").filter((a) => a.engajamento === "Sem atividade recente");

  return (
    <div>
      <Titulo
        titulo={`Olá, professor ${PROFESSOR.nome.split(" ")[0]}.`}
        subtitulo="Acompanhe suas turmas e identifique onde seus alunos precisam de mais atenção."
        acao={
          <Link href="/professor/criar" className={botaoPrimario}>
            <PlusCircle aria-hidden className="h-4 w-4" />
            Criar atividade
          </Link>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3.5">
        <ClipboardList aria-hidden className="h-5 w-5 shrink-0 text-orange-700" />
        <p className="min-w-0 flex-1 text-sm text-orange-950">
          Existem <strong>{emAcompanhamento.length} atividades</strong> aguardando acompanhamento.
        </p>
        <Link href="/professor/acompanhamento" className={botaoSecundario}>
          Ver atividades
        </Link>
      </div>

      <GradeKpi colunas={5}>
        <Kpi rotulo="Turmas vinculadas" valor={String(TURMAS.length)} detalhe="8º ano A, B, C e D" icone={UsersRound} destaque />
        <Kpi rotulo="Total de alunos" valor={String(alunos)} detalhe="nas suas turmas" />
        <Kpi rotulo="Pendentes de acompanhamento" valor={String(emAcompanhamento.length)} detalhe="atividades abertas" icone={ClipboardList} />
        <Kpi rotulo="Conclusão média das tarefas" valor={`${conclusao}%`} detalhe="média ponderada" icone={CheckCircle2} />
        <Kpi rotulo="Engajamento recente" valor="68%" detalhe="alunos ativos na semana" icone={Activity} />
      </GradeKpi>

      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Turmas que precisam de atenção" descricao="Baixa utilização não é o mesmo que baixo desempenho: o contato com os alunos pode resolver.">
          <ul className="flex flex-col gap-3">
            {baixaAdesao.map((t) => (
              <li key={t.id} className="flex items-center gap-3 rounded-2xl bg-orange-50 px-4 py-3">
                <AlertTriangle aria-hidden className="h-5 w-5 shrink-0 text-orange-700" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-gray-900">{t.nome}: participação de {t.participacao}%</p>
                  <p className="text-xs text-gray-600">Conclusão das tarefas em {t.conclusao}%</p>
                </div>
                <Link href="/professor/engajamento" className="text-sm font-bold text-ap-escuro hover:underline">
                  Ver alunos
                </Link>
              </li>
            ))}
          </ul>
        </Secao>

        <Secao titulo="Alunos que precisam de acompanhamento" descricao="8º ano A · sem atividade recente na plataforma">
          <ul className="flex flex-col gap-2">
            {semAtividade.slice(0, 4).map((a) => (
              <li key={a.id}>
                <Link href={`/professor/alunos/${a.id}`} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 hover:bg-gray-50">
                  <span className="text-sm font-semibold text-gray-900">{a.nome}</span>
                  <span className="text-xs text-gray-500">último acesso {a.ultimoAcesso}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-gray-500">
            {semAtividade.length} alunos nesta situação. Nomes fictícios.
          </p>
        </Secao>
      </div>

      <Secao titulo="Engajamento da semana" descricao="Percentual de alunos que usaram a plataforma. Passe o mouse nos pontos.">
        <LinhaInterativa
          rotulo="Engajamento semanal"
          pontos={[
            { rotulo: "Sem 1", valor: 52 },
            { rotulo: "Sem 2", valor: 57 },
            { rotulo: "Sem 3", valor: 61 },
            { rotulo: "Sem 4", valor: 59 },
            { rotulo: "Sem 5", valor: 66 },
            { rotulo: "Sem 6", valor: 68 },
          ]}
          min={40}
          max={80}
        />
      </Secao>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/professor/turmas", rotulo: "Minhas turmas", icon: UsersRound },
          { href: "/professor/diagnostico", rotulo: "Acessar diagnóstico", icon: HeartPulse },
          { href: "/professor/criar", rotulo: "Criar atividade", icon: PlusCircle },
          { href: "/professor/relatorio", rotulo: "Consultar relatórios", icon: FileText },
        ].map((a) => (
          <Link key={a.href} href={a.href} className="flex min-h-[64px] items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-bold text-ap-escuro shadow-sm hover:bg-ap-fundo">
            <a.icon aria-hidden className="h-5 w-5" />
            {a.rotulo}
          </Link>
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-400">
        <Selo>Fluxo principal</Selo> Diagnóstico da turma, criação de atividade de reforço, geração com a TIA, aprovação, envio, acompanhamento e relatório.
      </p>
    </div>
  );
}
