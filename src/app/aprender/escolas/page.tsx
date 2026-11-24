"use client";

import { useMemo, useState } from "react";
import { School } from "lucide-react";
import { ESCOLAS_REDE, MUNICIPIOS } from "@/lib/dados";
import { Barra, Secao, Selo, Tabela, Titulo, campo, td } from "@/components/ui";

const ATIVOS = MUNICIPIOS.filter((m) => m.cadastrados > 0);

export default function GestaoEscolas() {
  const [mun, setMun] = useState(ATIVOS[0].nome);
  const [status, setStatus] = useState("Todos");
  // Demonstração: as mesmas escolas-modelo, com números ajustados por município.
  const fator = ATIVOS.find((m) => m.nome === mun)!.ativos / ATIVOS.find((m) => m.nome === mun)!.cadastrados;
  const lista = useMemo(
    () =>
      ESCOLAS_REDE.map((e, i) => {
        const alunos = e.alunos;
        const ativos = Math.min(alunos, Math.round(alunos * (e.ativos / e.alunos) * (0.7 + fator * 0.4)));
        const ativacao = Math.round((ativos / alunos) * 100);
        return { ...e, ativos, ativacao, professores: 4 + (i % 4), freq: (2.2 + ((i * 7) % 20) / 10 + fator).toFixed(1), recursos: Math.round(ativacao * 0.9) };
      }).filter((e) => status === "Todos" || (status === "Boa adesão" ? e.ativacao >= 65 : e.ativacao < 65)),
    [fator, status],
  );

  return (
    <div>
      <Titulo icone={School} titulo="Gestão de escolas" subtitulo="Quais escolas já estão implantadas, quais têm boa adesão e quais precisam de acompanhamento." />
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Município
          <select value={mun} onChange={(e) => setMun(e.target.value)} className={campo}>
            {ATIVOS.map((m) => (
              <option key={m.id}>{m.nome}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Situação
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={campo}>
            {["Todos", "Boa adesão", "Precisa de acompanhamento"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>
      <Secao titulo={`Escolas de ${mun}`} descricao="Nomes e números fictícios.">
        <Tabela colunas={["Escola", "Alunos", "Professores", "Taxa de ativação", "Acessos/semana", "Uso dos recursos", "Situação"]} rotulo="Escolas do município">
          {lista.map((e) => (
            <tr key={e.id}>
              <td className={`${td} font-bold text-gray-900`}>{e.nome}</td>
              <td className={td}>{e.alunos}</td>
              <td className={td}>{e.professores}</td>
              <td className={`${td} min-w-[120px]`}>
                <div className="flex items-center gap-2">
                  <Barra valor={e.ativacao} altura="h-2" />
                  <span className="text-xs font-bold">{e.ativacao}%</span>
                </div>
              </td>
              <td className={td}>{e.freq}</td>
              <td className={td}>{e.recursos}%</td>
              <td className={td}>
                <Selo tom={e.ativacao >= 65 ? "verde" : "laranja"}>{e.ativacao >= 65 ? "Boa adesão" : "Acompanhar"}</Selo>
              </td>
            </tr>
          ))}
        </Tabela>
      </Secao>
    </div>
  );
}
