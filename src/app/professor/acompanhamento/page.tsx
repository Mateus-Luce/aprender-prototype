"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { ATIVIDADES_PROFESSOR, alunosDaTurma, type AtividadeProfessor } from "@/lib/dados";
import { paraAtividadeProfessor, useNovaAtividade } from "@/lib/store";
import { Barra, GradeKpi, Kpi, Secao, Selo, Tabela, Titulo, botaoSecundario, campo, td } from "@/components/ui";

type Status = "Todos" | "Concluiu" | "Iniciou" | "Não iniciou";

function statusAluno(idx: number, a: AtividadeProfessor): "Concluiu" | "Iniciou" | "Não iniciou" {
  if (idx < a.concluiram) return "Concluiu";
  if (idx < a.iniciaram) return "Iniciou";
  return "Não iniciou";
}

export default function Acompanhamento() {
  const nova = useNovaAtividade();
  const lista = nova ? [paraAtividadeProfessor(nova), ...ATIVIDADES_PROFESSOR] : ATIVIDADES_PROFESSOR;
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<Status>("Todos");
  const atual = lista.find((a) => a.id === (selecionada ?? lista[0].id)) ?? lista[0];
  const turmaId = atual.turma.includes("B") ? "8b" : atual.turma.includes("C") ? "8c" : "8a";

  const nominal = useMemo(() => {
    const base = alunosDaTurma(turmaId).slice(0, atual.destinatarios);
    // Ordem de participação: quem mais usa a plataforma tende a concluir primeiro.
    const ordenados = [...base].sort((x, y) => y.acessosSemana - x.acessosSemana);
    return ordenados.map((al, idx) => ({ ...al, situacao: statusAluno(idx, atual) }));
  }, [atual, turmaId]);
  const todosFiltrados = nominal.filter((n) => filtro === "Todos" || n.situacao === filtro);
  // A demonstração mostra os primeiros nomes de cada status; o produto real pagina a lista.
  const filtrada = todosFiltrados.length > 12 && filtro === "Todos"
    ? [...todosFiltrados.slice(0, 6), ...todosFiltrados.filter((n) => n.situacao !== "Concluiu").slice(0, 6)]
    : todosFiltrados.slice(0, 12);
  const pct = atual.destinatarios ? Math.round((atual.concluiram / atual.destinatarios) * 100) : 0;
  const pendentes = atual.destinatarios - atual.concluiram;

  return (
    <div>
      <Titulo icone={ClipboardList} titulo="Acompanhamento das atividades" subtitulo="Veja se a atividade teve boa adesão e quais alunos precisam de um empurrãozinho." />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <Secao titulo="Atividades enviadas">
          <ul className="flex flex-col gap-2">
            {lista.map((a) => {
              const on = a.id === atual.id;
              const p = a.destinatarios ? Math.round((a.concluiram / a.destinatarios) * 100) : 0;
              return (
                <li key={a.id}>
                  <button type="button" onClick={() => setSelecionada(a.id)} aria-pressed={on} className={`w-full rounded-xl border p-3 text-left ${on ? "border-ap-escuro bg-ap-fundo" : "border-gray-200 hover:bg-gray-50"}`}>
                    <span className="flex items-start justify-between gap-2">
                      <span className="text-sm font-bold text-gray-900">{a.nome}</span>
                      {a.id === "nova" && <Selo tom="laranja">Nova</Selo>}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {a.turma} · {a.tipo} · {a.prazo}
                    </span>
                    <span className="mt-2 flex items-center gap-2">
                      <Barra valor={p} altura="h-1.5" />
                      <span className="text-xs font-bold text-gray-600">{p}%</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Secao>

        <div>
          <h2 className="mb-1 font-titulo text-xl font-black text-ap-tinta">{atual.nome}</h2>
          <p className="mb-4 text-sm text-gray-600">
            {atual.turma} · {atual.tipo} · prazo: {atual.prazo.toLowerCase()}
          </p>
          <GradeKpi>
            <Kpi rotulo="Destinatários" valor={String(atual.destinatarios)} detalhe="alunos" destaque />
            <Kpi rotulo="Iniciaram" valor={String(atual.iniciaram)} />
            <Kpi rotulo="Concluíram" valor={String(atual.concluiram)} detalhe={`${pct}% de conclusão`} />
            <Kpi rotulo="Pendentes" valor={String(pendentes)} detalhe="ainda sem entregar" />
          </GradeKpi>

          <Secao
            titulo="Lista nominal"
            descricao="Nomes fictícios. Quem não iniciou aparece por último."
            acao={
              <div className="flex flex-wrap items-center gap-2">
                <label className="sr-only" htmlFor="f-status">
                  Filtrar por status
                </label>
                <select id="f-status" value={filtro} onChange={(e) => setFiltro(e.target.value as Status)} className={campo}>
                  <option>Todos</option>
                  <option>Concluiu</option>
                  <option>Iniciou</option>
                  <option>Não iniciou</option>
                </select>
                <Link href="/professor/relatorio" className={botaoSecundario}>
                  Acessar relatório da atividade
                </Link>
              </div>
            }
          >
            <Tabela colunas={["Aluno", "Status", "Resultado", ""]} rotulo="Lista nominal de execução">
              {filtrada.map((n) => (
                <tr key={n.id}>
                  <td className={`${td} font-semibold text-gray-900`}>{n.nome}</td>
                  <td className={td}>
                    <Selo tom={n.situacao === "Concluiu" ? "verde" : n.situacao === "Iniciou" ? "azul" : "laranja"}>{n.situacao}</Selo>
                  </td>
                  <td className={`${td} text-gray-600`}>{n.situacao === "Concluiu" && n.desempenho !== null ? `${n.desempenho}%` : "—"}</td>
                  <td className={td}>
                    <Link href={`/professor/alunos/${n.id}`} className="text-sm font-bold text-ap-escuro hover:underline">
                      Ver aluno
                    </Link>
                  </td>
                </tr>
              ))}
            </Tabela>
            {filtrada.length === 0 && <p className="py-4 text-sm text-gray-500">Nenhum aluno nesse status.</p>}
            <p className="mt-3 text-xs text-gray-500">Mostrando {filtrada.length} de {todosFiltrados.length} alunos. A versão real tem busca e paginação.</p>
          </Secao>
        </div>
      </div>
    </div>
  );
}
