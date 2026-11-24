"use client";

import Link from "next/link";
import { BarChart3, BookOpen, Clock, Flame, LibraryBig, ListChecks, Play, Sparkles, Star, Wrench } from "lucide-react";
import { ALUNO, ATIVIDADES_ALUNO, COR_DISCIPLINA, DESEMPENHO_ALUNO, LIVRO_ATIVO } from "@/lib/dados";
import { paraAtividadeAluno, useNovaAtividade } from "@/lib/store";
import { AnelProgresso } from "@/components/graficos";
import { Barra, Selo, botaoPrimario, cartao } from "@/components/ui";

export default function HomeAluno() {
  const nova = useNovaAtividade();
  const atividades = nova ? [paraAtividadeAluno(nova), ...ATIVIDADES_ALUNO] : ATIVIDADES_ALUNO;
  const aguardando = atividades.filter((a) => a.status !== "Concluída");
  const pendentes = aguardando.slice(0, 3);
  const cap = LIVRO_ATIVO.capitulo;
  const pctXp = Math.round((ALUNO.xp / ALUNO.xpProximo) * 100);

  return (
    <div>
      {/* Saudação */}
      <section className="mb-6 overflow-hidden rounded-3xl bg-ap-escuro p-6 text-white md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-green-100">
              {ALUNO.serie.replace(" do Ensino Fundamental", "")} · {ALUNO.turma.replace("8º ano ", "turma ")} · {ALUNO.escola}
            </p>
            <h1 className="mt-1 font-titulo text-3xl font-black leading-tight md:text-4xl">Olá, {ALUNO.nome}! O que vamos estudar hoje?</h1>
            <p className="mt-2 text-green-100">
              Você tem <strong className="text-white">{aguardando.length} atividades</strong> aguardando conclusão.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-2xl bg-white/10 px-4 py-3 text-center">
              <Flame aria-hidden className="mx-auto h-6 w-6 text-orange-300" />
              <p className="font-titulo text-2xl font-black leading-none">{ALUNO.sequencia}</p>
              <p className="text-[11px] text-green-100">dias seguidos</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 text-center">
              <Star aria-hidden className="mx-auto h-6 w-6 text-yellow-300" />
              <p className="font-titulo text-2xl font-black leading-none">Nível {ALUNO.nivel}</p>
              <p className="text-[11px] text-green-100">{ALUNO.xp} XP</p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="mb-1 flex justify-between text-xs text-green-100">
            <span>Próximo nível</span>
            <span>
              {ALUNO.xp} / {ALUNO.xpProximo} XP
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/20" role="progressbar" aria-valuenow={pctXp} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso para o próximo nível">
            <div className="h-full rounded-full bg-ap-lima" style={{ width: `${pctXp}%` }} />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-6">
          {/* Livro ativo + continuar */}
          <section aria-labelledby="livro-ativo" className={cartao}>
            <p id="livro-ativo" className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
              Seu livro ativo
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <AnelProgresso valor={cap.progresso} tamanho={96} rotulo={`Progresso do capítulo: ${cap.progresso}%`} cor={COR_DISCIPLINA[LIVRO_ATIVO.disciplina]} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold" style={{ color: COR_DISCIPLINA[LIVRO_ATIVO.disciplina] }}>
                  {LIVRO_ATIVO.disciplina} · 8º ano
                </p>
                <p className="font-titulo text-xl font-black text-ap-tinta">
                  Cap. {cap.numero} · {cap.titulo}
                </p>
                <p className="text-sm text-gray-500">Continue de onde você parou: {cap.assuntos[1]}.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link href="/aluno/biblioteca" className={botaoPrimario}>
                    <Play aria-hidden className="h-4 w-4" />
                    Continuar estudando
                  </Link>
                  <Link
                    href="/aluno/tia"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-ap-folha px-4 text-sm font-bold text-ap-escuro hover:bg-ap-lima"
                  >
                    <Sparkles aria-hidden className="h-4 w-4" />
                    Acessar a TIA
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Atividades */}
          <section aria-labelledby="pend" className={cartao}>
            <div className="mb-3 flex items-center justify-between">
              <h2 id="pend" className="font-titulo text-lg font-black text-ap-tinta">
                Atividades dos professores
              </h2>
              <Link href="/aluno/atividades" className="text-sm font-bold text-ap-escuro hover:underline">
                Ver minhas atividades
              </Link>
            </div>
            <ul className="flex flex-col gap-2">
              {pendentes.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/aluno/atividades/${a.id}`}
                    className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 transition-colors hover:bg-ap-fundo"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: COR_DISCIPLINA[a.disciplina] }}>
                      <ListChecks aria-hidden className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-sm font-bold text-gray-900">{a.nome}</span>
                        {a.id === "nova" && <Selo tom="laranja">Nova</Selo>}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock aria-hidden className="h-3 w-3" />
                        {a.prazo} · {a.professor}
                      </span>
                      {a.progresso > 0 && <Barra valor={a.progresso} altura="mt-1.5 h-1.5" />}
                    </span>
                    <Selo tom={a.status === "Em andamento" ? "azul" : "laranja"}>{a.status}</Selo>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          {/* Atalhos */}
          <section aria-labelledby="atalhos" className={cartao}>
            <h2 id="atalhos" className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
              Atalhos
            </h2>
            <ul className="grid grid-cols-2 gap-2">
              {[
                { href: "/aluno/biblioteca", label: "Acessar materiais", icon: LibraryBig },
                { href: "/aluno/tia", label: "Ferramentas da TIA", icon: Wrench },
                { href: "/aluno/atividades", label: "Minhas atividades", icon: ListChecks },
                { href: "/aluno/desempenho", label: "Meu desempenho", icon: BarChart3 },
              ].map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    className="flex min-h-[84px] flex-col items-start justify-between gap-2 rounded-2xl bg-ap-fundo p-3.5 text-sm font-bold text-ap-escuro hover:bg-ap-folha"
                  >
                    <a.icon aria-hidden className="h-5 w-5" />
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Progresso */}
          <section aria-labelledby="prog" className={cartao}>
            <h2 id="prog" className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
              Seu progresso
            </h2>
            <div className="flex items-center gap-4">
              <AnelProgresso valor={DESEMPENHO_ALUNO.conclusao} tamanho={88} rotulo={`Atividades concluídas: ${DESEMPENHO_ALUNO.conclusao}%`} />
              <div>
                <p className="text-sm font-bold text-gray-900">{DESEMPENHO_ALUNO.atividades} atividades feitas</p>
                <p className="text-xs text-gray-500">Você acertou {DESEMPENHO_ALUNO.acertos} questões. Continue assim!</p>
                <Link href="/aluno/desempenho" className="mt-1 inline-block text-sm font-bold text-ap-escuro hover:underline">
                  Ver meu desempenho
                </Link>
              </div>
            </div>
          </section>

          {/* Últimos estudos */}
          <section aria-labelledby="ult" className={cartao}>
            <h2 id="ult" className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
              Continue de onde você parou
            </h2>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                { t: "Matemática · Equações com parênteses", q: "há 1 dia" },
                { t: "Língua Portuguesa · Interpretação de textos", q: "há 3 dias" },
                { t: "Ciências · Misturas e transformações", q: "há 5 dias" },
              ].map((u) => (
                <li key={u.t} className="flex items-center gap-3">
                  <BookOpen aria-hidden className="h-4 w-4 shrink-0 text-ap-medio" />
                  <span className="min-w-0 flex-1 truncate text-gray-800">{u.t}</span>
                  <span className="shrink-0 text-xs text-gray-400">{u.q}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
