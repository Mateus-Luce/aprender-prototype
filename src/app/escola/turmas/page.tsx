"use client";

import { useState } from "react";
import { UsersRound } from "lucide-react";
import { TURMAS } from "@/lib/dados";
import { BarrasInterativas } from "@/components/graficos";
import { Barra, Secao, Selo, Tabela, Titulo, botaoSecundario, campo, corTaxa, td } from "@/components/ui";

export default function GestaoTurmas() {
  const [serie, setSerie] = useState("Todas");
  const [comparar, setComparar] = useState<"participacao" | "conclusao" | "desempenho">("participacao");
  const lista = TURMAS.filter((t) => serie === "Todas" || t.serie === serie);
  const rotulo = { participacao: "Engajamento (participação)", conclusao: "Conclusão das atividades", desempenho: "Desempenho geral" }[comparar];

  return (
    <div>
      <Titulo icone={UsersRound} titulo="Gestão de turmas" subtitulo="Quais turmas estão usando a plataforma e quais precisam de mais incentivo ou acompanhamento." />

      <div className="mb-5 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Série
          <select value={serie} onChange={(e) => setSerie(e.target.value)} className={campo}>
            <option>Todas</option>
            <option>8º ano</option>
          </select>
        </label>
      </div>

      <Secao titulo="Turmas cadastradas">
        <Tabela colunas={["Turma", "Alunos", "Engajamento", "Atividades pendentes", "Concluídas", "Desempenho", "Professores"]} rotulo="Turmas da escola">
          {lista.map((t) => {
            const concl = Math.round((t.alunos * t.conclusao) / 100);
            return (
              <tr key={t.id}>
                <td className={`${td} font-bold text-gray-900`}>
                  {t.nome}
                  {t.participacao < 60 && (
                    <span className="ml-2">
                      <Selo tom="laranja">Baixa adesão</Selo>
                    </span>
                  )}
                </td>
                <td className={td}>{t.alunos}</td>
                <td className={`${td} min-w-[130px]`}>
                  <div className="flex items-center gap-2">
                    <Barra valor={t.participacao} altura="h-2" />
                    <span className="text-xs font-bold">{t.participacao}%</span>
                  </div>
                </td>
                <td className={td}>{t.alunos - concl}</td>
                <td className={td}>{concl}</td>
                <td className={td}>
                  <span className="font-black" style={{ color: corTaxa(t.desempenho) }}>
                    {t.desempenho}%
                  </span>
                </td>
                <td className={`${td} text-xs text-gray-600`}>{t.professores.join(", ")}</td>
              </tr>
            );
          })}
        </Tabela>
      </Secao>

      <Secao
        titulo="Comparação entre turmas"
        acao={
          <div role="group" aria-label="Indicador da comparação" className="flex flex-wrap gap-1.5">
            {(["participacao", "conclusao", "desempenho"] as const).map((c) => (
              <button key={c} type="button" aria-pressed={comparar === c} onClick={() => setComparar(c)} className={`${botaoSecundario} !min-h-[36px] !px-3 text-xs ${comparar === c ? "!border-ap-escuro !bg-ap-fundo !text-ap-escuro" : ""}`}>
                {c === "participacao" ? "Engajamento" : c === "conclusao" ? "Conclusão" : "Desempenho"}
              </button>
            ))}
          </div>
        }
        descricao={rotulo}
      >
        <BarrasInterativas itens={lista.map((t) => ({ nome: t.nome, valor: t[comparar], cor: comparar === "desempenho" ? corTaxa(t[comparar]) : "#3f7d1c" }))} mostrarDetalhe={false} />
      </Secao>
    </div>
  );
}
