"use client";

import { useState } from "react";

/** Linha com pontos clicáveis: passe o mouse (ou toque) em um ponto para ver o valor. */
export function LinhaInterativa({
  pontos,
  sufixo = "%",
  cor = "#3f7d1c",
  min,
  max,
  rotulo,
}: {
  pontos: { rotulo: string; valor: number }[];
  sufixo?: string;
  cor?: string;
  min?: number;
  max?: number;
  rotulo: string;
}) {
  const [ativo, setAtivo] = useState<number>(pontos.length - 1);
  const W = 460;
  const H = 190;
  const m = { t: 24, r: 20, b: 30, l: 40 };
  const iw = W - m.l - m.r;
  const ih = H - m.t - m.b;
  const vals = pontos.map((p) => p.valor);
  const lo = min ?? Math.floor(Math.min(...vals) * 0.85);
  const hi = max ?? Math.ceil(Math.max(...vals) * 1.08);
  const x = (i: number) => m.l + (i / Math.max(1, pontos.length - 1)) * iw;
  const y = (v: number) => m.t + ((hi - v) / (hi - lo || 1)) * ih;
  const area = `${m.l},${m.t + ih} ${pontos.map((p, i) => `${x(i)},${y(p.valor)}`).join(" ")} ${x(pontos.length - 1)},${m.t + ih}`;
  const ticks = [lo, Math.round((lo + hi) / 2), hi];
  const fmt = (v: number) => (v >= 1000 ? v.toLocaleString("pt-BR") : String(v));
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`${rotulo}. ${pontos.map((p) => `${p.rotulo}: ${fmt(p.valor)}${sufixo}`).join("; ")}`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} stroke="#e5e7eb" />
            <text x={m.l - 6} y={y(t) + 4} textAnchor="end" fontSize="10" fill="#9ca3af">
              {fmt(t)}
            </text>
          </g>
        ))}
        <polygon points={area} fill={cor} opacity="0.08" />
        <polyline points={pontos.map((p, i) => `${x(i)},${y(p.valor)}`).join(" ")} fill="none" stroke={cor} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {pontos.map((p, i) => (
          <g key={p.rotulo} onMouseEnter={() => setAtivo(i)} onClick={() => setAtivo(i)} style={{ cursor: "pointer" }}>
            <circle cx={x(i)} cy={y(p.valor)} r="14" fill="transparent" />
            <circle cx={x(i)} cy={y(p.valor)} r={ativo === i ? 6 : 4} fill={ativo === i ? "#FF6428" : "#fff"} stroke={ativo === i ? "#fff" : cor} strokeWidth="2.5" />
            <text x={x(i)} y={H - 10} textAnchor="middle" fontSize="10" fill="#6b7280">
              {p.rotulo}
            </text>
          </g>
        ))}
        <text x={x(ativo)} y={y(pontos[ativo].valor) - 12} textAnchor="middle" fontSize="12" fontWeight="800" fill="#1d1d1b">
          {fmt(pontos[ativo].valor)}
          {sufixo}
        </text>
      </svg>
    </div>
  );
}

export interface ItemBarra {
  nome: string;
  valor: number;
  detalhe?: string;
  cor?: string;
}

/** Barras horizontais: passe o mouse para destacar e ler o detalhe. */
export function BarrasInterativas({
  itens,
  sufixo = "%",
  max = 100,
  cor = "#3f7d1c",
  mostrarDetalhe = true,
}: {
  itens: ItemBarra[];
  sufixo?: string;
  max?: number;
  cor?: string;
  mostrarDetalhe?: boolean;
}) {
  const [ativo, setAtivo] = useState<number | null>(null);
  return (
    <ul className="flex flex-col gap-3" onMouseLeave={() => setAtivo(null)}>
      {itens.map((i, idx) => {
        const dim = ativo !== null && ativo !== idx;
        return (
          <li key={i.nome} onMouseEnter={() => setAtivo(idx)} className={`transition-opacity ${dim ? "opacity-40" : ""}`}>
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <p className="min-w-0 truncate text-sm font-semibold text-gray-900">{i.nome}</p>
              <p className="shrink-0 text-sm font-black text-gray-900">
                {i.valor.toLocaleString("pt-BR")}
                {sufixo}
              </p>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${Math.min(100, (i.valor / max) * 100)}%`, background: i.cor ?? cor }} />
            </div>
            {mostrarDetalhe && i.detalhe && <p className="mt-0.5 text-xs text-gray-500">{i.detalhe}</p>}
          </li>
        );
      })}
    </ul>
  );
}

export interface ParteRosca {
  nome: string;
  valor: number;
  cor: string;
}

/** Rosca com legenda; passe o mouse em uma fatia para ver a porcentagem. */
export function Rosca({ partes, centro, subcentro }: { partes: ParteRosca[]; centro?: string; subcentro?: string }) {
  const [ativo, setAtivo] = useState<number | null>(null);
  const total = partes.reduce((s, p) => s + p.valor, 0) || 1;
  const r = 52;
  const c = 2 * Math.PI * r;
  let acumulado = 0;
  return (
    <div className="flex flex-wrap items-center gap-5">
      <div className="relative h-36 w-36 shrink-0">
        <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" role="img" aria-label={partes.map((p) => `${p.nome}: ${p.valor}`).join("; ")}>
          <circle cx="64" cy="64" r={r} fill="none" stroke="#f3f4f6" strokeWidth="16" />
          {partes.map((p, i) => {
            const len = (p.valor / total) * c;
            const off = -acumulado;
            acumulado += len;
            return (
              <circle
                key={p.nome}
                cx="64"
                cy="64"
                r={r}
                fill="none"
                stroke={p.cor}
                strokeWidth={ativo === i ? 20 : 16}
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={off}
                onMouseEnter={() => setAtivo(i)}
                onMouseLeave={() => setAtivo(null)}
                style={{ transition: "stroke-width .15s" }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-titulo text-2xl font-black leading-none text-ap-tinta">
            {ativo !== null ? `${Math.round((partes[ativo].valor / total) * 100)}%` : centro}
          </span>
          <span className="mt-0.5 max-w-[80px] text-[10px] leading-tight text-gray-500">{ativo !== null ? partes[ativo].nome : subcentro}</span>
        </div>
      </div>
      <ul className="flex min-w-0 flex-1 flex-col gap-1.5 text-sm">
        {partes.map((p, i) => (
          <li key={p.nome} className="flex items-center justify-between gap-2" onMouseEnter={() => setAtivo(i)} onMouseLeave={() => setAtivo(null)}>
            <span className="flex items-center gap-2 text-gray-700">
              <span className="h-3 w-3 rounded-full" style={{ background: p.cor }} />
              {p.nome}
            </span>
            <span className="font-bold text-gray-900">{p.valor.toLocaleString("pt-BR")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AnelProgresso({ valor, tamanho = 120, rotulo, cor = "#3f7d1c", children }: { valor: number; tamanho?: number; rotulo: string; cor?: string; children?: React.ReactNode }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: tamanho, height: tamanho }}>
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" role="img" aria-label={rotulo}>
        <circle cx="64" cy="64" r={r} fill="none" stroke="#e5e7eb" strokeWidth="12" />
        <circle cx="64" cy="64" r={r} fill="none" stroke={cor} strokeWidth="12" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(100, valor) / 100)} className="transition-[stroke-dashoffset] duration-700" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children ?? <span className="font-titulo text-2xl font-black text-ap-tinta">{valor}%</span>}</div>
    </div>
  );
}
