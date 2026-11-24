import { Plug } from "lucide-react";
import { INTEGRACOES } from "@/lib/dados";
import { Secao, Selo, Tabela, Titulo, td } from "@/components/ui";

export const metadata = { title: "Integrações · Fala Tio" };

export default function Integracoes() {
  return (
    <div>
      <Titulo icone={Plug} titulo="Gestão de integrações" subtitulo="QR Codes, autenticação, sistemas externos e importação de cadastros." />
      <p className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Os status abaixo são <strong>ilustrativos</strong>: nenhuma integração está funcionando de verdade neste protótipo.
      </p>
      <Secao titulo="Integrações">
        <Tabela colunas={["Integração", "O que faz", "Status", "Última verificação"]} rotulo="Integrações">
          {INTEGRACOES.map((i) => (
            <tr key={i.nome}>
              <td className={`${td} font-bold text-gray-900`}>{i.nome}</td>
              <td className={`${td} text-gray-600`}>{i.detalhe}</td>
              <td className={td}>
                <Selo tom={i.status === "Operando" ? "verde" : i.status === "Atenção" ? "laranja" : "cinza"}>{i.status}</Selo>
              </td>
              <td className={`${td} text-gray-500`}>{i.ultima}</td>
            </tr>
          ))}
        </Tabela>
      </Secao>
      <Secao titulo="Gestão dos QR Codes" descricao="Cada QR Code identifica material, série, disciplina, capítulo e assunto.">
        <div className="grid gap-3 sm:grid-cols-3">
          {[["QR Codes gerados", "412"], ["Acessos nos últimos 7 dias", "6.870"], ["Com erro de vínculo", "3"]].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-ap-fundo px-4 py-3">
              <p className="text-xs font-semibold text-gray-500">{k}</p>
              <p className="font-titulo text-2xl font-black text-ap-tinta">{v}</p>
            </div>
          ))}
        </div>
      </Secao>
    </div>
  );
}
