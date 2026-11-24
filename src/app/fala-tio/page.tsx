import { Activity, Cpu, DollarSign, Server } from "lucide-react";
import { LinhaInterativa } from "@/components/graficos";
import { GradeKpi, Kpi, Secao, Selo, Tabela, Titulo, td } from "@/components/ui";

export const metadata = { title: "Indicadores operacionais · Fala Tio" };

export default function Operacionais() {
  return (
    <div>
      <Titulo icone={Activity} titulo="Indicadores operacionais" subtitulo="Saúde da infraestrutura, consumo de IA e custos. Valores ilustrativos." />
      <GradeKpi>
        <Kpi rotulo="Disponibilidade (30 dias)" valor="99,94%" detalhe="meta: 99,9%" icone={Server} destaque />
        <Kpi rotulo="Consumo de IA (mês)" valor="1,8 mi" detalhe="tokens de entrada e saída" icone={Cpu} />
        <Kpi rotulo="Custo operacional (mês)" valor="R$ 3.420" detalhe="infraestrutura + IA (ilustrativo)" icone={DollarSign} />
        <Kpi rotulo="Falhas registradas" valor="7" detalhe="nenhuma crítica" icone={Activity} />
      </GradeKpi>
      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Evolução da utilização" descricao="Requisições por mês (milhares).">
          <LinhaInterativa rotulo="Requisições" sufixo="k" pontos={[{ rotulo: "M1", valor: 120 }, { rotulo: "M2", valor: 210 }, { rotulo: "M3", valor: 330 }, { rotulo: "M4", valor: 410 }, { rotulo: "M5", valor: 480 }, { rotulo: "M6", valor: 530 }]} min={0} max={600} />
        </Secao>
        <Secao titulo="Consumo de recursos">
          <Tabela colunas={["Recurso", "Uso", "Limite"]} rotulo="Consumo de recursos">
            {[
              ["Banco de dados", "38%", "80%"],
              ["Armazenamento de materiais", "12%", "70%"],
              ["Fila de geração de podcasts", "27%", "75%"],
              ["Cota de IA do mês", "61%", "90%"],
            ].map(([r, u, l]) => (
              <tr key={r}>
                <td className={`${td} font-semibold text-gray-900`}>{r}</td>
                <td className={td}>{u}</td>
                <td className={td}>
                  <Selo>{l}</Selo>
                </td>
              </tr>
            ))}
          </Tabela>
        </Secao>
      </div>
      <Secao titulo="Histórico de falhas">
        <Tabela colunas={["Data", "Gravidade", "Descrição", "Situação"]} rotulo="Histórico de falhas">
          {[
            ["há 2 dias", "Baixa", "Lentidão na geração de podcast por 12 min", "Resolvida"],
            ["há 6 dias", "Baixa", "Falha de importação de cadastro (linhas inválidas)", "Resolvida"],
            ["há 11 dias", "Média", "Reprocessamento de material de História", "Resolvida"],
          ].map((r) => (
            <tr key={r[2]}>
              {r.map((c, i) => (
                <td key={i} className={`${td} ${i === 2 ? "text-gray-900" : "text-gray-600"}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </Tabela>
      </Secao>
    </div>
  );
}
