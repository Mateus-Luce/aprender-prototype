"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPinned, Plus, Search } from "lucide-react";
import { MUNICIPIOS, type Municipio } from "@/lib/dados";
import { Barra, Secao, Selo, Tabela, Titulo, botaoPrimario, botaoSecundario, campo, td } from "@/components/ui";

const TOM = { Implantado: "verde", Piloto: "azul", "Em implantação": "laranja", Planejado: "cinza" } as const;

export default function GestaoMunicipios() {
  const [busca, setBusca] = useState("");
  const [uf, setUf] = useState("Todos");
  const [status, setStatus] = useState("Todos");
  const [aberto, setAberto] = useState<Municipio | null>(null);
  const [cadastro, setCadastro] = useState(false);
  const lista = useMemo(
    () => MUNICIPIOS.filter((m) => m.nome.toLowerCase().includes(busca.toLowerCase()) && (uf === "Todos" || m.uf === uf) && (status === "Todos" || m.status === status)),
    [busca, uf, status],
  );

  return (
    <div>
      <Titulo
        icone={MapPinned}
        titulo="Gestão de municípios"
        subtitulo="Acompanhe cada município participante. Nomes de municípios fictícios."
        acao={
          <button type="button" onClick={() => setCadastro((c) => !c)} className={botaoPrimario}>
            <Plus aria-hidden className="h-4 w-4" />
            Cadastrar município
          </button>
        }
      />

      {cadastro && (
        <Secao titulo="Novo município" descricao="Formulário demonstrativo: nada é salvo.">
          <div className="grid gap-3 sm:grid-cols-4">
            {["Nome do município", "Estado (UF)", "Nº de escolas", "Alunos previstos"].map((l) => (
              <label key={l} className="flex flex-col gap-1 text-xs font-bold text-gray-600">
                {l}
                <input className={campo} />
              </label>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => setCadastro(false)} className={botaoPrimario}>Salvar (simulado)</button>
            <button type="button" onClick={() => setCadastro(false)} className={botaoSecundario}>Cancelar</button>
          </div>
        </Secao>
      )}

      <div className="mb-4 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Buscar município
          <span className="relative">
            <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Nome" className={`${campo} pl-9`} />
          </span>
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Estado
          <select value={uf} onChange={(e) => setUf(e.target.value)} className={campo}>
            {["Todos", "CE", "PI", "MA"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
          Status da operação
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={campo}>
            {["Todos", "Piloto", "Em implantação", "Planejado"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>

      <Secao titulo={`${lista.length} municípios`}>
        <Tabela colunas={["Município", "UF", "Escolas", "Previstos", "Cadastrados", "Ativos", "Adesão", "Implantação", "Status", ""]} rotulo="Municípios participantes">
          {lista.map((m) => {
            const adesao = m.cadastrados ? Math.round((m.ativos / m.cadastrados) * 100) : 0;
            return (
              <tr key={m.id}>
                <td className={`${td} font-bold text-gray-900`}>{m.nome}</td>
                <td className={td}>{m.uf}</td>
                <td className={td}>{m.escolas}</td>
                <td className={td}>{m.previstos.toLocaleString("pt-BR")}</td>
                <td className={td}>{m.cadastrados.toLocaleString("pt-BR")}</td>
                <td className={td}>{m.ativos.toLocaleString("pt-BR")}</td>
                <td className={`${td} min-w-[110px]`}>
                  <div className="flex items-center gap-2">
                    <Barra valor={adesao} altura="h-2" />
                    <span className="text-xs font-bold">{adesao}%</span>
                  </div>
                </td>
                <td className={`${td} text-xs text-gray-600`}>{m.implantacao}</td>
                <td className={td}>
                  <Selo tom={TOM[m.status]}>{m.status}</Selo>
                </td>
                <td className={td}>
                  <button type="button" onClick={() => setAberto(m)} className="text-sm font-bold text-ap-escuro hover:underline">
                    Abrir município
                  </button>
                </td>
              </tr>
            );
          })}
        </Tabela>
      </Secao>

      {aberto && (
        <Secao titulo={`Painel de ${aberto.nome} (${aberto.uf})`} descricao="Escolas e usuários vinculados a este município" acao={<button type="button" onClick={() => setAberto(null)} className={botaoSecundario}>Fechar</button>}>
          <dl className="grid gap-3 sm:grid-cols-4">
            {[
              ["Escolas", String(aberto.escolas)],
              ["Alunos cadastrados", aberto.cadastrados.toLocaleString("pt-BR")],
              ["Alunos ativos", aberto.ativos.toLocaleString("pt-BR")],
              ["Professores (estim.)", String(Math.round(aberto.cadastrados / 28))],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-ap-fundo px-4 py-3">
                <dt className="text-xs font-semibold text-gray-500">{k}</dt>
                <dd className="font-titulo text-2xl font-black text-ap-tinta">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-gray-600">
            Veja as escolas deste município em{" "}
            <Link href="/aprender/escolas" className="font-bold text-ap-escuro underline">
              Gestão de escolas
            </Link>
            .
          </p>
        </Secao>
      )}
    </div>
  );
}
