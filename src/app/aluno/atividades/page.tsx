"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, ListChecks } from "lucide-react";
import { ATIVIDADES_ALUNO, COR_DISCIPLINA, type AtividadeAluno } from "@/lib/dados";
import { paraAtividadeAluno, useNovaAtividade } from "@/lib/store";
import { Barra, Selo, Titulo, botaoPrimario, botaoSecundario, cartao } from "@/components/ui";

type Aba = "abertas" | "concluidas";

function Cartao({ a }: { a: AtividadeAluno }) {
  const concluida = a.status === "Concluída";
  const destaque = a.status === "Pendente";
  const acao = a.status === "Pendente" ? "Iniciar atividade" : a.status === "Em andamento" ? "Continuar atividade" : "Consultar atividade concluída";
  return (
    <li className={`rounded-2xl border bg-white p-4 shadow-sm md:p-5 ${destaque ? "border-orange-300 ring-1 ring-orange-100" : "border-gray-200"}`}>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white" style={{ background: COR_DISCIPLINA[a.disciplina] }}>
          {a.disciplina}
        </span>
        <Selo tom="cinza">{a.tipo}</Selo>
        {a.id === "nova" && <Selo tom="laranja">Nova</Selo>}
        <span className="ml-auto">
          <Selo tom={concluida ? "verde" : a.status === "Em andamento" ? "azul" : "laranja"}>{a.status}</Selo>
        </span>
      </div>
      <h2 className="text-base font-black text-gray-900">{a.nome}</h2>
      <p className="mt-0.5 text-xs text-gray-500">
        {a.conteudo} · Prof. {a.professor}
      </p>
      <p className={`mt-2 flex items-center gap-1.5 text-sm ${destaque ? "font-bold text-orange-800" : "text-gray-600"}`}>
        {concluida ? <CheckCircle2 aria-hidden className="h-4 w-4 text-ap-medio" /> : <Clock aria-hidden className="h-4 w-4" />}
        {a.prazo}
        {a.resultado && <span className="text-gray-500"> · {a.resultado}</span>}
      </p>
      {!concluida && a.progresso > 0 && (
        <div className="mt-3 flex items-center gap-3">
          <Barra valor={a.progresso} />
          <span className="text-xs font-bold text-gray-600">{a.progresso}%</span>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href={`/aluno/atividades/${a.id}`} className={concluida ? botaoSecundario : botaoPrimario}>
          {acao}
        </Link>
        <Link href={`/aluno/atividades/${a.id}`} className="inline-flex min-h-[44px] items-center px-2 text-sm font-semibold text-ap-escuro hover:underline">
          Visualizar detalhes
        </Link>
      </div>
    </li>
  );
}

export default function Atividades() {
  const nova = useNovaAtividade();
  const [aba, setAba] = useState<Aba>("abertas");
  const todas = nova ? [paraAtividadeAluno(nova), ...ATIVIDADES_ALUNO] : ATIVIDADES_ALUNO;
  const abertas = todas.filter((a) => a.status !== "Concluída");
  const concluidas = todas.filter((a) => a.status === "Concluída");
  const lista = aba === "abertas" ? abertas : concluidas;

  return (
    <div>
      <Titulo icone={ListChecks} titulo="Minhas atividades" subtitulo="Tudo o que seus professores pediram, num só lugar. As pendentes aparecem em destaque." />

      <div role="tablist" aria-label="Filtrar atividades" className="mb-5 inline-flex rounded-xl bg-gray-200/70 p-1">
        {(
          [
            { id: "abertas", rotulo: `A fazer (${abertas.length})` },
            { id: "concluidas", rotulo: `Entregues (${concluidas.length})` },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={aba === t.id}
            onClick={() => setAba(t.id)}
            className={`min-h-[40px] rounded-lg px-4 text-sm font-semibold ${aba === t.id ? "bg-white text-ap-tinta shadow-sm" : "text-gray-600"}`}
          >
            {t.rotulo}
          </button>
        ))}
      </div>

      <ul className="grid gap-4 md:grid-cols-2">
        {lista.map((a) => (
          <Cartao key={a.id} a={a} />
        ))}
      </ul>
      {lista.length === 0 && <p className={`${cartao} text-center text-sm text-gray-500`}>Nada por aqui.</p>}
    </div>
  );
}
