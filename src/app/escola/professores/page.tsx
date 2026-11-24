import { Info, Users } from "lucide-react";
import { PROFESSORES_ESCOLA } from "@/lib/dados";
import { Barra, Secao, Tabela, Titulo, td } from "@/components/ui";

export const metadata = { title: "Gestão de professores · Aprender + Fala Tio" };

export default function GestaoProfessores() {
  return (
    <div>
      <Titulo icone={Users} titulo="Gestão de professores" subtitulo="Como a equipe está incorporando a plataforma à rotina pedagógica." />
      <p className="mb-6 flex gap-2 rounded-xl bg-white px-4 py-3 text-sm leading-relaxed text-gray-700 ring-1 ring-gray-200">
        <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ap-medio" />
        Estes indicadores mostram a <strong>utilização da ferramenta</strong>, não a qualidade do trabalho de cada professor.
      </p>
      <Secao titulo="Professores vinculados à escola">
        <Tabela colunas={["Professor", "Disciplina", "Turmas", "Atividades criadas", "Acessos/semana", "Acompanhamento dos alunos"]} rotulo="Professores da escola">
          {PROFESSORES_ESCOLA.map((p) => (
            <tr key={p.nome}>
              <td className={`${td} font-bold text-gray-900`}>{p.nome}</td>
              <td className={td}>{p.disciplina}</td>
              <td className={td}>{p.turmas}</td>
              <td className={td}>{p.atividades}</td>
              <td className={td}>{p.acessosSemana}</td>
              <td className={`${td} min-w-[150px]`}>
                <div className="flex items-center gap-2">
                  <Barra valor={p.acompanhamento} altura="h-2" />
                  <span className="text-xs font-bold">{p.acompanhamento}%</span>
                </div>
              </td>
            </tr>
          ))}
        </Tabela>
        <p className="mt-3 text-xs text-gray-500">“Acompanhamento” = parcela das atividades enviadas cujos resultados o professor abriu. Nomes fictícios.</p>
      </Secao>
    </div>
  );
}
