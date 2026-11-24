import Link from "next/link";
import { Activity, GraduationCap, LayoutDashboard, School, TrendingUp, Users } from "lucide-react";
import { ESCOLAS_REDE, MESES_PILOTO } from "@/lib/dados";
import { LinhaInterativa } from "@/components/graficos";
import { GradeKpi, Insight, Kpi, Secao, Titulo, botaoSecundario } from "@/components/ui";

export const metadata = { title: "Dashboard municipal · Aprender + Fala Tio" };

export default function DashboardMunicipal() {
  const alunos = ESCOLAS_REDE.reduce((s, e) => s + e.alunos, 0);
  const ativos = ESCOLAS_REDE.reduce((s, e) => s + e.ativos, 0);
  const adesao = Math.round((ativos / alunos) * 100);
  const desempenho = Math.round(ESCOLAS_REDE.reduce((s, e) => s + e.desempenho * e.alunos, 0) / alunos);
  const baixa = ESCOLAS_REDE.filter((e) => e.status === "Baixa adesão");
  return (
    <div>
      <Titulo
        icone={LayoutDashboard}
        titulo="Dashboard municipal"
        subtitulo="Vale do Sol · rede municipal · 8º ano · visão consolidada"
        acao={
          <div className="flex flex-wrap gap-2">
            <Link href="/municipio/escolas" className={botaoSecundario}>
              Comparativo entre escolas
            </Link>
            <Link href="/municipio/diagnostico" className={botaoSecundario}>
              Diagnóstico da rede
            </Link>
            <Link href="/municipio/relatorios" className={botaoSecundario}>
              Relatórios da secretaria
            </Link>
          </div>
        }
      />

      <Insight tipo="alerta" titulo={`${baixa.length} escolas com baixa adesão`} href="/municipio/escolas" acao="Consultar escolas">
        {baixa.map((b) => b.nome).join(", ")}. Em geral são unidades rurais e de bairros afastados: vale combinar apoio e formação antes de olhar para os resultados.
      </Insight>

      <GradeKpi colunas={3}>
        <Kpi rotulo="Escolas participantes" valor={String(ESCOLAS_REDE.length)} icone={School} destaque />
        <Kpi rotulo="Alunos da rede (8º ano)" valor={alunos.toLocaleString("pt-BR")} icone={GraduationCap} />
        <Kpi rotulo="Alunos ativos na plataforma" valor={ativos.toLocaleString("pt-BR")} icone={Users} />
        <Kpi rotulo="Taxa média de adesão" valor={`${adesao}%`} detalhe="ativos ÷ cadastrados" icone={Activity} />
        <Kpi rotulo="Engajamento geral" valor="64%" detalhe="uso semanal dos recursos" icone={TrendingUp} />
        <Kpi rotulo="Indicador médio de desempenho" valor={`${desempenho}%`} detalhe="acertos, ponderado por alunos" />
      </GradeKpi>

      <Secao titulo="Evolução dos indicadores" descricao="Adesão da rede ao longo do piloto. Passe o mouse nos pontos.">
        <LinhaInterativa rotulo="Evolução da adesão" pontos={MESES_PILOTO.map((m, i) => ({ rotulo: m, valor: [38, 46, 53, 58, 62, adesao][i] }))} min={20} max={80} />
      </Secao>
      <p className="text-xs text-gray-500">Mostramos a rede consolidada. O acesso a uma escola específica depende de autorização. Dados fictícios.</p>
    </div>
  );
}
