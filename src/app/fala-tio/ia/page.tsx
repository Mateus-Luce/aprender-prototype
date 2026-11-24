import { Bot, ShieldCheck } from "lucide-react";
import { GradeKpi, Kpi, Secao, Selo, Tabela, Titulo, td } from "@/components/ui";
import { BarrasInterativas } from "@/components/graficos";

export const metadata = { title: "Inteligência artificial · Fala Tio" };

export default function IaAdmin() {
  return (
    <div>
      <Titulo icone={Bot} titulo="Gestão da inteligência artificial (TIA)" subtitulo="Garantir que a TIA responda só com base nos materiais autorizados, e que isso possa ser monitorado." />
      <GradeKpi>
        <Kpi rotulo="Respostas com fonte citada" valor="96%" detalhe="amostra de 5 mil respostas" icone={ShieldCheck} destaque />
        <Kpi rotulo="Perguntas fora do material" valor="9%" detalhe="TIA informou que não sabia" />
        <Kpi rotulo="Consumo de IA (mês)" valor="1,8 mi" detalhe="tokens" />
        <Kpi rotulo="Falhas de geração" valor="0,4%" detalhe="das requisições" />
      </GradeKpi>
      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Fontes autorizadas" descricao="Materiais vinculados à base de conhecimento.">
          <ul className="flex flex-col gap-2">
            {["Livro do aluno · Matemática · 8º ano", "Livro do aluno · Língua Portuguesa · 8º ano", "Livro do aluno · Ciências · 8º ano"].map((f) => (
              <li key={f} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5 text-sm">
                <span className="font-semibold text-gray-900">{f}</span>
                <Selo tom="verde">Autorizada</Selo>
              </li>
            ))}
            <li className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5 text-sm">
              <span className="font-semibold text-gray-900">Internet aberta</span>
              <Selo tom="vermelho">Bloqueada</Selo>
            </li>
          </ul>
        </Secao>
        <Secao titulo="Limites de utilização" descricao="Por organização, no mês.">
          <BarrasInterativas itens={[{ nome: "Vale do Sol", valor: 64 }, { nome: "Serra Dourada", valor: 71 }, { nome: "Lagoa Bonita", valor: 48 }, { nome: "Campo Formoso do Norte", valor: 33 }]} mostrarDetalhe={false} />
        </Secao>
      </div>
      <Secao titulo="Monitoramento das respostas e rastreabilidade" descricao="Exemplos fictícios: cada resposta guarda a referência usada.">
        <Tabela colunas={["Pergunta (resumo)", "Referência usada", "Resultado"]} rotulo="Rastreabilidade das respostas">
          {[
            ["Como resolver equação com parênteses?", "Matemática 8º · Cap. 2 · pág. 38", "Respondida com fonte"],
            ["Diferença entre fato e opinião", "Português 8º · Cap. 1 · pág. 12", "Respondida com fonte"],
            ["Quem ganhou a Copa de 2002?", "Nenhuma", "Recusada: fora do material"],
          ].map((r) => (
            <tr key={r[0]}>
              <td className={`${td} font-semibold text-gray-900`}>{r[0]}</td>
              <td className={`${td} text-gray-600`}>{r[1]}</td>
              <td className={td}>
                <Selo tom={r[2].startsWith("Recusada") ? "laranja" : "verde"}>{r[2]}</Selo>
              </td>
            </tr>
          ))}
        </Tabela>
      </Secao>
    </div>
  );
}
