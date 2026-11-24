import Link from "next/link";
import { ArrowRight, Lightbulb, Info, type LucideIcon } from "lucide-react";

export const cartao = "rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-5";
export const botaoPrimario =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-ap-escuro px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#245510] disabled:cursor-not-allowed disabled:opacity-50";
export const botaoSecundario =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50";
export const campo =
  "min-h-[44px] rounded-xl border border-gray-300 bg-white px-3 text-sm font-medium text-gray-900";

export function Titulo({
  titulo,
  subtitulo,
  icone: Icone,
  acao,
}: {
  titulo: string;
  subtitulo?: string;
  icone?: LucideIcon;
  acao?: React.ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        {Icone && (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ap-folha">
            <Icone aria-hidden className="h-6 w-6 text-ap-escuro" />
          </span>
        )}
        <div>
          <h1 className="font-titulo text-2xl font-black text-ap-tinta md:text-3xl">{titulo}</h1>
          {subtitulo && <p className="mt-1 max-w-2xl text-sm text-gray-600">{subtitulo}</p>}
        </div>
      </div>
      {acao}
    </header>
  );
}

type Tom = "verde" | "azul" | "laranja" | "vermelho" | "cinza" | "roxo";
const TONS: Record<Tom, string> = {
  verde: "bg-green-50 text-green-800",
  azul: "bg-blue-50 text-blue-800",
  laranja: "bg-orange-50 text-orange-800",
  vermelho: "bg-red-50 text-red-800",
  cinza: "bg-gray-100 text-gray-700",
  roxo: "bg-violet-50 text-violet-800",
};

export function Selo({ tom = "cinza", children }: { tom?: Tom; children: React.ReactNode }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${TONS[tom]}`}>{children}</span>;
}

export function Kpi({
  rotulo,
  valor,
  detalhe,
  icone: Icone,
  destaque,
}: {
  rotulo: string;
  valor: string;
  detalhe?: string;
  icone?: LucideIcon;
  destaque?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${destaque ? "border-ap-escuro bg-ap-escuro text-white" : "border-gray-200 bg-white"}`}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <p className={`text-xs font-semibold ${destaque ? "text-green-100" : "text-gray-500"}`}>{rotulo}</p>
        {Icone && <Icone aria-hidden className={`h-4 w-4 ${destaque ? "text-green-200" : "text-ap-medio"}`} />}
      </div>
      <p className="font-titulo text-3xl font-black leading-tight">{valor}</p>
      {detalhe && <p className={`mt-0.5 text-xs ${destaque ? "text-green-100" : "text-gray-500"}`}>{detalhe}</p>}
    </div>
  );
}

export function GradeKpi({ children, colunas = 4 }: { children: React.ReactNode; colunas?: 2 | 3 | 4 | 5 }) {
  const c = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4", 5: "sm:grid-cols-3 lg:grid-cols-5" }[colunas];
  return <div className={`mb-6 grid grid-cols-1 gap-3 ${c}`}>{children}</div>;
}

export function Insight({
  titulo,
  children,
  href,
  acao,
  tipo = "dica",
}: {
  titulo: string;
  children: React.ReactNode;
  href?: string;
  acao?: string;
  tipo?: "dica" | "info" | "alerta";
}) {
  const Icone = tipo === "info" ? Info : Lightbulb;
  const cor = tipo === "alerta" ? "border-orange-200 bg-orange-50" : tipo === "info" ? "border-blue-100 bg-blue-50/70" : "border-ap-lima bg-ap-fundo";
  return (
    <div className={`mb-6 flex flex-wrap items-start gap-3 rounded-2xl border px-4 py-3.5 ${cor}`}>
      <Icone aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-ap-escuro" />
      <div className="min-w-0 flex-1 basis-[14rem]">
        <p className="text-sm font-bold text-ap-tinta">{titulo}</p>
        <div className="mt-0.5 text-sm leading-relaxed text-gray-700">{children}</div>
      </div>
      {href && acao && (
        <Link href={href} className={botaoPrimario}>
          {acao}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export function Secao({ titulo, descricao, children, acao }: { titulo: string; descricao?: string; children: React.ReactNode; acao?: React.ReactNode }) {
  return (
    <section className={`${cartao} mb-6`}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="font-titulo text-lg font-black text-ap-tinta">{titulo}</h2>
          {descricao && <p className="mt-0.5 text-xs text-gray-500">{descricao}</p>}
        </div>
        {acao}
      </div>
      {children}
    </section>
  );
}

export function Barra({ valor, cor = "#3f7d1c", altura = "h-2.5" }: { valor: number; cor?: string; altura?: string }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(valor)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`${altura} w-full overflow-hidden rounded-full bg-gray-100`}
    >
      <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${Math.min(100, Math.max(0, valor))}%`, background: cor }} />
    </div>
  );
}

/** Cor semafórica para uma taxa de acerto (não é nota do aluno, é leitura do conteúdo). */
export function corTaxa(t: number): string {
  return t >= 75 ? "#3f7d1c" : t >= 60 ? "#ca8a04" : "#c2410c";
}

export function Tabela({ colunas, children, rotulo }: { colunas: string[]; children: React.ReactNode; rotulo: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm [&_button]:whitespace-nowrap [&_a]:whitespace-nowrap">
        <caption className="sr-only">{rotulo}</caption>
        <thead>
          <tr className="border-b border-gray-200 text-xs font-bold uppercase tracking-wide text-gray-500">
            {colunas.map((c) => (
              <th key={c} scope="col" className="px-3 py-2.5 first:pl-0">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">{children}</tbody>
      </table>
    </div>
  );
}

export const td = "px-3 py-3 align-middle first:pl-0";

export function SemDadosSuficientes({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl bg-gray-50 px-4 py-3 text-xs leading-relaxed text-gray-600">
      <strong className="text-gray-800">Atenção à base de cálculo: </strong>
      {children}
    </p>
  );
}
