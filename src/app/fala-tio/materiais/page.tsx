import { BookOpen } from "lucide-react";
import { MATERIAIS_FALATIO } from "@/lib/dados";
import { Barra, Secao, Selo, Tabela, Titulo, td } from "@/components/ui";

export const metadata = { title: "Materiais · Fala Tio" };

export default function Materiais() {
  return (
    <div>
      <Titulo icone={BookOpen} titulo="Gestão de materiais" subtitulo="Livros usados pela TIA: cadastro, organização por série, disciplina e capítulo, e vínculo com a base de conhecimento." />
      <Secao titulo="Livros e processamento" descricao="A TIA só responde com base no que está vinculado e processado aqui.">
        <Tabela colunas={["Livro", "Capítulos", "Processamento", "Situação"]} rotulo="Materiais didáticos">
          {MATERIAIS_FALATIO.map((m) => (
            <tr key={m.livro}>
              <td className={`${td} font-bold text-gray-900`}>{m.livro}</td>
              <td className={td}>{m.capitulos}</td>
              <td className={`${td} min-w-[140px]`}>
                <div className="flex items-center gap-2">
                  <Barra valor={m.processado} altura="h-2" />
                  <span className="text-xs font-bold">{m.processado}%</span>
                </div>
              </td>
              <td className={td}>
                <Selo tom={m.status === "Disponível na TIA" ? "verde" : m.status === "Processando" ? "azul" : "laranja"}>{m.status}</Selo>
              </td>
            </tr>
          ))}
        </Tabela>
      </Secao>
      <Secao titulo="Organização e associação de conteúdos">
        <ul className="grid gap-2 md:grid-cols-3 text-sm">
          {["Cadastro de livros", "Organização por série, disciplina e capítulo", "Associação entre conteúdos e materiais", "Vínculo com a base de conhecimento da TIA", "Acompanhamento do processamento", "Disponibilização por organização"].map((t) => (
            <li key={t} className="rounded-xl bg-ap-fundo px-4 py-3 font-semibold text-gray-800">
              {t}
            </li>
          ))}
        </ul>
      </Secao>
    </div>
  );
}
