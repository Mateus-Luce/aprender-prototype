import Link from "next/link";
import { ArrowLeft, Eye, MessageCircle } from "lucide-react";
import { ASSUNTOS_TURMA, TURMAS, alunosDaTurma } from "@/lib/dados";
import { BarrasInterativas, LinhaInterativa } from "@/components/graficos";
import { GradeKpi, Insight, Kpi, Secao, Selo, Tabela, Titulo, corTaxa, td } from "@/components/ui";

export const metadata = { title: "Perfil do aluno · Aprender + Fala Tio" };

export default async function PerfilAluno({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const turmaId = TURMAS.some((t) => t.id === id.split("-")[0]) ? id.split("-")[0] : "8a";
  const alunos = alunosDaTurma(turmaId);
  const aluno = alunos.find((a) => a.id === id) ?? alunos[2];
  const dados = aluno.desempenho !== null;
  const d = aluno.desempenho ?? 0;

  const hist = [
    { n: "Lista: potências e raízes", s: "Concluída", r: dados ? `${Math.min(10, Math.round(d / 10) + 1)}/10` : "—" },
    { n: "Podcast: equações com parênteses", s: aluno.concluidas > 3 ? "Concluída" : "Em andamento", r: "Ouvido" },
    { n: "Lista de reforço: equações do 1º grau", s: aluno.concluidas > 4 ? "Concluída" : "Pendente", r: aluno.concluidas > 4 ? `${Math.max(3, Math.round(d / 10) - 1)}/10` : "—" },
    { n: "Flashcards: regra de três", s: "Pendente", r: "—" },
  ];

  return (
    <div>
      <Link href="/professor/engajamento" className="mb-3 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900">
        <ArrowLeft aria-hidden className="h-4 w-4" />
        Mapa de engajamento
      </Link>
      <Titulo icone={Eye} titulo={aluno.nome} subtitulo={`${aluno.turma} · E.M. Prof.ª Aurora Lima · você vê apenas alunos das suas turmas`} acao={<Selo tom="cinza">Nome fictício</Selo>} />

      {!dados ? (
        <Insight tipo="info" titulo="Dados insuficientes para avaliar o desempenho">
          {aluno.nome.split(" ")[0]} fez poucas atividades neste período. Isso mostra baixa utilização, e não necessariamente dificuldade. Converse com o aluno antes de tirar conclusões.
        </Insight>
      ) : (
        <Insight titulo="Recomendação de acompanhamento" href={`/professor/criar?turma=${turmaId}&conteudo=${encodeURIComponent(aluno.dificuldades[0] ?? "Regra de três")}`} acao="Criar atividade de reforço">
          {aluno.dificuldades.length
            ? `Há dificuldade recorrente em “${aluno.dificuldades[0].toLowerCase()}”. Uma atividade curta de reforço pode ajudar.`
            : "O desempenho está dentro do esperado. Vale manter o ritmo e propor um desafio."}
        </Insight>
      )}

      <GradeKpi>
        <Kpi rotulo="Situação" valor={aluno.engajamento === "Ativo" ? "Ativo" : aluno.engajamento === "Pouca atividade" ? "Pouca ativ." : "Sem ativ."} detalhe={`último acesso ${aluno.ultimoAcesso}`} destaque />
        <Kpi rotulo="Frequência de uso" valor={`${aluno.acessosSemana}x`} detalhe="por semana" />
        <Kpi rotulo="Atividades concluídas" valor={String(aluno.concluidas)} detalhe={`${aluno.pendentes} pendentes`} />
        <Kpi rotulo="Desempenho" valor={dados ? `${d}%` : "—"} detalhe={dados ? "acertos nas atividades" : "dados insuficientes"} />
      </GradeKpi>

      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Desempenho por conteúdo" descricao="Em Matemática, comparado ao da turma.">
          {dados ? (
            <BarrasInterativas
              itens={ASSUNTOS_TURMA.slice(0, 4).map((a, i) => {
                const v = Math.max(25, Math.min(98, d + (i % 2 === 0 ? -9 : 7) - i * 2));
                return { nome: a.assunto, valor: v, detalhe: `Turma: ${a.taxa}%`, cor: corTaxa(v) };
              })}
            />
          ) : (
            <p className="text-sm text-gray-500">Ainda não há respostas suficientes.</p>
          )}
        </Secao>
        <Secao titulo="Evolução individual" descricao="Acertos por semana.">
          {dados ? (
            <LinhaInterativa
              rotulo="Evolução individual"
              pontos={[0, 1, 2, 3, 4, 5].map((i) => ({ rotulo: `Sem ${i + 1}`, valor: Math.max(25, Math.min(98, d - 12 + i * 3 + (i % 2) * 2)) }))}
              min={30}
              max={95}
            />
          ) : (
            <p className="text-sm text-gray-500">Sem dados para mostrar evolução.</p>
          )}
        </Secao>
      </div>

      <Secao titulo="Histórico de atividades">
        <Tabela colunas={["Atividade", "Status", "Resultado"]} rotulo="Histórico de atividades do aluno">
          {hist.map((h) => (
            <tr key={h.n}>
              <td className={`${td} font-semibold text-gray-900`}>{h.n}</td>
              <td className={td}>
                <Selo tom={h.s === "Concluída" ? "verde" : h.s === "Pendente" ? "laranja" : "azul"}>{h.s}</Selo>
              </td>
              <td className={td}>{h.r}</td>
            </tr>
          ))}
        </Tabela>
      </Secao>

      <Secao titulo="Dificuldades recorrentes">
        {aluno.dificuldades.length ? (
          <ul className="flex flex-wrap gap-2">
            {aluno.dificuldades.map((x) => (
              <li key={x} className="rounded-full bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-900">
                {x}
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <MessageCircle aria-hidden className="h-4 w-4" />
            Nenhuma dificuldade recorrente identificada com os dados atuais.
          </p>
        )}
      </Secao>
    </div>
  );
}
