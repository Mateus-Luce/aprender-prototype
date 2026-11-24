"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Edit3, RefreshCw, Send, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import { TURMAS, type TipoAtividade } from "@/lib/dados";
import { gravarNovaAtividade, useParametros } from "@/lib/store";
import { Secao, Selo, Titulo, botaoPrimario, botaoSecundario, cartao } from "@/components/ui";

function questoes(conteudo: string, variacao: number) {
  const parenteses = conteudo.toLowerCase().includes("par");
  return Array.from({ length: 10 }, (_, k) => {
    const a = 2 + ((k + variacao) % 4);
    const x = 3 + ((k * 2 + variacao) % 8);
    const b = 1 + ((k + variacao * 2) % 7);
    if (parenteses) {
      const c = a * (x + b);
      return { e: `Resolva a equação ${a}(x + ${b}) = ${c}.`, r: `x = ${x}` };
    }
    const c = a * x + b;
    return { e: `Resolva a equação ${a}x + ${b} = ${c}.`, r: `x = ${x}` };
  });
}

function Previa({ tipo, conteudo, variacao }: { tipo: TipoAtividade; conteudo: string; variacao: number }) {
  if (tipo === "Lista de questões") {
    const qs = questoes(conteudo, variacao);
    return (
      <ol className="flex flex-col gap-2">
        {qs.map((q, i) => (
          <li key={i} className="flex gap-3 rounded-xl bg-gray-50 px-4 py-2.5 text-sm">
            <span className="font-black text-ap-escuro">{i + 1}.</span>
            <span className="flex-1 text-gray-800">{q.e}</span>
            <span className="text-xs font-bold text-gray-500">Gabarito: {q.r}</span>
          </li>
        ))}
      </ol>
    );
  }
  if (tipo === "Podcast") {
    return (
      <div className="rounded-2xl bg-ap-fundo p-4 text-sm leading-relaxed text-gray-800">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ap-escuro">Roteiro · 4 min</p>
        <p>“Oi, pessoal! Hoje vamos falar de {conteudo.toLowerCase()}. Imagine uma balança em equilíbrio: tudo o que você coloca de um lado, precisa colocar do outro...”</p>
        <p className="mt-2">“Primeiro exemplo: 2(x + 3) = 14. Passo um, distribuir o 2. Passo dois, isolar o x. Passo três, conferir.”</p>
      </div>
    );
  }
  if (tipo === "Flashcards") {
    return (
      <ul className="grid gap-2 sm:grid-cols-2">
        {["O que é incógnita?", "Como desfazer uma soma?", `Primeiro passo em ${conteudo.toLowerCase()}`, "Como conferir a resposta?"].map((f) => (
          <li key={f} className="rounded-xl bg-ap-folha px-4 py-3 text-sm font-bold text-ap-tinta">
            {f}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="flex flex-col gap-2">
      {["O que é uma equação do 1º grau", "Operações inversas para isolar a incógnita", `Atenção a ${conteudo.toLowerCase()}`, "Conferência da resposta"].map((t) => (
        <li key={t} className="rounded-xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-800">
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function GerarComTia() {
  const p = useParametros();
  const turmaIds = (p.get("turma") ?? "8a").split(",").filter(Boolean);
  const conteudo = p.get("conteudo") ?? "Equações com parênteses";
  const tipo = (p.get("tipo") as TipoAtividade) ?? "Lista de questões";
  const prazo = p.get("prazo") ?? "5 dias";
  const nomesTurmas = turmaIds.map((id) => TURMAS.find((t) => t.id === id)?.nome ?? id).join(", ");

  const [instrucoes, setInstrucoes] = useState("");
  const [editando, setEditando] = useState(false);
  const [estado, setEstado] = useState<"inicio" | "gerando" | "pronto" | "aprovado" | "enviado">("inicio");
  const [variacao, setVariacao] = useState(0);

  useEffect(() => {
    setInstrucoes(p.get("obs") ?? "");
    // Link de demonstração: ?auto=1 abre a tela já com o material gerado.
    const auto = p.get("auto");
    if (auto === "1") setEstado("pronto");
    if (auto === "2") setEstado("aprovado");
  }, [p]);

  const gerar = () => {
    setEstado("gerando");
    window.setTimeout(() => setEstado("pronto"), 1400);
  };

  const enviar = () => {
    gravarNovaAtividade({
      nome: `${tipo === "Lista de questões" ? "Lista de reforço" : tipo}: ${conteudo.toLowerCase()}`,
      turma: nomesTurmas,
      tipo,
      disciplina: "Matemática",
      conteudo: "Cap. 2 · Equações do 1º grau",
      prazo: `Entrega em ${prazo}`,
      enviadaEm: Date.now(),
    });
    setEstado("enviado");
  };

  return (
    <div>
      <Titulo icone={Wand2} titulo="Gerador de atividades com a TIA" subtitulo="A TIA vai criar uma atividade com base no conteúdo selecionado. Revise o material antes de enviar aos alunos." />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <aside className="flex flex-col gap-4 lg:self-start">
          <div className={cartao}>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">Configuração</h2>
            <dl className="flex flex-col gap-2.5 text-sm">
              {[
                ["Material didático", "Livro do aluno · Matemática · 8º ano"],
                ["Capítulo", "Cap. 2 · Equações do 1º grau"],
                ["Conteúdo selecionado", conteudo],
                ["Tipo de atividade", tipo],
                ["Turmas", nomesTurmas],
                ["Prazo", prazo],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-semibold text-gray-500">{k}</dt>
                  <dd className="font-bold text-gray-900">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 border-t border-gray-100 pt-3">
              <p className="mb-1 text-xs font-bold text-gray-500">Instruções complementares</p>
              {editando ? (
                <textarea value={instrucoes} onChange={(e) => setInstrucoes(e.target.value)} rows={3} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" aria-label="Instruções complementares" />
              ) : (
                <p className="text-sm text-gray-700">{instrucoes || "Nenhuma."}</p>
              )}
              <button type="button" onClick={() => setEditando((e) => !e)} className="mt-2 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-bold text-ap-escuro hover:underline">
                <Edit3 aria-hidden className="h-4 w-4" />
                {editando ? "Salvar instruções" : "Editar instruções"}
              </button>
            </div>
            <Link href="/professor/criar" className="mt-2 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900">
              <ArrowLeft aria-hidden className="h-4 w-4" />
              Voltar à configuração
            </Link>
          </div>
          <p className="flex gap-2 rounded-xl bg-white px-3 py-2.5 text-xs leading-relaxed text-gray-600 ring-1 ring-gray-200">
            <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ap-medio" />A geração respeita as fontes didáticas autorizadas: a TIA usa só o conteúdo do livro vinculado.
          </p>
        </aside>

        <section className={cartao} aria-live="polite">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-titulo text-lg font-black text-ap-tinta">Pré-visualização</h2>
            {estado === "pronto" && <Selo tom="laranja">Aguardando sua aprovação</Selo>}
            {estado === "aprovado" && <Selo tom="verde">Aprovado</Selo>}
            {estado === "enviado" && <Selo tom="verde">Enviado</Selo>}
          </div>

          {estado === "inicio" && (
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-gray-50 px-6 py-12 text-center">
              <Sparkles aria-hidden className="h-8 w-8 text-ap-medio" />
              <p className="text-sm text-gray-600">Nada foi gerado ainda. Toque no botão para a TIA preparar a atividade.</p>
              <button type="button" onClick={gerar} className={botaoPrimario}>
                <Wand2 aria-hidden className="h-4 w-4" />
                Gerar atividade
              </button>
            </div>
          )}
          {estado === "gerando" && (
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-gray-50 px-6 py-12 text-center" role="status">
              <span className="h-8 w-8 animate-spin rounded-full border-4 border-ap-folha border-t-ap-escuro" />
              <p className="text-sm font-semibold text-gray-700">A TIA está lendo o capítulo e montando a atividade...</p>
            </div>
          )}
          {(estado === "pronto" || estado === "aprovado" || estado === "enviado") && (
            <>
              <Previa tipo={tipo} conteudo={conteudo} variacao={variacao} />
              <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                <ShieldCheck aria-hidden className="h-3.5 w-3.5" />
                Fonte: Livro do aluno · Matemática · 8º ano, Cap. 2, págs. 34 a 42. Conteúdo simulado nesta demonstração.
              </p>
            </>
          )}

          {estado === "pronto" && (
            <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
              <button type="button" onClick={() => setEstado("aprovado")} className={botaoPrimario}>
                <Check aria-hidden className="h-4 w-4" />
                Aprovar conteúdo
              </button>
              <button type="button" onClick={() => { setVariacao((v) => v + 1); setEstado("gerando"); window.setTimeout(() => setEstado("pronto"), 1000); }} className={botaoSecundario}>
                <RefreshCw aria-hidden className="h-4 w-4" />
                Gerar novamente
              </button>
            </div>
          )}

          {estado === "aprovado" && (
            <div className="mt-5 rounded-2xl bg-ap-fundo p-4">
              <p className="font-bold text-ap-tinta">Pronto para enviar</p>
              <p className="mt-0.5 text-sm text-gray-700">
                Os alunos de {nomesTurmas} receberão a atividade em sua página inicial, com prazo de {prazo}.
              </p>
              <button type="button" onClick={enviar} className={`${botaoPrimario} mt-3`}>
                <Send aria-hidden className="h-4 w-4" />
                Enviar aos alunos
              </button>
            </div>
          )}

          {estado === "enviado" && (
            <div className="mt-5 rounded-2xl bg-ap-fundo p-4" role="status">
              <p className="font-bold text-ap-tinta">Atividade enviada!</p>
              <p className="mt-0.5 text-sm text-gray-700">Agora acompanhe quem iniciou e quem concluiu. O resultado também atualiza o diagnóstico da turma.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href="/professor/acompanhamento" className={botaoPrimario}>
                  Acompanhar atividade
                </Link>
                <Link href="/aluno" className={botaoSecundario}>
                  Ver como o aluno recebe
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
