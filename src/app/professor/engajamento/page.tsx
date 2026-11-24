"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Activity, Info } from "lucide-react";
import { TURMAS, alunosDaTurma, type Engajamento } from "@/lib/dados";
import { useParametros } from "@/lib/store";
import { Rosca } from "@/components/graficos";
import { GradeKpi, Kpi, Secao, Selo, Tabela, Titulo, campo, td } from "@/components/ui";

const TOM: Record<Engajamento, "verde" | "laranja" | "vermelho"> = {
  Ativo: "verde",
  "Pouca atividade": "laranja",
  "Sem atividade recente": "vermelho",
};

export default function MapaEngajamento() {
  const params = useParametros();
  const [turmaId, setTurmaId] = useState("8a");
  const [filtro, setFiltro] = useState<"Todos" | Engajamento>("Todos");
  const [ordem, setOrdem] = useState<"participacao" | "nome">("participacao");
  const [periodo, setPeriodo] = useState("Últimos 7 dias");
  const assunto = params.get("assunto");

  useEffect(() => {
    const t = params.get("turma");
    if (t && TURMAS.some((x) => x.id === t)) setTurmaId(t);
  }, [params]);

  const todos = useMemo(() => alunosDaTurma(turmaId), [turmaId]);
  const lista = useMemo(() => {
    let l = todos.filter((a) => filtro === "Todos" || a.engajamento === filtro);
    if (assunto) l = l.filter((a) => a.dificuldades.includes(assunto) || a.desempenho === null || a.desempenho < 62);
    return [...l].sort((a, b) => (ordem === "nome" ? a.nome.localeCompare(b.nome) : b.acessosSemana - a.acessosSemana || b.concluidas - a.concluidas));
  }, [todos, filtro, ordem, assunto]);

  // A demonstração mostra uma amostra (ativos + quem precisa de atenção); o produto real tem busca e paginação.
  const amostra =
    filtro === "Todos" && !assunto && lista.length > 14
      ? [...lista.filter((a) => a.engajamento === "Ativo").slice(0, 6), ...lista.filter((a) => a.engajamento !== "Ativo").slice(0, 8)]
      : lista.slice(0, 14);
  const ativos = todos.filter((a) => a.engajamento === "Ativo").length;
  const pouca = todos.filter((a) => a.engajamento === "Pouca atividade").length;
  const sem = todos.filter((a) => a.engajamento === "Sem atividade recente").length;
  const turma = TURMAS.find((t) => t.id === turmaId)!;

  return (
    <div>
      <Titulo icone={Activity} titulo="Mapa de engajamento" subtitulo="Quem está usando a plataforma, quem está fazendo as atividades e quem não aparece há alguns dias." />

      <div className="mb-5 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Turma
          <select value={turmaId} onChange={(e) => setTurmaId(e.target.value)} className={campo}>
            {TURMAS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nome}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Período
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className={campo}>
            <option>Últimos 7 dias</option>
            <option>Últimos 15 dias</option>
            <option>Últimos 30 dias</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Situação
          <select value={filtro} onChange={(e) => setFiltro(e.target.value as typeof filtro)} className={campo}>
            <option>Todos</option>
            <option>Ativo</option>
            <option>Pouca atividade</option>
            <option>Sem atividade recente</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Ordenar por
          <select value={ordem} onChange={(e) => setOrdem(e.target.value as typeof ordem)} className={campo}>
            <option value="participacao">Participação</option>
            <option value="nome">Nome</option>
          </select>
        </label>
      </div>

      {assunto && (
        <p className="mb-5 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-900">
          Mostrando alunos relacionados ao indicador <strong>{assunto}</strong> (desempenho abaixo de 62% ou sem dados suficientes).{" "}
          <Link href="/professor/engajamento" className="font-bold underline">
            Limpar
          </Link>
        </p>
      )}

      <GradeKpi colunas={4}>
        <Kpi rotulo="Alunos ativos" valor={String(ativos)} detalhe={`de ${todos.length} em ${turma.nome}`} destaque />
        <Kpi rotulo="Pouca atividade" valor={String(pouca)} detalhe="acessaram 1 ou 2 vezes" />
        <Kpi rotulo="Sem atividade recente" valor={String(sem)} detalhe="mais de 10 dias" />
        <Kpi rotulo="Adesão da turma" valor={`${turma.participacao}%`} detalhe={periodo.toLowerCase()} />
      </GradeKpi>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <Secao titulo="Situação da turma">
          <Rosca
            centro={`${Math.round((ativos / todos.length) * 100)}%`}
            subcentro="ativos"
            partes={[
              { nome: "Ativos", valor: ativos, cor: "#3f7d1c" },
              { nome: "Pouca atividade", valor: pouca, cor: "#ca8a04" },
              { nome: "Sem atividade recente", valor: sem, cor: "#c2410c" },
            ]}
          />
          <p className="mt-4 flex gap-2 rounded-xl bg-ap-fundo px-3 py-2.5 text-xs leading-relaxed text-gray-700">
            <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ap-medio" />
            Baixa utilização não significa dificuldade de aprendizagem. Antes de concluir algo, converse com o aluno.
          </p>
        </Secao>

        <Secao titulo={`Alunos de ${turma.nome}`} descricao={`Mostrando ${amostra.length} de ${lista.length} alunos · nomes fictícios`}>
          <Tabela colunas={["Aluno", "Situação", "Acessos/sem.", "Iniciadas", "Concluídas", "Último acesso"]} rotulo="Participação dos alunos">
            {amostra.map((a) => (
              <tr key={a.id}>
                <td className={td}>
                  <Link href={`/professor/alunos/${a.id}`} className="font-bold text-ap-escuro hover:underline">
                    {a.nome}
                  </Link>
                </td>
                <td className={td}>
                  <Selo tom={TOM[a.engajamento]}>{a.engajamento}</Selo>
                </td>
                <td className={td}>{a.acessosSemana}</td>
                <td className={td}>{a.iniciadas}</td>
                <td className={td}>{a.concluidas}</td>
                <td className={`${td} text-gray-500`}>{a.ultimoAcesso}</td>
              </tr>
            ))}
          </Tabela>
        </Secao>
      </div>
    </div>
  );
}
