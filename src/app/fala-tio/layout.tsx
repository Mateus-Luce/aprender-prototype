import { Shell } from "@/components/shell";
import { Info } from "lucide-react";

export default function FalaTioLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell perfil="falatio">
      <p className="mb-6 flex gap-2 rounded-xl bg-blue-50 px-4 py-3 text-xs leading-relaxed text-blue-900 ring-1 ring-blue-100">
        <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
        Camada administrativa interna do Fala Tio. Não faz parte do produto comercial da Aprender: a Aprender tem autonomia sobre a própria operação, e o Fala Tio mantém o controle técnico da infraestrutura.
      </p>
      {children}
    </Shell>
  );
}
