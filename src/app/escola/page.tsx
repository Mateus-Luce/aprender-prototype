import Link from "next/link";
import { Activity, CheckCircle2, GraduationCap, LayoutDashboard, School, Users, UsersRound } from "lucide-react";
import { ESCOLA_KPIS as K, MESES_PILOTO, SERIE_ESCOLA, TURMAS } from "@/lib/dados";
import { LinhaInterativa } from "@/components/graficos";
import { GradeKpi, Insight, Kpi, Secao, Titulo, botaoSecundario } from "@/components/ui";

export const metadata = { title: "Dashboard da escola · Aprender + Fala Tio" };

export default function DashboardEscola() {
  const baixa = TURMAS.filter((t) => t.participacao < 60);
  return (
    <div>
      <Titulo
        icone={LayoutDashboard}
        titulo="Dashboard da escola"
        subtitulo="E.M. Prof.ª Aurora Lima · 8º ano · últimos 30 dias"
        acao={
          <div className="flex flex-wrap gap-2">
            <Link href="/escola/turmas" className={botaoSecundario}>
              Gestão de turmas
            </Link>
            <Link href="/escola/professores" className={botaoSecundario}>
              Gestão de professores
            </Link>
            <Link href="/escola/relatorios" className={botaoSecundario}>
              Relatórios pedagógicos
            </Link>
          </div>
        }
      />

      {baixa.length > 0 && (
        <Insight tipo="alerta" titulo="Atenção à adesão" href="/escola/turmas" acao="Ver turmas">
          A turma <strong>{baixa[0].nome}</strong> está com participação de {baixa[0].participacao}%, abaixo das demais. Vale conversar com os professores antes que isso afete os resultados.
        </Insight>
      )}

      <GradeKpi colunas={4}>
        <Kpi rotulo="Alunos cadastrados" valor={String(K.alunos)} detalhe="8º ano" icone={GraduationCap} destaque />
        <Kpi rotulo="Alunos ativos" valor={String(K.ativos)} detalhe={`${K.utilizacao}% de utilização`} icone={Users} />
        <Kpi rotulo="Professores ativos" valor={`${K.professoresAtivos} de 5`} icone={School} />
        <Kpi rotulo="Turmas cadastradas" valor={String(K.turmas)} icone={UsersRound} />
        <Kpi rotulo="Atividades realizadas" valor={String(K.atividades)} detalhe="criadas pelos professores" icone={Activity} />
        <Kpi rotulo="Taxa de conclusão" valor={`${K.conclusao}%`} detalhe="das atividades enviadas" icone={CheckCircle2} />
        <Kpi rotulo="Acertos médios" valor={`${K.desempenho}%`} detalhe="indicador de aprendizagem" />
        <Kpi rotulo="Taxa de utilização" valor={`${K.utilizacao}%`} detalhe="alunos ativos ÷ cadastrados" />
      </GradeKpi>

      <Secao titulo="Evolução da utilização" descricao="Porcentagem de alunos ativos por mês do piloto. Passe o mouse nos pontos.">
        <LinhaInterativa rotulo="Evolução da utilização" pontos={MESES_PILOTO.map((m, i) => ({ rotulo: m, valor: SERIE_ESCOLA[i] }))} min={30} max={80} />
      </Secao>
      <p className="text-xs text-gray-500">Base de cálculo: {K.alunos} alunos do 8º ano e {K.turmas} turmas, período de 30 dias. Dados fictícios.</p>
    </div>
  );
}
