"use client";

import { useEffect, useState } from "react";
import { CHAVE_NOVA_ATIVIDADE, type AtividadeAluno, type AtividadeProfessor } from "./dados";

export interface NovaAtividade {
  nome: string;
  turma: string;
  tipo: AtividadeAluno["tipo"];
  disciplina: AtividadeAluno["disciplina"];
  conteudo: string;
  prazo: string;
  enviadaEm: number;
}

/** Atividade enviada pelo professor neste navegador (demonstra o fluxo professor → aluno). */
export function lerNovaAtividade(): NovaAtividade | null {
  try {
    const bruto = window.localStorage.getItem(CHAVE_NOVA_ATIVIDADE);
    return bruto ? (JSON.parse(bruto) as NovaAtividade) : null;
  } catch {
    return null;
  }
}

export function gravarNovaAtividade(a: NovaAtividade | null) {
  try {
    if (a) window.localStorage.setItem(CHAVE_NOVA_ATIVIDADE, JSON.stringify(a));
    else window.localStorage.removeItem(CHAVE_NOVA_ATIVIDADE);
  } catch {
    /* armazenamento indisponível: a demonstração segue sem o vínculo entre perfis */
  }
}

export function useNovaAtividade() {
  const [nova, setNova] = useState<NovaAtividade | null>(null);
  useEffect(() => {
    setNova(lerNovaAtividade());
  }, []);
  return nova;
}

export function paraAtividadeAluno(n: NovaAtividade): AtividadeAluno {
  return {
    id: "nova",
    nome: n.nome,
    disciplina: n.disciplina,
    conteudo: n.conteudo,
    professor: "Carlos Mendes",
    tipo: n.tipo,
    prazo: n.prazo,
    status: "Pendente",
    progresso: 0,
  };
}

export function paraAtividadeProfessor(n: NovaAtividade): AtividadeProfessor {
  return {
    id: "nova",
    nome: n.nome,
    turma: n.turma,
    tipo: n.tipo,
    prazo: n.prazo,
    destinatarios: n.turma.includes("A") ? 32 : 30,
    iniciaram: 0,
    concluiram: 0,
    desempenho: null,
  };
}

/** Lê os parâmetros da URL no navegador (evita Suspense do useSearchParams numa página estática). */
export function useParametros(): URLSearchParams {
  const [p, setP] = useState<URLSearchParams>(() => new URLSearchParams());
  useEffect(() => {
    setP(new URLSearchParams(window.location.search));
  }, []);
  return p;
}
