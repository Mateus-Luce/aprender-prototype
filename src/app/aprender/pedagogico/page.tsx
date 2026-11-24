"use client";

import { useState } from "react";
import { HeartPulse, Info } from "lucide-react";
import { DESEMPENHO_REDE_DISCIPLINA, DIFICULDADES_REDE, ESCOLAS_REDE, MESES_PILOTO, MUNICIPIOS } from "@/lib/dados";
import { BarrasInterativas, LinhaInterativa } from "@/components/graficos";
import { Insight, Secao, Titulo, campo, corTaxa } from "@/components/ui";

const DESEMP_MUN: Record<string, number> = { "Vale do Sol": 64, "Serra Dourada": 66, "Lagoa Bonita": 61, "Campo Formoso do Norte": 58, "Boa Esperança": 57, "Santa Rita do Vale": 55 };

export default function Pedagogico() {
  const [disc, setDisc] = useState("Todas");
  const dif = DIFICULDADES_REDE.filter((d) => disc === "Todas" || d.disciplina === disc);
  const muns = MUNICIPIOS.filter((m) => DESEMP_MUN[m.nome]);
  return (
    <div>
      <Titulo icone={HeartPulse} titulo="Indicadores pedagógicos consolidados" subtitulo="Resultados de aprendizagem de todos os municípios, sempre de forma agregada." />
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Disciplina
          <select value={disc} onChange={(e) => setDisc(e.target.value)} className={campo}>
            <option>Todas</option>
            {DESEMPENHO_REDE_DISCIPLINA.map((d) => (
              <option key={d.nome}>{d.nome}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Série
          <select className={campo} defaultValue="8º ano">
            <option>8º ano</option>
          </select>
        </label>
      </div>
      <p className="mb-6 flex gap-2 rounded-xl bg-white px-4 py-2.5 text-xs text-gray-600 ring-1 ring-gray-200">
        <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ap-medio" />
        Critério de cálculo: acertos ÷ questões respondidas, por município. Amostra: 6 municípios com mais de 300 alunos ativos, 8º ano, Mês 6. Dados fictícios.
      </p>

      <Insight titulo="Oportunidade de intervenção" tipo="alerta">
        <strong>Equações do 1º grau</strong> é a dificuldade mais recorrente entre redes (51% de acertos). Um material de reforço único, distribuído pela Aprender, pode atender vários municípios de uma vez.
      </Insight>

      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Desempenho agregado por município">
          <BarrasInterativas itens={muns.map((m) => ({ nome: m.nome, valor: DESEMP_MUN[m.nome], detalhe: `${m.ativos.toLocaleString("pt-BR")} alunos ativos na amostra`, cor: corTaxa(DESEMP_MUN[m.nome]) }))} />
        </Secao>
        <Secao titulo="Desempenho por disciplina">
          <BarrasInterativas itens={DESEMPENHO_REDE_DISCIPLINA.filter((d) => disc === "Todas" || d.nome === disc).map((d) => ({ nome: d.nome, valor: d.taxa, cor: corTaxa(d.taxa) }))} mostrarDetalhe={false} />
        </Secao>
      </div>
      <Secao titulo="Conteúdos com maior incidência de erros" descricao="Dificuldades mais recorrentes nas redes participantes.">
        <BarrasInterativas itens={dif.map((d) => ({ nome: `${d.conteudo} (${d.disciplina})`, valor: d.taxa, detalhe: `Aparece em ${d.escolas} escolas`, cor: corTaxa(d.taxa) }))} />
      </Secao>
      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Desempenho por escola (amostra)" descricao="Escolas de um município de referência.">
          <BarrasInterativas itens={ESCOLAS_REDE.slice(0, 5).map((e) => ({ nome: e.nome, valor: e.desempenho, cor: corTaxa(e.desempenho) }))} mostrarDetalhe={false} />
        </Secao>
        <Secao titulo="Evolução dos indicadores">
          <LinhaInterativa rotulo="Evolução dos acertos" pontos={MESES_PILOTO.map((m, i) => ({ rotulo: m, valor: [56, 58, 59, 61, 62, 64][i] }))} min={45} max={75} />
        </Secao>
      </div>
    </div>
  );
}
