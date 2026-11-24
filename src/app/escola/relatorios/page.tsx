"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { CAPITULOS_TURMA, DESEMPENHO_REDE_DISCIPLINA, MESES_PILOTO, SERIE_ESCOLA, TURMAS } from "@/lib/dados";
import { BarrasInterativas, LinhaInterativa } from "@/components/graficos";
import { Secao, Titulo, botaoPrimario, campo, corTaxa } from "@/components/ui";

export default function RelatoriosEscola() {
  const [turma, setTurma] = useState("Todas");
  const [periodo, setPeriodo] = useState("Mês 6");
  const [disciplina, setDisciplina] = useState("Todas");
  const [msg, setMsg] = useState("");
  const alunos = turma === "Todas" ? 121 : TURMAS.find((t) => t.nome === turma)!.alunos;
  const delta = turma === "Todas" ? 0 : TURMAS.find((t) => t.nome === turma)!.desempenho - 67;
  const disc = DESEMPENHO_REDE_DISCIPLINA.filter((d) => disciplina === "Todas" || d.nome === disciplina);

  return (
    <div>
      <Titulo
        icone={FileText}
        titulo="Relatórios pedagógicos"
        subtitulo="Indicadores de aprendizagem e engajamento da escola, com o período e a base de alunos sempre identificados."
        acao={
          <button type="button" onClick={() => setMsg("Exportação simulada: no produto, o relatório sai em PDF e planilha.")} className={botaoPrimario}>
            <Download aria-hidden className="h-4 w-4" />
            Exportar relatório
          </button>
        }
      />
      {msg && (
        <p role="status" className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {msg}
        </p>
      )}

      <div className="mb-3 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Período
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className={campo}>
            {MESES_PILOTO.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Turma
          <select value={turma} onChange={(e) => setTurma(e.target.value)} className={campo}>
            <option>Todas</option>
            {TURMAS.map((t) => (
              <option key={t.id}>{t.nome}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Disciplina
          <select value={disciplina} onChange={(e) => setDisciplina(e.target.value)} className={campo}>
            <option>Todas</option>
            {DESEMPENHO_REDE_DISCIPLINA.map((d) => (
              <option key={d.nome}>{d.nome}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="mb-6 rounded-xl bg-white px-4 py-2.5 text-xs text-gray-600 ring-1 ring-gray-200">
        Referência: <strong>{periodo}</strong> do piloto · <strong>{alunos} alunos</strong> considerados · {turma === "Todas" ? "todas as turmas" : turma} · {disciplina === "Todas" ? "todas as disciplinas" : disciplina}. Dados fictícios.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Desempenho por disciplina">
          <BarrasInterativas itens={disc.map((d) => ({ nome: d.nome, valor: Math.max(20, Math.min(98, d.taxa + delta)), cor: corTaxa(d.taxa + delta) }))} mostrarDetalhe={false} />
        </Secao>
        <Secao titulo="Conteúdos com maior dificuldade" descricao="Matemática · 8º ano">
          <BarrasInterativas itens={[...CAPITULOS_TURMA].sort((a, b) => a.taxa - b.taxa).map((c) => ({ nome: c.nome, valor: Math.max(20, Math.min(98, c.taxa + delta)), detalhe: `Mais erros em: ${c.erros}`, cor: corTaxa(c.taxa + delta) }))} />
        </Secao>
      </div>

      <Secao titulo="Evolução e comparação por período" descricao="Utilização da plataforma pelos alunos ao longo do piloto.">
        <LinhaInterativa rotulo="Evolução da utilização" pontos={MESES_PILOTO.map((m, i) => ({ rotulo: m, valor: SERIE_ESCOLA[i] }))} min={30} max={80} />
      </Secao>

      <Secao titulo="Oportunidades de reforço">
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Equações do 1º grau (Matemática): sugerir às turmas de menor acerto um ciclo de atividades de reforço.",
            "Interpretação de textos (Língua Portuguesa): combinar com a coordenação uma sequência de leitura guiada com a TIA.",
          ].map((t) => (
            <li key={t} className="rounded-xl bg-ap-fundo px-4 py-3 text-sm text-gray-800">
              {t}
            </li>
          ))}
        </ul>
      </Secao>
    </div>
  );
}
