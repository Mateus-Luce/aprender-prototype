"use client";

import { useState } from "react";
import { Download, Eye, FileText } from "lucide-react";
import { ESCOLAS_REDE } from "@/lib/dados";
import { Secao, Tabela, Titulo, botaoPrimario, botaoSecundario, campo, td } from "@/components/ui";

const RELATORIOS = [
  { id: "geral", nome: "Relatório geral da rede", desc: "Resumo de adesão, uso e aprendizagem da rede" },
  { id: "comparativo", nome: "Comparação entre escolas", desc: "Indicadores lado a lado por unidade" },
  { id: "engajamento", nome: "Engajamento e utilização", desc: "Acessos, uso da TIA e atividades concluídas" },
  { id: "aprendizagem", nome: "Indicadores de aprendizagem", desc: "Acertos por disciplina e conteúdo" },
];

export default function RelatoriosSecretaria() {
  const [rel, setRel] = useState("geral");
  const [periodo, setPeriodo] = useState("Mês 6");
  const [serie, setSerie] = useState("8º ano");
  const [unidade, setUnidade] = useState("Todas");
  const [previa, setPrevia] = useState(false);
  const [msg, setMsg] = useState("");
  const escolas = ESCOLAS_REDE.filter((e) => unidade === "Todas" || e.nome === unidade);
  const nome = RELATORIOS.find((r) => r.id === rel)!.nome;

  return (
    <div>
      <Titulo icone={FileText} titulo="Relatórios da secretaria" subtitulo="Gere relatórios consolidados para acompanhamento interno e análise da evolução da rede." />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <div>
          <Secao titulo="1. Selecionar relatório">
            <div role="radiogroup" aria-label="Relatório" className="flex flex-col gap-2">
              {RELATORIOS.map((r) => (
                <button key={r.id} type="button" role="radio" aria-checked={rel === r.id} onClick={() => { setRel(r.id); setPrevia(false); }} className={`rounded-xl border p-3 text-left ${rel === r.id ? "border-ap-escuro bg-ap-fundo" : "border-gray-300 hover:bg-gray-50"}`}>
                  <span className="block text-sm font-bold text-gray-900">{r.nome}</span>
                  <span className="block text-xs text-gray-500">{r.desc}</span>
                </button>
              ))}
            </div>
          </Secao>
          <Secao titulo="2. Aplicar filtros">
            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
                Período
                <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className={campo}>
                  {["Mês 1", "Mês 2", "Mês 3", "Mês 4", "Mês 5", "Mês 6"].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
                Série
                <select value={serie} onChange={(e) => setSerie(e.target.value)} className={campo}>
                  <option>8º ano</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
                Unidade
                <select value={unidade} onChange={(e) => setUnidade(e.target.value)} className={campo}>
                  <option>Todas</option>
                  {ESCOLAS_REDE.map((e) => (
                    <option key={e.id}>{e.nome}</option>
                  ))}
                </select>
              </label>
            </div>
            <button type="button" onClick={() => setPrevia(true)} className={`${botaoPrimario} mt-4 w-full`}>
              <Eye aria-hidden className="h-4 w-4" />
              Gerar prévia
            </button>
          </Secao>
        </div>

        <Secao titulo="Prévia" descricao={`${nome} · ${periodo} · ${serie} · ${unidade === "Todas" ? "todas as unidades" : unidade}`}
          acao={
            <button type="button" disabled={!previa} onClick={() => setMsg("Exportação simulada: no produto, o relatório sai em PDF e planilha.")} className={botaoSecundario}>
              <Download aria-hidden className="h-4 w-4" />
              Exportar relatório
            </button>
          }>
          {msg && <p role="status" className="mb-3 rounded-xl bg-amber-50 px-4 py-2.5 text-sm text-amber-900">{msg}</p>}
          {!previa ? (
            <p className="rounded-xl bg-gray-50 px-4 py-12 text-center text-sm text-gray-500">Escolha o relatório, aplique os filtros e toque em “Gerar prévia”.</p>
          ) : (
            <div>
              <p className="mb-3 text-xs text-gray-500">
                Base: {escolas.reduce((s, e) => s + e.alunos, 0).toLocaleString("pt-BR")} alunos em {escolas.length} escola(s). Dados fictícios.
              </p>
              <Tabela colunas={["Escola", "Alunos", "Ativos", "Conclusão", "Aprendizagem"]} rotulo="Prévia do relatório">
                {escolas.map((e) => (
                  <tr key={e.id}>
                    <td className={`${td} font-semibold text-gray-900`}>{e.nome}</td>
                    <td className={td}>{e.alunos}</td>
                    <td className={td}>{e.ativos}</td>
                    <td className={td}>{e.conclusao}%</td>
                    <td className={td}>{e.desempenho}%</td>
                  </tr>
                ))}
              </Tabela>
            </div>
          )}
        </Secao>
      </div>
    </div>
  );
}
