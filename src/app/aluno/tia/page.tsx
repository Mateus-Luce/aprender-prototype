"use client";

import { useRef, useState } from "react";
import { BookOpen, Headphones, History, Layers, ListChecks, Send, Sparkles, FileText, RotateCcw, ShieldCheck } from "lucide-react";
import { LIVRO_ATIVO } from "@/lib/dados";
import { cartao } from "@/components/ui";

interface Mensagem {
  autor: "aluno" | "tia";
  texto: string;
  fontes?: string[];
  semBase?: boolean;
  acao?: string;
}

const cap = LIVRO_ATIVO.capitulo;
const FONTE_CAP = `Livro de Matemática · 8º ano · Cap. ${cap.numero} (${cap.titulo})`;

const BASE: { chaves: string[]; texto: string; fontes: string[] }[] = [
  {
    chaves: ["parêntese", "parentese", "distribu"],
    texto:
      "Quando há parênteses, primeiro distribua o número que está fora multiplicando cada termo de dentro. Em 2(x + 4) = 18, vira 2x + 8 = 18. Depois isole o x: 2x = 10, então x = 5. Sempre confira substituindo o valor na equação original.",
    fontes: [`${FONTE_CAP}, seção “Equações com parênteses”, pág. 38`],
  },
  {
    chaves: ["equação", "equacao", "equações", "x ", "incógnita", "resolver"],
    texto:
      "Resolver uma equação do 1º grau é descobrir o valor da incógnita. A ideia central é manter a balança em equilíbrio: tudo o que você faz de um lado da igualdade, faz do outro. Para 3x − 5 = 16: some 5 aos dois lados (3x = 21) e divida por 3 (x = 7).",
    fontes: [`${FONTE_CAP}, seção “Resolver equações”, págs. 34 a 36`],
  },
  {
    chaves: ["problema", "idade", "triplo", "soma"],
    texto:
      "Em problemas, traduza o enunciado para uma equação. “A soma de um número com o seu triplo é 48” vira x + 3x = 48. Some os termos semelhantes (4x = 48) e divida: x = 12.",
    fontes: [`${FONTE_CAP}, seção “Problemas com equações”, págs. 41 e 42`],
  },
];

const SEM_BASE =
  "Não encontrei isso no material didático deste capítulo, então prefiro não responder para não inventar. Você pode reformular a pergunta com termos do capítulo ou levar a dúvida ao seu professor.";

function responder(pergunta: string): Mensagem {
  const p = pergunta.toLowerCase();
  const achou = BASE.find((b) => b.chaves.some((c) => p.includes(c)));
  if (achou) return { autor: "tia", texto: achou.texto, fontes: achou.fontes };
  return { autor: "tia", texto: SEM_BASE, semBase: true };
}

const ACOES: { id: string; rotulo: string; icone: typeof Sparkles; resposta: string; acao: string }[] = [
  {
    id: "resumo",
    rotulo: "Gerar resumo",
    icone: FileText,
    acao: "Resumo gerado",
    resposta:
      "Resumo do capítulo: 1) Uma equação do 1º grau tem uma incógnita elevada a 1. 2) Para resolver, isole a incógnita usando operações inversas. 3) Com parênteses, distribua antes de isolar. 4) Em problemas, escreva a equação a partir do texto e confira a resposta.",
  },
  {
    id: "podcast",
    rotulo: "Gerar podcast",
    icone: Headphones,
    acao: "Podcast criado (4 min)",
    resposta: "Criei um podcast de 4 minutos sobre equações com parênteses, com exemplos falados passo a passo. Ele aparece em Minhas atividades quando o professor o indicar, e você pode ouvir agora na biblioteca.",
  },
  {
    id: "questoes",
    rotulo: "Criar questões",
    icone: ListChecks,
    acao: "Lista de 5 questões criada",
    resposta: "Criei uma lista de 5 questões sobre equações do 1º grau, no nível do capítulo. Cada questão mostra o comentário depois que você responde.",
  },
  {
    id: "revisar",
    rotulo: "Revisar conteúdo",
    icone: Layers,
    acao: "Cartões de revisão criados",
    resposta: "Montei 6 cartões de revisão com os conceitos do capítulo: incógnita, balança da equação, distribuição, termos semelhantes, conferência e problemas.",
  },
];

const HISTORICO = [
  "Como resolver equação com parênteses?",
  "Diferença entre fato e opinião",
  "O que é transformação química?",
];

