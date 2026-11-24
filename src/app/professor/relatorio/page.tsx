import Link from "next/link";
import { FileText } from "lucide-react";
import { QUESTOES_RELATORIO } from "@/lib/dados";
import { BarrasInterativas } from "@/components/graficos";
import { GradeKpi, Insight, Kpi, Secao, Tabela, Titulo, botaoSecundario, corTaxa, td } from "@/components/ui";

export const metadata = { title: "Relatório da atividade · Aprender + Fala Tio" };

export default function Relatorio() {
  const mais = [...QUESTOES_RELATORIO].sort((a, b) => a.taxa - b.taxa)[0];
  return (
    <div>
      <Titulo
        icone={FileText}
        titulo="Relatório da atividade"
        subtitulo="Lista de reforço: equações do 1º grau · 8º ano A · Matemática"
        acao={
          <Link href="/professor/diagnostico" className={botaoSecundario}>
            Voltar ao diagnóstico da turma
          </Link>
        }
      />

      <GradeKpi>
        <Kpi rotulo="Alunos participantes" valor="27 de 32" detalhe="84% da turma" destaque />
        <Kpi rotulo="Desempenho médio" valor="59%" detalhe="antes da atividade: 52%" />
        <Kpi rotulo="Questão mais difícil" valor={`Q${mais.n}`} detalhe={`${mais.taxa}% de acertos`} />
        <Kpi rotulo="Tempo médio" valor="14 min" detalhe="para concluir" />
      </GradeKpi>

      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Acertos por questão" descricao="Passe o mouse para destacar. As mais difíceis aparecem em laranja.">
          <BarrasInterativas
            itens={QUESTOES_RELATORIO.map((q) => ({ nome: `Q${q.n} · ${q.enunciado}`, valor: q.taxa, cor: corTaxa(q.taxa) }))}
            mostrarDetalhe={false}
          />
        </Secao>
        <Secao titulo="Conteúdos que precisam ser retomados">
          <ul className="flex flex-col gap-2">
            {[
              ["Equação com incógnita dos dois lados", "38% de acertos · 17 alunos"],
              ["Equações com parênteses", "47% de acertos · 14 alunos"],
              ["Traduzir problemas em equações", "52% de acertos · 12 alunos"],
            ].map(([t, d]) => (
              <li key={t} className="rounded-xl bg-orange-50 px-4 py-3">
                <p className="text-sm font-bold text-gray-900">{t}</p>
                <p className="text-xs text-gray-600">{d}</p>
              </li>
            ))}
          </ul>
        </Secao>
      </div>

      <Insight titulo="Sugestão de próxima atividade" href="/professor/criar?turma=8a&conteudo=Equações%20com%20parênteses" acao="Criar atividade de reforço">
        A turma melhorou 7 pontos, mas a questão 4 (incógnita dos dois lados) segue com menos de 40% de acertos. Uma lista curta só com esse tipo de equação pode fechar a lacuna.
      </Insight>

      <Secao titulo="Resultados individuais" descricao="Amostra de alunos. Nomes fictícios.">
        <Tabela colunas={["Aluno", "Acertos", "Tempo", ""]} rotulo="Resultados individuais">
          {[
            ["Bruno Lima", "9/10", "11 min"],
            ["Carla Souza", "7/10", "15 min"],
            ["Davi Costa", "4/10", "18 min"],
            ["Elisa Rocha", "6/10", "13 min"],
          ].map(([n, a, t]) => (
            <tr key={n}>
              <td className={`${td} font-semibold text-gray-900`}>{n}</td>
              <td className={td}>{a}</td>
              <td className={`${td} text-gray-600`}>{t}</td>
              <td className={td}>
                <Link href="/professor/alunos/8a-3" className="text-sm font-bold text-ap-escuro hover:underline">
                  Ver resultado individual
                </Link>
              </td>
            </tr>
          ))}
        </Tabela>
      </Secao>
    </div>
  );
}
