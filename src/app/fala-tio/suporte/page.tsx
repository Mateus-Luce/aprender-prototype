import { LifeBuoy } from "lucide-react";
import { REGISTROS_SUPORTE } from "@/lib/dados";
import { Secao, Selo, Tabela, Titulo, td } from "@/components/ui";

export const metadata = { title: "Suporte e auditoria · Fala Tio" };

export default function Suporte() {
  return (
    <div>
      <Titulo icone={LifeBuoy} titulo="Suporte e auditoria" subtitulo="Erros, alterações administrativas, solicitações de suporte e histórico de intervenções técnicas." />
      <Secao titulo="Registros recentes" descricao="Dados fictícios.">
        <Tabela colunas={["Hora", "Tipo", "Organização", "Detalhe"]} rotulo="Registros de suporte e auditoria">
          {REGISTROS_SUPORTE.map((r) => (
            <tr key={r.hora + r.detalhe}>
              <td className={`${td} font-mono text-xs`}>{r.hora}</td>
              <td className={td}>
                <Selo tom={r.tipo === "Erro" ? "vermelho" : r.tipo === "Suporte" ? "azul" : "cinza"}>{r.tipo}</Selo>
              </td>
              <td className={td}>{r.org}</td>
              <td className={`${td} text-gray-700`}>{r.detalhe}</td>
            </tr>
          ))}
        </Tabela>
      </Secao>
      <Secao titulo="Problemas por organização">
        <ul className="grid gap-2 sm:grid-cols-3">
          {[["Vale do Sol", "1 erro aberto"], ["Boa Esperança", "1 erro de importação"], ["Lagoa Bonita", "1 solicitação"]].map(([o, s]) => (
            <li key={o} className="rounded-xl bg-gray-50 px-4 py-3 text-sm">
              <p className="font-bold text-gray-900">{o}</p>
              <p className="text-xs text-gray-600">{s}</p>
            </li>
          ))}
        </ul>
      </Secao>
    </div>
  );
}
