import { Building2 } from "lucide-react";
import { MUNICIPIOS } from "@/lib/dados";
import { Secao, Selo, Tabela, Titulo, td } from "@/components/ui";

export const metadata = { title: "Organizações · Fala Tio" };

export default function Organizacoes() {
  return (
    <div>
      <Titulo icone={Building2} titulo="Gestão de organizações" subtitulo="Estrutura hierárquica das redes (multi-tenant): cada município e escola tem dados, usuários e permissões separados." />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
        <Secao titulo="Hierarquia" descricao="Aprender → município → escola → turma">
          <ul className="flex flex-col gap-2 text-sm">
            <li className="rounded-xl bg-ap-folha px-4 py-2.5 font-black text-ap-tinta">Aprender (organização raiz)</li>
            {MUNICIPIOS.slice(0, 4).map((m) => (
              <li key={m.id} className="ml-5 rounded-xl bg-gray-50 px-4 py-2.5">
                <span className="font-bold text-gray-900">{m.nome}</span> <span className="text-xs text-gray-500">· {m.escolas} escolas</span>
                <ul className="mt-1.5 text-xs text-gray-500">
                  <li className="ml-4">↳ Escolas e turmas (isoladas por município)</li>
                </ul>
              </li>
            ))}
          </ul>
        </Secao>
        <Secao titulo="Identidade visual por organização">
          <p className="text-sm text-gray-700">A identidade (logo, cores) é configurável por organização. Este protótipo usa a identidade Aprender; outras redes poderiam ter a sua, sem versão separada do sistema.</p>
          <div className="mt-3 flex gap-2">
            {["#81bc44", "#bbd152", "#cde2b5", "#1d1d1b"].map((c) => (
              <span key={c} className="h-8 w-8 rounded-lg ring-1 ring-gray-200" style={{ background: c }} title={c} />
            ))}
          </div>
        </Secao>
      </div>
      <Secao titulo="Status de cada organização">
        <Tabela colunas={["Organização", "Escolas", "Cadastros", "Permissões", "Status"]} rotulo="Organizações">
          {MUNICIPIOS.map((m) => (
            <tr key={m.id}>
              <td className={`${td} font-bold text-gray-900`}>{m.nome}</td>
              <td className={td}>{m.escolas}</td>
              <td className={td}>{m.cadastrados.toLocaleString("pt-BR")}</td>
              <td className={td}>
                <Selo tom={m.status === "Planejado" ? "cinza" : "verde"}>{m.status === "Planejado" ? "A configurar" : "Configuradas"}</Selo>
              </td>
              <td className={td}>
                <Selo tom={m.status === "Planejado" ? "cinza" : "azul"}>{m.status}</Selo>
              </td>
            </tr>
          ))}
        </Tabela>
      </Secao>
    </div>
  );
}
