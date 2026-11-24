"use client";

import { useState } from "react";
import { Download, LineChart } from "lucide-react";
import { FUNCIONALIDADES_USO, MESES_PILOTO, MUNICIPIOS, SERIE_RETENCAO, SERIE_USUARIOS_ATIVOS } from "@/lib/dados";
import { BarrasInterativas, LinhaInterativa } from "@/components/graficos";
import { GradeKpi, Kpi, Secao, Titulo, botaoPrimario, campo } from "@/components/ui";

const CAMADAS = [
  { id: "acesso", nome: "Acesso", pergunta: "Quantas pessoas entram na plataforma?" },
  { id: "engajamento", nome: "Engajamento", pergunta: "Quantas pessoas usam os recursos?" },
  { id: "conclusao", nome: "Conclusão", pergunta: "Quantas atividades são efetivamente realizadas?" },
  { id: "aprendizagem", nome: "Aprendizagem", pergunta: "Quais resultados são observados nas atividades?" },
] as const;

export default function Analytics() {
  const [camada, setCamada] = useState<(typeof CAMADAS)[number]["id"]>("acesso");
  const [mun, setMun] = useState("Todos");
  const [msg, setMsg] = useState("");
  const f = mun === "Todos" ? 1 : (MUNICIPIOS.find((m) => m.nome === mun)!.ativos || 1) / MUNICIPIOS.reduce((s, m) => s + m.ativos, 0);
  const esc = (v: number) => Math.round(v * f);
  const atual = CAMADAS.find((c) => c.id === camada)!;

  return (
    <div>
      <Titulo
        icone={LineChart}
        titulo="Analytics de utilização"
        subtitulo="Compreenda o comportamento dos usuários e quais recursos geram mais uso."
        acao={
          <button type="button" onClick={() => setMsg("Exportação simulada: no produto, os indicadores saem em planilha.")} className={botaoPrimario}>
            <Download aria-hidden className="h-4 w-4" />
            Exportar indicadores
          </button>
        }
      />
      {msg && <p role="status" className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">{msg}</p>}

      <div className="mb-4 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Município
          <select value={mun} onChange={(e) => setMun(e.target.value)} className={campo}>
            <option>Todos</option>
            {MUNICIPIOS.filter((m) => m.ativos > 0).map((m) => (
              <option key={m.id}>{m.nome}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Período
          <select className={campo} defaultValue="6 meses">
            <option>6 meses</option>
            <option>3 meses</option>
            <option>30 dias</option>
          </select>
        </label>
      </div>

      <div role="tablist" aria-label="Camadas de análise" className="mb-4 grid gap-2 sm:grid-cols-4">
        {CAMADAS.map((c) => (
          <button key={c.id} role="tab" aria-selected={camada === c.id} onClick={() => setCamada(c.id)} className={`rounded-2xl border p-3 text-left ${camada === c.id ? "border-ap-escuro bg-ap-escuro text-white" : "border-gray-300 bg-white hover:bg-gray-50"}`}>
            <span className="block text-sm font-black">{c.nome}</span>
            <span className={`block text-xs ${camada === c.id ? "text-green-100" : "text-gray-500"}`}>{c.pergunta}</span>
          </button>
        ))}
      </div>
      <p className="mb-6 rounded-xl bg-white px-4 py-2.5 text-xs text-gray-600 ring-1 ring-gray-200">
        Acesso, engajamento, conclusão e aprendizagem são coisas diferentes. Muitos acessos <strong>não significam</strong> aprendizagem: leia cada camada separadamente. Dados fictícios.
      </p>

      {camada === "acesso" && (
        <>
          <GradeKpi colunas={3}>
            <Kpi rotulo="Usuários ativos (mês 6)" valor={esc(SERIE_USUARIOS_ATIVOS[5]).toLocaleString("pt-BR")} destaque />
            <Kpi rotulo="Acessos via QR Code" valor={esc(21800).toLocaleString("pt-BR")} detalhe="no acumulado" />
            <Kpi rotulo="Frequência média" valor="3,4 dias" detalhe="de acesso por semana" />
          </GradeKpi>
          <div className="grid gap-6 lg:grid-cols-2">
            <Secao titulo="Usuários ativos por período">
              <LinhaInterativa rotulo="Usuários ativos" sufixo="" pontos={MESES_PILOTO.map((m, i) => ({ rotulo: m, valor: esc(SERIE_USUARIOS_ATIVOS[i]) }))} min={0} max={Math.max(100, esc(7000))} />
            </Secao>
            <Secao titulo="Retenção" descricao="% de usuários do primeiro mês que continuam usando.">
              <LinhaInterativa rotulo="Retenção" pontos={MESES_PILOTO.map((m, i) => ({ rotulo: m, valor: SERIE_RETENCAO[i] }))} min={40} max={100} />
            </Secao>
          </div>
        </>
      )}
      {camada === "engajamento" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Secao titulo="Funcionalidades mais utilizadas" descricao="Ações no acumulado do piloto.">
            <BarrasInterativas sufixo="" max={Math.max(...FUNCIONALIDADES_USO.map((x) => x.valor)) * f} itens={FUNCIONALIDADES_USO.map((x) => ({ nome: x.nome, valor: esc(x.valor) }))} mostrarDetalhe={false} />
          </Secao>
          <Secao titulo="Podcasts e listas: gerados x usados" descricao="Quanto do que é gerado chega a ser consumido.">
            <BarrasInterativas
              sufixo=""
              max={esc(9000)}
              itens={[
                { nome: "Podcasts gerados", valor: esc(8100), detalhe: "Pedidos à TIA e atividades de professores" },
                { nome: "Podcasts reproduzidos", valor: esc(6100), detalhe: "75% dos gerados" },
                { nome: "Listas de questões geradas", valor: esc(8800) },
                { nome: "Listas respondidas", valor: esc(7200), detalhe: "82% das geradas" },
              ]}
            />
          </Secao>
        </div>
      )}
      {camada === "conclusao" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Secao titulo="Taxa de conclusão das atividades" descricao="Atividades concluídas ÷ atividades iniciadas.">
            <LinhaInterativa rotulo="Conclusão" pontos={MESES_PILOTO.map((m, i) => ({ rotulo: m, valor: [58, 61, 63, 66, 68, 70][i] }))} min={40} max={80} />
          </Secao>
          <Secao titulo="Conclusão por tipo">
            <BarrasInterativas itens={[{ nome: "Listas de questões", valor: 82 }, { nome: "Resumos", valor: 71 }, { nome: "Flashcards", valor: 66 }, { nome: "Podcasts", valor: 62 }]} mostrarDetalhe={false} />
          </Secao>
        </div>
      )}
      {camada === "aprendizagem" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Secao titulo="Acertos médios nas atividades">
            <LinhaInterativa rotulo="Acertos" pontos={MESES_PILOTO.map((m, i) => ({ rotulo: m, valor: [56, 58, 59, 61, 62, 64][i] }))} min={45} max={75} />
          </Secao>
          <Secao titulo="Leitura cuidadosa" descricao="Como interpretar.">
            <p className="text-sm leading-relaxed text-gray-700">
              A aprendizagem aqui é medida pelos <strong>resultados nas atividades</strong>, e não pelo número de acessos. O detalhamento por município, escola e conteúdo está em “Indicadores pedagógicos”.
            </p>
          </Secao>
        </div>
      )}
      <p className="text-xs text-gray-400">Visão: {atual.nome}. Comparação entre períodos: use o filtro de período acima (simulado).</p>
    </div>
  );
}
