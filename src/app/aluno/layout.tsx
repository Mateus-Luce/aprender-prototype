import { Shell } from "@/components/shell";

export default function AlunoLayout({ children }: { children: React.ReactNode }) {
  return <Shell perfil="aluno">{children}</Shell>;
}
