import {
  Activity,
  BarChart3,
  BookOpen,
  Bot,
  Building2,
  ClipboardList,
  Cpu,
  FileText,
  GraduationCap,
  HeartPulse,
  Home,
  LayoutDashboard,
  LibraryBig,
  LifeBuoy,
  ListChecks,
  MapPinned,
  Plug,
  Settings,
  Sparkles,
  Trophy,
  Users,
  UsersRound,
  School,
  ScanLine,
  LineChart,
  PlusCircle,
  Wand2,
  Eye,
  type LucideIcon,
} from "lucide-react";

export type PerfilId = "aluno" | "professor" | "escola" | "municipio" | "aprender" | "falatio";

export interface ItemNav {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface Perfil {
  id: PerfilId;
  nome: string;
  usuario: string;
  papel: string;
  descricao: string;
  base: string;
  icon: LucideIcon;
  nav: ItemNav[];
  /** Cor de apoio do cartão do perfil. */
  cor: string;
}

export const PERFIS: Perfil[] = [
  {
    id: "aluno",
    nome: "Aluno",
    usuario: "Ana Beatriz",
    papel: "8º ano A · E.M. Prof.ª Aurora Lima",
    descricao: "Estuda pelo livro, conversa com a TIA, faz atividades e acompanha o próprio progresso.",
    base: "/aluno",
    icon: GraduationCap,
    cor: "#81bc44",
    nav: [
      { href: "/aluno", label: "Início", icon: Home },
      { href: "/aluno/tia", label: "TIA", icon: Sparkles },
      { href: "/aluno/biblioteca", label: "Materiais", icon: LibraryBig },
      { href: "/aluno/atividades", label: "Atividades", icon: ListChecks },
      { href: "/aluno/desempenho", label: "Desempenho", icon: Trophy },
    ],
  },
  {
    id: "professor",
    nome: "Professor",
    usuario: "Carlos Mendes",
    papel: "Professor de Matemática",
    descricao: "Acompanha as turmas, identifica dificuldades e pede atividades à TIA para reforçar o conteúdo.",
    base: "/professor",
    icon: Users,
    cor: "#bbd152",
    nav: [
      { href: "/professor", label: "Início", icon: Home },
      { href: "/professor/turmas", label: "Minhas turmas", icon: UsersRound },
      { href: "/professor/diagnostico", label: "Diagnóstico da turma", icon: HeartPulse },
      { href: "/professor/engajamento", label: "Mapa de engajamento", icon: Activity },
      { href: "/professor/alunos/8a-3", label: "Perfil do aluno", icon: Eye },
      { href: "/professor/criar", label: "Criar atividade", icon: PlusCircle },
      { href: "/professor/gerar", label: "Gerar com a TIA", icon: Wand2 },
      { href: "/professor/acompanhamento", label: "Acompanhamento", icon: ClipboardList },
      { href: "/professor/relatorio", label: "Relatório da atividade", icon: FileText },
    ],
  },
  {
    id: "escola",
    nome: "Gestor escolar",
    usuario: "Helena Prado",
    papel: "Diretora · E.M. Prof.ª Aurora Lima",
    descricao: "Enxerga o engajamento e os indicadores pedagógicos da escola e age antes que afete os resultados.",
    base: "/escola",
    icon: School,
    cor: "#cde2b5",
    nav: [
      { href: "/escola", label: "Dashboard da escola", icon: LayoutDashboard },
      { href: "/escola/turmas", label: "Gestão de turmas", icon: UsersRound },
      { href: "/escola/professores", label: "Gestão de professores", icon: Users },
      { href: "/escola/relatorios", label: "Relatórios pedagógicos", icon: FileText },
    ],
  },
  {
    id: "municipio",
    nome: "Gestor municipal",
    usuario: "Roberto Alves",
    papel: "Secretário municipal · Vale do Sol",
    descricao: "Vê a rede inteira de uma vez, compara escolas e identifica onde intervir, sem expor alunos.",
    base: "/municipio",
    icon: Building2,
    cor: "#bbd152",
    nav: [
      { href: "/municipio", label: "Dashboard municipal", icon: LayoutDashboard },
      { href: "/municipio/escolas", label: "Comparativo de escolas", icon: BarChart3 },
      { href: "/municipio/diagnostico", label: "Diagnóstico da rede", icon: HeartPulse },
      { href: "/municipio/relatorios", label: "Relatórios", icon: FileText },
    ],
  },
  {
    id: "aprender",
    nome: "Administrador Aprender",
    usuario: "Equipe de Implantação",
    papel: "Administração Aprender",
    descricao: "Acompanha a implantação, a adesão e o uso da plataforma em todos os municípios atendidos.",
    base: "/aprender",
    icon: BookOpen,
    cor: "#81bc44",
    nav: [
      { href: "/aprender", label: "Visão geral", icon: LayoutDashboard },
      { href: "/aprender/municipios", label: "Municípios", icon: MapPinned },
      { href: "/aprender/escolas", label: "Escolas", icon: School },
      { href: "/aprender/analytics", label: "Analytics de utilização", icon: LineChart },
      { href: "/aprender/pedagogico", label: "Indicadores pedagógicos", icon: HeartPulse },
      { href: "/aprender/administracao", label: "Administração", icon: Settings },
    ],
  },
  {
    id: "falatio",
    nome: "Administrador Fala Tio",
    usuario: "Equipe Fala Tio",
    papel: "Infraestrutura, IA e suporte",
    descricao: "Camada técnica interna: materiais da TIA, IA, integrações, suporte e infraestrutura.",
    base: "/fala-tio",
    icon: Cpu,
    cor: "#a8b6ff",
    nav: [
      { href: "/fala-tio", label: "Indicadores operacionais", icon: Activity },
      { href: "/fala-tio/organizacoes", label: "Organizações", icon: Building2 },
      { href: "/fala-tio/materiais", label: "Materiais", icon: BookOpen },
      { href: "/fala-tio/ia", label: "Inteligência artificial", icon: Bot },
      { href: "/fala-tio/integracoes", label: "Integrações", icon: Plug },
      { href: "/fala-tio/suporte", label: "Suporte e auditoria", icon: LifeBuoy },
    ],
  },
];

export function getPerfil(id: PerfilId): Perfil {
  return PERFIS.find((p) => p.id === id)!;
}

export { ScanLine };
