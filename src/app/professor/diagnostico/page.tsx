"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeartPulse, Wand2 } from "lucide-react";
import { ASSUNTOS_TURMA, CAPITULOS_TURMA, EVOLUCAO_TURMA, HABILIDADES_REFORCO, DESEMPENHO_REDE_DISCIPLINA, TURMAS } from "@/lib/dados";
import { useParametros } from "@/lib/store";
import { BarrasInterativas, LinhaInterativa, Rosca } from "@/components/graficos";
import { Insight, Secao, SemDadosSuficientes, Tabela, Titulo, campo, corTaxa, td, botaoSecundario } from "@/components/ui";

export default function DiagnosticoTurma() {
  const params = useParametros();
  const [turmaId, setTurmaId] = useState("8a");
  const [capitulo, setCapitulo] = useState("Todos");
  const [periodo, setPeriodo] = useState("6 semanas");
  useEffect(() => {
    const t = params.get("turma");
    if (t && TURMAS.some((x) => x.id === t)) setTurmaId(t);
  }, [params]);

  const turma = TURMAS.find((t) => t.id === turmaId)!;
  const delta = turma.desempenho - 68;
  const aj = (v: number) => Math.max(20, Math.min(98, v + delta));
  const capitulos = CAPITULOS_TURMA.map((c) => ({ ...c, taxa: aj(c.taxa) }));
  const assuntos = ASSUNTOS_TURMA.map((a) => ({ ...a, taxa: aj(a.taxa), alunos: Math.round((a.alunos * turma.alunos) / 32) })).filter((a) => capitulo === "Todos" || a.capitulo === capitulo);
  const pior = [...assuntos].sort((a, b) => a.taxa - b.taxa)[0];
  const evolucao = EVOLUCAO_TURMA.map((e) => ({ rotulo: e.rotulo, valor: aj(e.taxa) }));
  const respostas = turma.alunos * 18;

  return (
    <div>
      <Titulo icone={HeartPulse} titulo="Diagnóstico da turma" subtitulo="Transforma as respostas dos alunos em informação para decidir o que reforçar. A decisão pedagógica continua sendo sua." />

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
          Capítulo
          <select value={capitulo} onChange={(e) => setCapitulo(e.target.value)} className={campo}>
            <option>Todos</option>
            {CAPITULOS_TURMA.map((c) => (
              <option key={c.nome}>{c.nome}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Período
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className={campo}>
            <option>6 semanas</option>
            <option>4 semanas</option>
            <option>2 semanas</option>
          </select>
        </label>
        <p className="pb-2 text-xs text-gray-500">
          Base: {turma.alunos} alunos · {respostas.toLocaleString("pt-BR")} respostas · {periodo} · Matemática
        </p>
      </div>

      {pior && (
        <Insight tipo="alerta" titulo="Sugestão de intervenção pedagógica" href={`/professor/criar?turma=${turmaId}&conteudo=${encodeURIComponent(pior.assunto)}`} acao="Criar atividade de reforço">
          Esta turma apresenta maior incidência de erros em <strong>{pior.assunto.toLowerCase()}</strong> ({pior.taxa}% de acertos, {pior.alunos} alunos). Considere
          solicitar uma atividade de revisão sobre o conteúdo e acompanhar os resultados após a conclusão.
        </Insight>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Acertos por capítulo" descricao="Os capítulos seguem a ordem do livro. Passe o mouse para destacar.">
          <BarrasInterativas itens={capitulos.map((c) => ({ nome: c.nome, valor: c.taxa, detalhe: `Mais erros em: ${c.erros}`, cor: corTaxa(c.taxa) }))} />
        </Secao>
        <Secao titulo="Acertos por disciplina" descricao="Visão geral da turma em todas as disciplinas da plataforma.">
          <BarrasInterativas itens={DESEMPENHO_REDE_DISCIPLINA.map((d) => ({ nome: d.nome, valor: aj(d.taxa), cor: corTaxa(aj(d.taxa)) }))} mostrarDetalhe={false} />
        </Secao>
      </div>

      <Secao titulo="Assuntos com maior incidência de erros" descricao="Clique em um assunto para ver os alunos relacionados." acao={
        <Link href={`/professor/criar?turma=${turmaId}`} className={botaoSecundario}>
          <Wand2 aria-hidden className="h-4 w-4" />
          Criar atividade de reforço
        </Link>
      }>
        <Tabela colunas={["Assunto", "Capítulo", "Acertos", "Alunos com dificuldade", ""]} rotulo="Assuntos com maior incidência de erros">
          {assuntos.map((a) => (
            <tr key={a.assunto}>
              <td className={`${td} font-bold text-gray-900`}>{a.assunto}</td>
              <td className={`${td} text-gray-600`}>{a.capitulo}</td>
              <td className={td}>
                <span className="font-black" style={{ color: corTaxa(a.taxa) }}>
                  {a.taxa}%
                </span>
              </td>
              <td className={`${td} text-gray-700`}>{a.alunos}</td>
              <td className={td}>
                <Link href={`/professor/engajamento?turma=${turmaId}&assunto=${encodeURIComponent(a.assunto)}`} className="text-sm font-bold text-ap-escuro hover:underline">
                  Ver alunos
                </Link>
              </td>
            </tr>
          ))}
        </Tabela>
        {assuntos.length === 0 && <p className="py-4 text-sm text-gray-500">Nenhum assunto neste capítulo.</p>}
      </Secao>

      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Distribuição das dificuldades" descricao="Tipo de erro mais frequente, identificado a partir das respostas.">
          <Rosca
            centro={`${respostas}`}
            subcentro="respostas analisadas"
            partes={[
              { nome: "Aplicar a regra (parênteses, sinais)", valor: 46, cor: "#c2410c" },
              { nome: "Interpretar o problema", valor: 31, cor: "#ca8a04" },
              { nome: "Cálculo", valor: 23, cor: "#3f7d1c" },
            ]}
          />
        </Secao>
        <Secao titulo="Evolução por período" descricao="Acertos da turma em Matemática, semana a semana.">
          <LinhaInterativa rotulo="Evolução da turma" pontos={evolucao} min={40} max={85} />
        </Secao>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Comparação entre atividades" descricao="Acertos médios em cada atividade já aplicada.">
          <BarrasInterativas
            itens={[
              { nome: "Lista: potências e raízes", valor: aj(74), cor: corTaxa(aj(74)) },
              { nome: "Lista de reforço: equações", valor: aj(59), cor: corTaxa(aj(59)) },
              { nome: "Flashcards: regra de três", valor: aj(66), cor: corTaxa(aj(66)) },
            ]}
            mostrarDetalhe={false}
          />
        </Secao>
        <Secao titulo="Habilidades que precisam de reforço" descricao="Códigos da BNCC relacionados aos erros mais frequentes.">
          <ul className="flex flex-col gap-2">
            {HABILIDADES_REFORCO.map((h) => (
              <li key={h} className="rounded-xl bg-ap-fundo px-4 py-3 text-sm font-semibold text-gray-800">
                {h}
              </li>
            ))}
          </ul>
        </Secao>
      </div>

      <SemDadosSuficientes>
        o sistema só apresenta uma conclusão quando há respostas suficientes no período. Com menos de 10 alunos ou 5 respostas por assunto, o indicador aparece como
        “dados insuficientes”. Os valores desta tela são fictícios.
      </SemDadosSuficientes>
    </div>
  );
}
