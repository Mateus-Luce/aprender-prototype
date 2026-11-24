import { Settings } from "lucide-react";
import { DISCIPLINAS, LIVROS, MUNICIPIOS, REGISTROS_SUPORTE } from "@/lib/dados";
import { Barra, Secao, Selo, Tabela, Titulo, botaoSecundario, td } from "@/components/ui";

export const metadata = { title: "Administração e implantação · Aprender + Fala Tio" };

const PERMISSOES = [
  ["Aluno", "Próprios dados", "—", "—", "—"],
  ["Professor", "Suas turmas", "Criar atividades", "—", "—"],
  ["Gestor escolar", "Sua escola", "Relatórios", "Cadastro de turmas", "—"],
  ["Gestor municipal", "Rede municipal", "Relatórios", "—", "—"],
  ["Administrador Aprender", "Municípios vinculados", "Relatórios", "Cadastros e usuários", "Vincular materiais"],
];

export default function Administracao() {
  const implantacao = MUNICIPIOS.map((m) => ({ ...m, pct: m.status === "Planejado" ? 5 : m.status === "Em implantação" ? Math.round((m.cadastrados / m.previstos) * 100) : Math.min(100, Math.round((m.cadastrados / m.previstos) * 100)) }));
  return (
    <div>
      <Titulo icone={Settings} titulo="Administração e implantação" subtitulo="A Aprender administra a própria operação sem precisar acessar ferramentas internas de desenvolvimento do Fala Tio." />

      <div className="mb-6 flex flex-wrap gap-2">
        {["Cadastrar município", "Cadastrar escola", "Adicionar usuário", "Editar usuário", "Vincular material", "Configurar série", "Configurar disciplina"].map((b) => (
          <button key={b} type="button" className={botaoSecundario}>
            {b}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Secao titulo="Acompanhamento da implantação" descricao="Alunos cadastrados ÷ alunos previstos, por município.">
          <ul className="flex flex-col gap-3">
            {implantacao.map((m) => (
              <li key={m.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-semibold text-gray-900">
                    {m.nome} ({m.uf})
                  </span>
                  <span className="font-black">{m.pct}%</span>
                </div>
                <Barra valor={m.pct} cor={m.status === "Planejado" ? "#9ca3af" : "#3f7d1c"} />
              </li>
            ))}
          </ul>
        </Secao>

        <Secao titulo="Vinculação de materiais didáticos" descricao="Livros do 8º ano disponíveis na plataforma.">
          <ul className="flex flex-col gap-2">
            {LIVROS.map((l) => (
              <li key={l.disciplina} className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-4 py-2.5">
                <span className="text-sm font-semibold text-gray-900">{l.titulo}</span>
                <Selo tom="verde">{l.capitulos.length} capítulos</Selo>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gray-500">Disciplinas configuradas: {DISCIPLINAS.join(", ")}. Série: 8º ano.</p>
        </Secao>
      </div>

      <Secao titulo="Perfis e permissões" descricao="Cada perfil enxerga só o que é da sua responsabilidade.">
        <Tabela colunas={["Perfil", "Visualiza", "Pode gerar", "Pode administrar", "Materiais"]} rotulo="Perfis e permissões">
          {PERMISSOES.map((p) => (
            <tr key={p[0]}>
              <td className={`${td} font-bold text-gray-900`}>{p[0]}</td>
              {p.slice(1).map((c, i) => (
                <td key={i} className={`${td} text-gray-600`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </Tabela>
      </Secao>

      <Secao titulo="Registros de auditoria" descricao="Quem fez o quê, e quando. Exemplos fictícios.">
        <Tabela colunas={["Hora", "Tipo", "Organização", "Detalhe"]} rotulo="Registros de auditoria">
          {REGISTROS_SUPORTE.map((r) => (
            <tr key={r.hora + r.detalhe}>
              <td className={`${td} font-mono text-xs`}>{r.hora}</td>
              <td className={td}>
                <Selo tom={r.tipo === "Erro" ? "vermelho" : "cinza"}>{r.tipo}</Selo>
              </td>
              <td className={td}>{r.org}</td>
              <td className={`${td} text-gray-600`}>{r.detalhe}</td>
            </tr>
          ))}
        </Tabela>
      </Secao>
    </div>
  );
}
