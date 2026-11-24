"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Headphones, Layers, ListChecks, FileText, PlusCircle, RefreshCw, Sparkles } from "lucide-react";
import { LIVROS, TURMAS, type TipoAtividade } from "@/lib/dados";
import { useParametros } from "@/lib/store";
import { Secao, Titulo, botaoPrimario, campo, cartao } from "@/components/ui";

const TIPOS: { id: TipoAtividade; desc: string; icon: typeof ListChecks }[] = [
  { id: "Lista de questões", desc: "Questões com correção automática", icon: ListChecks },
  { id: "Podcast", desc: "Episódio curto para ouvir", icon: Headphones },
  { id: "Resumo", desc: "Texto organizado em tópicos", icon: FileText },
  { id: "Flashcards", desc: "Cartões de revisão", icon: Layers },
  { id: "Revisão de conteúdo", desc: "Roteiro de revisão do capítulo", icon: RefreshCw },
  { id: "Atividade com a TIA", desc: "Conversa guiada com a TIA", icon: Sparkles },
];

const CONTEUDOS = LIVROS.find((l) => l.disciplina === "Matemática")!.capitulos.flatMap((c) =>
  c.assuntos.map((a) => ({ valor: a, capitulo: `Cap. ${c.numero} · ${c.titulo}` })),
);

export default function CriarAtividade() {
  const router = useRouter();
  const params = useParametros();
  const [turmas, setTurmas] = useState<string[]>(["8a"]);
  const [alunosEspecificos, setAlunosEspecificos] = useState(false);
  const [conteudo, setConteudo] = useState("Equações com parênteses");
  const [tipo, setTipo] = useState<TipoAtividade>("Lista de questões");
  const [prazo, setPrazo] = useState("5 dias");
  const [obs, setObs] = useState("");

  useEffect(() => {
    const t = params.get("turma");
    if (t && TURMAS.some((x) => x.id === t)) setTurmas([t]);
    const c = params.get("conteudo");
    if (c) setConteudo(c);
  }, [params]);

  const nomesTurmas = turmas.map((id) => TURMAS.find((t) => t.id === id)!.nome);
  const totalAlunos = turmas.reduce((s, id) => s + TURMAS.find((t) => t.id === id)!.alunos, 0);
  const capitulo = CONTEUDOS.find((c) => c.valor === conteudo)?.capitulo ?? "Cap. 2 · Equações do 1º grau";
  const pronto = turmas.length > 0;

  const continuar = () => {
    const q = new URLSearchParams({ turma: turmas.join(","), conteudo, tipo, prazo, obs });
    router.push(`/professor/gerar?${q.toString()}`);
  };

  return (
    <div>
      <Titulo icone={PlusCircle} titulo="O que você gostaria de preparar para sua turma?" subtitulo="Escolha para quem, sobre qual conteúdo do livro e em que formato. A TIA monta o material e você revisa antes de enviar." />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
        <div>
          <Secao titulo="1. Para quem">
            <div className="flex flex-wrap gap-2">
              {TURMAS.map((t) => {
                const on = turmas.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setTurmas((a) => (on ? a.filter((x) => x !== t.id) : [...a, t.id]))}
                    className={`min-h-[44px] rounded-xl border px-4 text-sm font-bold ${on ? "border-ap-escuro bg-ap-fundo text-ap-escuro" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`}
                  >
                    {t.nome} <span className="font-medium text-gray-500">({t.alunos})</span>
                  </button>
                );
              })}
            </div>
            <label className="mt-3 flex min-h-[40px] items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={alunosEspecificos} onChange={(e) => setAlunosEspecificos(e.target.checked)} className="h-4 w-4 accent-[#3f7d1c]" />
              Enviar só para alunos específicos
            </label>
            {alunosEspecificos && <p className="mt-1 rounded-xl bg-gray-50 px-3 py-2 text-xs text-gray-600">Você escolherá os alunos na próxima etapa (selecionar alunos). Nesta demonstração, a atividade vai para toda a turma.</p>}
          </Secao>

          <Secao titulo="2. Disciplina e conteúdo do livro">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
                Disciplina
                <select className={campo} defaultValue="Matemática">
                  <option>Matemática</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
                Conteúdo do material didático
                <select className={campo} value={conteudo} onChange={(e) => setConteudo(e.target.value)}>
                  {CONTEUDOS.map((c) => (
                    <option key={c.valor} value={c.valor}>
                      {c.valor} — {c.capitulo}
                    </option>
                  ))}
                  {!CONTEUDOS.some((c) => c.valor === conteudo) && <option value={conteudo}>{conteudo}</option>}
                </select>
              </label>
            </div>
            <p className="mt-2 text-xs text-gray-500">Você só vê as disciplinas e livros vinculados às suas turmas.</p>
          </Secao>

          <Secao titulo="3. Tipo de atividade">
            <div role="radiogroup" aria-label="Tipo de atividade" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {TIPOS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={tipo === t.id}
                  onClick={() => setTipo(t.id)}
                  className={`flex min-h-[72px] items-start gap-3 rounded-xl border p-3 text-left ${tipo === t.id ? "border-ap-escuro bg-ap-fundo" : "border-gray-300 bg-white hover:bg-gray-50"}`}
                >
                  <t.icon aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-ap-medio" />
                  <span>
                    <span className="block text-sm font-bold text-gray-900">{t.id}</span>
                    <span className="block text-xs text-gray-500">{t.desc}</span>
                  </span>
                </button>
              ))}
            </div>
          </Secao>

          <Secao titulo="4. Prazo e orientação">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
                Prazo de conclusão
                <select className={campo} value={prazo} onChange={(e) => setPrazo(e.target.value)}>
                  <option>3 dias</option>
                  <option>5 dias</option>
                  <option>7 dias</option>
                  <option>14 dias</option>
                </select>
              </label>
            </div>
            <label className="mt-3 flex flex-col gap-1 text-xs font-bold text-gray-600">
              Orientação complementar (opcional)
              <textarea value={obs} onChange={(e) => setObs(e.target.value)} rows={3} placeholder="Ex.: foque em problemas do cotidiano e peça que os alunos mostrem a conferência." className="rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900" />
            </label>
          </Secao>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className={cartao}>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">Resumo antes de gerar</h2>
            <dl className="flex flex-col gap-2.5 text-sm">
              {[
                ["Destinatários", `${nomesTurmas.join(", ") || "nenhuma turma"} · ${totalAlunos} alunos`],
                ["Disciplina", "Matemática"],
                ["Conteúdo", `${conteudo} (${capitulo})`],
                ["Tipo", tipo],
                ["Prazo", prazo],
                ["Orientação", obs || "—"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-semibold text-gray-500">{k}</dt>
                  <dd className="font-bold text-gray-900">{v}</dd>
                </div>
              ))}
            </dl>
            <button type="button" disabled={!pronto} onClick={continuar} className={`${botaoPrimario} mt-5 w-full`}>
              Gerar atividade
              <ArrowRight aria-hidden className="h-4 w-4" />
            </button>
            <p className="mt-2 text-[11px] text-gray-500">Nada é enviado aos alunos agora. Você revisa e aprova primeiro.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