export default function TiaAluno() {
  const [msgs, setMsgs] = useState<Mensagem[]>([
    { autor: "tia", texto: "Olá! Sou a TIA. Como posso ajudar você a aprender este conteúdo?" },
  ]);
  const [texto, setTexto] = useState("");
  const [pensando, setPensando] = useState(false);
  const fim = useRef<HTMLDivElement>(null);

  const adicionar = (m: Mensagem[], atraso = 700) => {
    setPensando(true);
    window.setTimeout(() => {
      setMsgs((a) => [...a, ...m]);
      setPensando(false);
      window.setTimeout(() => fim.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 50);
    }, atraso);
  };

  const enviar = (pergunta: string) => {
    const t = pergunta.trim();
    if (!t || pensando) return;
    setMsgs((a) => [...a, { autor: "aluno", texto: t }]);
    setTexto("");
    adicionar([responder(t)]);
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)]">
      <div className="flex min-h-[70vh] flex-col">
        <header className="mb-4">
          <h1 className="font-titulo text-2xl font-black text-ap-tinta md:text-3xl">Converse com a TIA</h1>
          <p className="mt-1 text-sm text-gray-600">Pergunte, explore e aprenda de diferentes maneiras.</p>
        </header>

        {/* Contexto do livro */}
        <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl bg-ap-fundo px-4 py-3 text-sm ring-1 ring-ap-lima">
          <span className="flex items-center gap-2 font-bold text-ap-escuro">
            <BookOpen aria-hidden className="h-4 w-4" />
            Livro do aluno · 8º ano
          </span>
          <span className="text-gray-700">
            Disciplina: <strong>{LIVRO_ATIVO.disciplina}</strong>
          </span>
          <span className="text-gray-700">
            Capítulo {cap.numero}: <strong>{cap.titulo}</strong>
          </span>
        </div>

        <div className={`${cartao} flex flex-1 flex-col`}>
          <div className="flex-1 space-y-4 overflow-y-auto" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.autor === "aluno" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.autor === "aluno" ? "bg-ap-escuro text-white" : m.semBase ? "bg-orange-50 text-orange-950 ring-1 ring-orange-200" : "bg-gray-100 text-gray-900"}`}>
                  {m.autor === "tia" && (
                    <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-ap-escuro">
                      <Sparkles aria-hidden className="h-3.5 w-3.5" />
                      TIA
                    </p>
                  )}
                  {m.acao && <p className="mb-1.5 inline-block rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-ap-escuro">{m.acao}</p>}
                  <p>{m.texto}</p>
                  {m.fontes && (
                    <div className="mt-3 border-t border-gray-300/60 pt-2">
                      <p className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                        <ShieldCheck aria-hidden className="h-3 w-3" />
                        Fontes didáticas usadas
                      </p>
                      <ul className="mt-1 text-xs text-gray-600">
                        {m.fontes.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {pensando && <p className="text-xs text-gray-400">A TIA está consultando o seu livro...</p>}
            <div ref={fim} />
          </div>

          <div className="mt-4 border-t border-gray-100 pt-4">
            <p className="mb-2 text-xs font-bold text-gray-500">Escolha como prefere estudar</p>
            <div className="mb-3 flex flex-wrap gap-2">
              {ACOES.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  disabled={pensando}
                  onClick={() => adicionar([{ autor: "tia", texto: a.resposta, fontes: [FONTE_CAP], acao: a.acao }], 900)}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-ap-lima bg-ap-fundo px-3.5 text-sm font-semibold text-ap-escuro hover:bg-ap-folha disabled:opacity-50"
                >
                  <a.icone aria-hidden className="h-4 w-4" />
                  {a.rotulo}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                enviar(texto);
              }}
              className="flex gap-2"
            >
              <label htmlFor="pergunta" className="sr-only">
                Sua pergunta
              </label>
              <input
                id="pergunta"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Ex.: como resolvo equação com parênteses?"
                className="min-h-[48px] min-w-0 flex-1 rounded-xl border border-gray-300 px-4 text-sm"
              />
              <button type="submit" disabled={!texto.trim() || pensando} className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-ap-escuro px-5 text-sm font-bold text-white disabled:opacity-50">
                <Send aria-hidden className="h-4 w-4" />
                Enviar pergunta
              </button>
            </form>
            <p className="mt-2 text-[11px] leading-snug text-gray-400">
              A TIA responde só com base nos materiais da Aprender desta plataforma. Quando o livro não traz a informação, ela avisa. Resposta simulada nesta demonstração.
            </p>
          </div>
        </div>
      </div>

      <aside className="flex flex-col gap-4">
        <section className={cartao} aria-labelledby="hist">
          <h2 id="hist" className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            <History aria-hidden className="h-4 w-4" />
            Consultar histórico
          </h2>
          <ul className="flex flex-col gap-1.5">
            {HISTORICO.map((h) => (
              <li key={h}>
                <button type="button" onClick={() => enviar(h)} className="flex w-full min-h-[40px] items-center gap-2 rounded-xl px-3 text-left text-sm text-gray-700 hover:bg-gray-50">
                  <RotateCcw aria-hidden className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  {h}
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-dashed border-gray-300 p-4 text-xs leading-relaxed text-gray-500">
          <p className="mb-1 font-bold text-gray-700">Teste a regra das fontes</p>
          Pergunte algo que não está no capítulo, como “quem ganhou a Copa de 2002?”. A TIA vai dizer que não encontrou no material, em vez de inventar.
        </section>
      </aside>
    </div>
  );
}
