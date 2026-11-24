"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Pause, Play, RotateCw } from "lucide-react";
import { ATIVIDADES_ALUNO, FLASHCARDS_EXEMPLO, QUESTOES_EXEMPLO } from "@/lib/dados";
import { paraAtividadeAluno, useNovaAtividade } from "@/lib/store";
import { Barra, Selo, botaoPrimario, botaoSecundario, cartao } from "@/components/ui";

function Questoes({ aoFinalizar }: { aoFinalizar: (acertos: number) => void }) {
  const [i, setI] = useState(0);
  const [resp, setResp] = useState<Record<number, number>>({});
  const q = QUESTOES_EXEMPLO[i];
  const ultima = i === QUESTOES_EXEMPLO.length - 1;
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <Barra valor={((i + 1) / QUESTOES_EXEMPLO.length) * 100} />
        <span className="shrink-0 text-xs font-bold text-gray-500">
          {i + 1} de {QUESTOES_EXEMPLO.length}
        </span>
      </div>
      <p className="mb-4 text-lg font-bold text-ap-tinta">{q.enunciado}</p>
      <div role="radiogroup" aria-label="Alternativas" className="flex flex-col gap-2">
        {q.alternativas.map((a, idx) => (
          <button
            key={a}
            type="button"
            role="radio"
            aria-checked={resp[i] === idx}
            onClick={() => setResp((r) => ({ ...r, [i]: idx }))}
            className={`flex min-h-[52px] items-center gap-3 rounded-xl border px-4 text-left text-sm font-semibold ${resp[i] === idx ? "border-ap-escuro bg-ap-fundo text-ap-escuro" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-black ${resp[i] === idx ? "border-ap-escuro bg-ap-escuro text-white" : "border-gray-300"}`}>{"ABCD"[idx]}</span>
            {a}
          </button>
        ))}
      </div>
      <div className="mt-5 flex justify-between gap-2">
        <button type="button" disabled={i === 0} onClick={() => setI(i - 1)} className={botaoSecundario}>
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Voltar
        </button>
        {ultima ? (
          <button type="button" disabled={Object.keys(resp).length < QUESTOES_EXEMPLO.length} onClick={() => aoFinalizar(QUESTOES_EXEMPLO.filter((x, n) => resp[n] === x.correta).length)} className={botaoPrimario}>
            Enviar respostas
          </button>
        ) : (
          <button type="button" onClick={() => setI(i + 1)} className={botaoPrimario}>
            Avançar
            <ArrowRight aria-hidden className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function Podcast({ aoFinalizar }: { aoFinalizar: () => void }) {
  const [tocando, setTocando] = useState(false);
  const [pct, setPct] = useState(45);
  const avancar = () => setPct((p) => Math.min(100, p + 25));
  return (
    <div>
      <div className="mb-4 flex items-center gap-4 rounded-2xl bg-ap-fundo p-4">
        <button type="button" onClick={() => setTocando((t) => !t)} aria-label={tocando ? "Pausar" : "Reproduzir"} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ap-escuro text-white">
          {tocando ? <Pause aria-hidden className="h-6 w-6" /> : <Play aria-hidden className="h-6 w-6" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-ap-tinta">Equações com parênteses · 4 min</p>
          <Barra valor={pct} />
          <p className="mt-1 text-xs text-gray-500">{Math.round((pct / 100) * 4 * 10) / 10} de 4 min</p>
        </div>
      </div>
      <p className="mb-4 text-sm text-gray-600">Registro de reprodução: a atividade conta como concluída quando você ouve o episódio inteiro.</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={avancar} className={botaoSecundario}>
          Simular +1 min de áudio
        </button>
        <button type="button" disabled={pct < 100} onClick={aoFinalizar} className={botaoPrimario}>
          Finalizar atividade
        </button>
      </div>
    </div>
  );
}

function Resumo({ aoFinalizar }: { aoFinalizar: () => void }) {
  const topicos = [
    ["O que é uma equação", "Uma igualdade com uma incógnita. Ex.: 3x − 5 = 16."],
    ["Operações inversas", "Para isolar o x, desfaça cada operação do outro lado: some, subtraia, multiplique ou divida."],
    ["Parênteses", "Distribua o número de fora antes de isolar a incógnita."],
    ["Conferência", "Troque o x pelo valor encontrado e veja se a igualdade se mantém."],
  ];
  return (
    <div>
      <ul className="mb-5 flex flex-col gap-3">
        {topicos.map(([t, d]) => (
          <li key={t} className="rounded-xl bg-gray-50 px-4 py-3">
            <p className="text-sm font-bold text-ap-escuro">{t}</p>
            <p className="text-sm text-gray-700">{d}</p>
          </li>
        ))}
      </ul>
      <button type="button" onClick={aoFinalizar} className={botaoPrimario}>
        Finalizar atividade
      </button>
    </div>
  );
}

function Flashcards({ aoFinalizar }: { aoFinalizar: () => void }) {
  const [i, setI] = useState(0);
  const [virado, setVirado] = useState(false);
  const c = FLASHCARDS_EXEMPLO[i];
  const ultimo = i === FLASHCARDS_EXEMPLO.length - 1;
  return (
    <div>
      <button type="button" onClick={() => setVirado((v) => !v)} aria-label="Virar cartão" className="flex min-h-[200px] w-full flex-col items-center justify-center rounded-3xl bg-ap-folha p-6 text-center">
        <span className="mb-2 text-xs font-bold uppercase tracking-widest text-ap-escuro">{virado ? "Resposta" : "Pergunta"}</span>
        <span className="font-titulo text-xl font-black text-ap-tinta">{virado ? c.verso : c.frente}</span>
        <span className="mt-3 flex items-center gap-1 text-xs text-ap-escuro">
          <RotateCw aria-hidden className="h-3.5 w-3.5" />
          Toque para virar
        </span>
      </button>
      <div className="mt-4 flex items-center justify-between gap-2">
        <button type="button" disabled={i === 0} onClick={() => { setI(i - 1); setVirado(false); }} className={botaoSecundario}>
          Voltar
        </button>
        <span className="text-xs font-bold text-gray-500">
          {i + 1} de {FLASHCARDS_EXEMPLO.length}
        </span>
        {ultimo ? (
          <button type="button" onClick={aoFinalizar} className={botaoPrimario}>
            Finalizar atividade
          </button>
        ) : (
          <button type="button" onClick={() => { setI(i + 1); setVirado(false); }} className={botaoPrimario}>
            Avançar
          </button>
        )}
      </div>
    </div>
  );
}

export default function ExecutarAtividade({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const nova = useNovaAtividade();
  const todas = nova ? [paraAtividadeAluno(nova), ...ATIVIDADES_ALUNO] : ATIVIDADES_ALUNO;
  const a = todas.find((x) => x.id === id);
  const [fim, setFim] = useState<string | null>(null);

  if (!a) {
    return (
      <div className={`${cartao} max-w-lg`}>
        <p className="font-bold">Atividade não encontrada.</p>
        <Link href="/aluno/atividades" className={`${botaoPrimario} mt-3`}>
          Voltar às atividades
        </Link>
      </div>
    );
  }

  const concluida = a.status === "Concluída";
  const tipo = a.tipo;

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/aluno/atividades" className="mb-3 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900">
        <ArrowLeft aria-hidden className="h-4 w-4" />
        Minhas atividades
      </Link>
      <div className={cartao}>
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <Selo tom="cinza">{tipo}</Selo>
          <Selo tom="azul">{a.disciplina}</Selo>
        </div>
        <h1 className="font-titulo text-2xl font-black text-ap-tinta">{a.nome}</h1>
        <p className="mb-5 text-sm text-gray-500">
          {a.conteudo} · Prof. {a.professor} · {a.prazo}
        </p>

        {fim ? (
          <div className="rounded-2xl bg-ap-fundo p-6 text-center" role="status">
            <span className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-ap-escuro text-white">
              <Check aria-hidden className="h-7 w-7" />
            </span>
            <p className="font-titulo text-xl font-black text-ap-tinta">Atividade concluída!</p>
            <p className="mt-1 text-sm text-gray-700">{fim}</p>
            <p className="mt-1 text-xs text-gray-500">+40 XP · o resultado foi registrado no seu histórico e aparece para o professor.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link href="/aluno/desempenho" className={botaoPrimario}>
                Ver meu desempenho
              </Link>
              <Link href="/aluno/atividades" className={botaoSecundario}>
                Voltar às atividades
              </Link>
            </div>
          </div>
        ) : concluida ? (
          <div className="rounded-2xl bg-gray-50 p-5 text-sm text-gray-700">
            <p className="font-bold text-ap-escuro">Atividade já entregue</p>
            <p className="mt-1">Resultado: {a.resultado}.</p>
          </div>
        ) : tipo === "Podcast" ? (
          <Podcast aoFinalizar={() => setFim("Você ouviu o episódio inteiro.")} />
        ) : tipo === "Resumo" || tipo === "Revisão de conteúdo" ? (
          <Resumo aoFinalizar={() => setFim("Você leu todos os tópicos.")} />
        ) : tipo === "Flashcards" ? (
          <Flashcards aoFinalizar={() => setFim("Você revisou todos os cartões.")} />
        ) : (
          <Questoes aoFinalizar={(n) => setFim(`Você acertou ${n} de ${QUESTOES_EXEMPLO.length} questões.`)} />
        )}
      </div>
      <p className="mt-3 text-xs text-gray-400">O sistema registra início, execução e conclusão de cada atividade. Conteúdo de exemplo nesta demonstração.</p>
    </div>
  );
}
