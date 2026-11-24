"use client";

import { useState } from "react";
import { HeartPulse, ShieldCheck } from "lucide-react";
import { DESEMPENHO_REDE_DISCIPLINA, DIFICULDADES_REDE, MESES_PILOTO } from "@/lib/dados";
import { BarrasInterativas, LinhaInterativa } from "@/components/graficos";
import { Insight, Secao, Titulo, campo, corTaxa } from "@/components/ui";

export default function DiagnosticoRede() {
  const [disciplina, setDisciplina] = useState("Todas");
  const dif = DIFICULDADES_REDE.filter((d) => disciplina === "Todas" || d.disciplina === disciplina);
  const disc = DESEMPENHO_REDE_DISCIPLINA.filter((d) => disciplina === "Todas" || d.nome === disciplina);
  return (
    <div>
      <Titulo icone={HeartPulse} titulo="Diagnóstico da rede municipal" subtitulo="Padrões de dificuldade que aparecem em diferentes escolas. Análise agregada: os alunos não são identificados." />

      <div className="mb-5 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Disciplina
          <select value={disciplina} onChange={(e) => setDisciplina(e.target.value)} className={campo}>
            <option>Todas</option>
            {DESEMPENHO_REDE_DISCIPLINA.map((d) => (
              <option key={d.nome}>{d.nome}</option>
            ))}
          </select>
        </label>
        <p className="pb-2 text-xs text-gray-500">8º ano · 8 escolas · 1.195 alunos · Mês 6 do piloto</p>
      </div>

      <Insight tipo="alerta" titulo="Área prioritária para intervenção">
        <strong>Equações do 1º grau</strong> aparecem entre as maiores dificuldades em 7 das 8 escolas, com 51% de acertos. Faz sentido um plano de formação e reforço em rede, em vez de ações isoladas por escola.
      </Insight>

      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Desempenho por disciplina">
          <BarrasInterativas itens={disc.map((d) => ({ nome: d.nome, valor: d.taxa, cor: corTaxa(d.taxa) }))} mostrarDetalhe={false} />
        </Secao>
        <Secao titulo="Evolução por período" descricao="Acertos médios da rede.">
          <LinhaInterativa rotulo="Evolução do desempenho da rede" pontos={MESES_PILOTO.map((m, i) => ({ rotulo: m, valor: [56, 58, 59, 61, 62, 64][i] }))} min={45} max={75} />
        </Secao>
      </div>

      <Secao titulo="Conteúdos com maior incidência de erros" descricao="Dificuldades recorrentes entre escolas.">
        <BarrasInterativas itens={dif.map((d) => ({ nome: `${d.conteudo} (${d.disciplina})`, valor: d.taxa, detalhe: `Aparece em ${d.escolas} escolas`, cor: corTaxa(d.taxa) }))} />
      </Secao>

      <Secao titulo="Habilidades que precisam de reforço">
        <ul className="grid gap-2 md:grid-cols-2">
          {["Resolver problemas por meio de equações do 1º grau", "Inferir informações em textos de diferentes gêneros", "Aplicar proporcionalidade e regra de três", "Distinguir misturas e processos de separação"].map((h) => (
            <li key={h} className="rounded-xl bg-ap-fundo px-4 py-3 text-sm font-semibold text-gray-800">
              {h}
            </li>
          ))}
        </ul>
      </Secao>
      <p className="flex gap-2 rounded-xl bg-white px-4 py-3 text-xs text-gray-600 ring-1 ring-gray-200">
        <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ap-medio" />
        Indicadores individuais de estudantes não são exibidos neste painel por padrão. Dados fictícios.
      </p>
    </div>
  );
}
