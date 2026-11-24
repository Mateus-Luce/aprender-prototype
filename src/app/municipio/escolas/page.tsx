"use client";

import { useMemo, useState } from "react";
import { BarChart3, Info } from "lucide-react";
import { ESCOLAS_REDE } from "@/lib/dados";
import { BarrasInterativas } from "@/components/graficos";
import { Barra, Secao, Selo, Tabela, Titulo, campo, corTaxa, td } from "@/components/ui";

type Chave = "ativos" | "conclusao" | "desempenho";

export default function ComparativoEscolas() {
  const [regiao, setRegiao] = useState("Todas");
  const [ordem, setOrdem] = useState<Chave>("ativos");
  const lista = useMemo(
    () =>
      ESCOLAS_REDE.filter((e) => regiao === "Todas" || e.regiao === regiao)
        .map((e) => ({ ...e, adesao: Math.round((e.ativos / e.alunos) * 100) }))
        .sort((a, b) => (ordem === "ativos" ? b.adesao - a.adesao : b[ordem] - a[ordem])),
    [regiao, ordem],
  );
  const melhores = lista.slice(0, 3);
  const apoio = [...lista].sort((a, b) => a.adesao - b.adesao).slice(0, 3);

  return (
    <div>
      <Titulo icone={BarChart3} titulo="Comparativo entre escolas" subtitulo="Identifique unidades com bons resultados de utilização e escolas que podem precisar de apoio." />

      <div className="mb-3 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Região
          <select value={regiao} onChange={(e) => setRegiao(e.target.value)} className={campo}>
            {["Todas", "Centro", "Zona Norte", "Zona Sul", "Rural"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Ordenar por
          <select value={ordem} onChange={(e) => setOrdem(e.target.value as Chave)} className={campo}>
            <option value="ativos">Adesão</option>
            <option value="conclusao">Taxa de conclusão</option>
            <option value="desempenho">Indicador de aprendizagem</option>
          </select>
        </label>
      </div>
      <p className="mb-6 flex gap-2 rounded-xl bg-white px-4 py-2.5 text-xs text-gray-600 ring-1 ring-gray-200">
        <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ap-medio" />
        As comparações usam o mesmo período (Mês 6) e a mesma base de cálculo (8º ano, alunos cadastrados). Escolas rurais têm menos alunos e conectividade diferente.
      </p>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Secao titulo="Maior engajamento">
          <BarrasInterativas itens={melhores.map((e) => ({ nome: e.nome, valor: e.adesao, cor: "#3f7d1c" }))} mostrarDetalhe={false} />
        </Secao>
        <Secao titulo="Menor adesão">
          <BarrasInterativas itens={apoio.map((e) => ({ nome: e.nome, valor: e.adesao, cor: "#c2410c" }))} mostrarDetalhe={false} />
        </Secao>
      </div>

      <Secao titulo="Todas as escolas">
        <Tabela colunas={["Escola", "Região", "Alunos", "Adesão", "Conclusão", "Aprendizagem", "Situação"]} rotulo="Comparativo entre escolas">
          {lista.map((e) => (
            <tr key={e.id}>
              <td className={`${td} font-bold text-gray-900`}>{e.nome}</td>
              <td className={`${td} text-gray-600`}>{e.regiao}</td>
              <td className={td}>{e.alunos}</td>
              <td className={`${td} min-w-[120px]`}>
                <div className="flex items-center gap-2">
                  <Barra valor={e.adesao} altura="h-2" />
                  <span className="text-xs font-bold">{e.adesao}%</span>
                </div>
              </td>
              <td className={td}>{e.conclusao}%</td>
              <td className={td}>
                <span className="font-black" style={{ color: corTaxa(e.desempenho) }}>
                  {e.desempenho}%
                </span>
              </td>
              <td className={td}>
                <Selo tom={e.status === "Em destaque" ? "verde" : e.status === "Baixa adesão" ? "laranja" : "cinza"}>{e.status}</Selo>
              </td>
            </tr>
          ))}
        </Tabela>
      </Secao>
    </div>
  );
}
