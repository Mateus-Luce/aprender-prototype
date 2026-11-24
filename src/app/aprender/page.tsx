import Link from "next/link";
import { Activity, GraduationCap, LayoutDashboard, MapPinned, Repeat, School, Users } from "lucide-react";
import { FUNCIONALIDADES_USO, MESES_PILOTO, MUNICIPIOS, SERIE_RETENCAO, SERIE_USUARIOS_ATIVOS } from "@/lib/dados";
import { BarrasInterativas, LinhaInterativa } from "@/components/graficos";
import { GradeKpi, Kpi, Secao, Titulo, botaoSecundario } from "@/components/ui";

export const metadata = { title: "Visão geral da operação · Aprender + Fala Tio" };

export default function DashboardAprender() {
  const cad = MUNICIPIOS.reduce((s, m) => s + m.cadastrados, 0);
  const ativos = MUNICIPIOS.reduce((s, m) => s + m.ativos, 0);
  const escolas = MUNICIPIOS.filter((m) => m.status !== "Planejado").reduce((s, m) => s + m.escolas, 0);
  const prev = MUNICIPIOS.reduce((s, m) => s + m.previstos, 0);
  const ativacao = Math.round((ativos / cad) * 100);
  const maximo = Math.max(...FUNCIONALIDADES_USO.map((f) => f.valor));
  return (
    <div>
      <Titulo
        icone={LayoutDashboard}
        titulo="Visão geral da operação"
        subtitulo="Todos os municípios atendidos pela Aprender · piloto do 8º ano"
        acao={
          <div className="flex flex-wrap gap-2">
            <Link href="/aprender/municipios" className={botaoSecundario}>Gestão de municípios</Link>
            <Link href="/aprender/escolas" className={botaoSecundario}>Gestão de escolas</Link>
            <Link href="/aprender/analytics" className={botaoSecundario}>Analytics</Link>
            <Link href="/aprender/pedagogico" className={botaoSecundario}>Indicadores pedagógicos</Link>
            <Link href="/aprender/administracao" className={botaoSecundario}>Administração e implantação</Link>
          </div>
        }
      />
      <GradeKpi colunas={4}>
        <Kpi rotulo="Municípios cadastrados" valor={String(MUNICIPIOS.length)} detalhe="6 ativos · 1 planejado" icone={MapPinned} destaque />
        <Kpi rotulo="Escolas implantadas" valor={String(escolas)} icone={School} />
        <Kpi rotulo="Alunos cadastrados" valor={cad.toLocaleString("pt-BR")} detalhe={`de ${prev.toLocaleString("pt-BR")} previstos`} icone={GraduationCap} />
        <Kpi rotulo="Alunos ativos" valor={ativos.toLocaleString("pt-BR")} icone={Users} />
        <Kpi rotulo="Taxa de ativação" valor={`${ativacao}%`} detalhe="ativos ÷ cadastrados" icone={Activity} />
        <Kpi rotulo="Engajamento" valor="61%" detalhe="usam ao menos 1 recurso/semana" />
        <Kpi rotulo="Retenção (mês 6)" valor={`${SERIE_RETENCAO[5]}%`} detalhe="voltam a usar após o 1º mês" icone={Repeat} />
        <Kpi rotulo="Meta do piloto" valor="10 mil" detalhe="alunos do 8º ano (previsão)" />
      </GradeKpi>
      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Evolução geral da operação" descricao="Usuários ativos por mês do piloto.">
          <LinhaInterativa rotulo="Usuários ativos" sufixo="" pontos={MESES_PILOTO.map((m, i) => ({ rotulo: m, valor: SERIE_USUARIOS_ATIVOS[i] }))} min={0} max={7000} />
        </Secao>
        <Secao titulo="Utilização das funcionalidades" descricao="Ações realizadas no acumulado do piloto.">
          <BarrasInterativas sufixo="" max={maximo} itens={FUNCIONALIDADES_USO.map((f) => ({ nome: f.nome, valor: f.valor }))} mostrarDetalhe={false} />
        </Secao>
      </div>
    </div>
  );
}
