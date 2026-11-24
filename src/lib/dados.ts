/**
 * Dados DEMONSTRATIVOS do protótipo Aprender + Fala Tio.
 * Tudo aqui é fictício: nomes de pessoas, escolas, municípios e números.
 * Nada foi coletado de alunos ou redes reais, e nenhuma integração está funcionando de verdade.
 */

export const DISCIPLINAS = ["Língua Portuguesa", "Matemática", "Ciências", "História", "Geografia"] as const;
export type Disciplina = (typeof DISCIPLINAS)[number];

export const COR_DISCIPLINA: Record<Disciplina, string> = {
  "Língua Portuguesa": "#c2410c",
  Matemática: "#2f6a14",
  Ciências: "#0e7490",
  História: "#7c3aed",
  Geografia: "#b45309",
};

// ------------------------------------------------------------------ pessoas

export const ALUNO = {
  nome: "Ana Beatriz",
  nomeCompleto: "Ana Beatriz Souza",
  turma: "8º ano A",
  serie: "8º ano do Ensino Fundamental",
  escola: "E.M. Prof.ª Aurora Lima",
  municipio: "Vale do Sol",
  nivel: 7,
  xp: 1340,
  xpProximo: 1500,
  sequencia: 6,
};

export const PROFESSOR = {
  nome: "Carlos Mendes",
  disciplina: "Matemática" as Disciplina,
  escola: "E.M. Prof.ª Aurora Lima",
};

export const GESTOR_ESCOLAR = { nome: "Helena Prado", cargo: "Diretora", escola: "E.M. Prof.ª Aurora Lima" };
export const GESTOR_MUNICIPAL = { nome: "Roberto Alves", cargo: "Secretário municipal de Educação", municipio: "Vale do Sol" };
export const ADMIN_APRENDER = { nome: "Equipe de Implantação", cargo: "Administração Aprender" };
export const ADMIN_FALATIO = { nome: "Equipe Fala Tio", cargo: "Infraestrutura e IA" };

// ----------------------------------------------------------------- biblioteca

export interface Capitulo {
  id: string;
  numero: number;
  titulo: string;
  unidade: string;
  assuntos: string[];
  /** 0 a 100 */
  progresso: number;
  /** QR Code impresso no livro neste capítulo */
  qr: string;
}

export interface Livro {
  disciplina: Disciplina;
  titulo: string;
  capitulos: Capitulo[];
}

function cap(d: string, n: number, unidade: string, titulo: string, assuntos: string[], progresso: number): Capitulo {
  return { id: `${d}-${n}`, numero: n, titulo, unidade, assuntos, progresso, qr: `QR-${d.toUpperCase().slice(0, 3)}-C${n}` };
}

export const LIVROS: Livro[] = [
  {
    disciplina: "Língua Portuguesa",
    titulo: "Livro do aluno · Língua Portuguesa · 8º ano",
    capitulos: [
      cap("lp", 1, "Unidade 1 · Ler e interpretar", "Gêneros jornalísticos", ["Notícia", "Reportagem", "Fato e opinião"], 100),
      cap("lp", 2, "Unidade 1 · Ler e interpretar", "Interpretação de textos", ["Inferência", "Tema e ideia central", "Linguagem figurada"], 65),
      cap("lp", 3, "Unidade 2 · Língua em uso", "Classes de palavras", ["Verbos", "Advérbios", "Conjunções"], 20),
      cap("lp", 4, "Unidade 2 · Língua em uso", "Variação linguística", ["Registro formal e informal", "Regionalismos"], 0),
    ],
  },
  {
    disciplina: "Matemática",
    titulo: "Livro do aluno · Matemática · 8º ano",
    capitulos: [
      cap("mat", 1, "Unidade 1 · Números", "Potências e raízes", ["Potências de base 10", "Raiz quadrada", "Notação científica"], 100),
      cap("mat", 2, "Unidade 1 · Álgebra", "Equações do 1º grau", ["Resolver equações", "Equações com parênteses", "Problemas com equações"], 55),
      cap("mat", 3, "Unidade 2 · Proporção", "Proporcionalidade", ["Razão e proporção", "Regra de três", "Porcentagem"], 30),
      cap("mat", 4, "Unidade 3 · Geometria", "Triângulos", ["Ângulos internos", "Congruência", "Teorema de Pitágoras"], 0),
    ],
  },
  {
    disciplina: "Ciências",
    titulo: "Livro do aluno · Ciências · 8º ano",
    capitulos: [
      cap("cie", 1, "Unidade 1 · Matéria e energia", "Misturas e transformações", ["Misturas", "Separação de misturas", "Transformações químicas"], 80),
      cap("cie", 2, "Unidade 1 · Matéria e energia", "Energia e eletricidade", ["Fontes de energia", "Circuitos simples"], 40),
      cap("cie", 3, "Unidade 2 · Vida e evolução", "Reprodução e sexualidade", ["Sistema reprodutor", "Saúde e prevenção"], 0),
      cap("cie", 4, "Unidade 3 · Terra e Universo", "Clima e atmosfera", ["Camadas da atmosfera", "Efeito estufa"], 0),
    ],
  },
  {
    disciplina: "História",
    titulo: "Livro do aluno · História · 8º ano",
    capitulos: [
      cap("his", 1, "Unidade 1 · Revoluções", "Revolução Industrial", ["Origens", "Trabalho nas fábricas"], 90),
      cap("his", 2, "Unidade 1 · Revoluções", "Iluminismo e revoluções", ["Ideias iluministas", "Independência dos EUA"], 25),
      cap("his", 3, "Unidade 2 · Brasil Império", "Brasil no século XIX", ["Primeiro Reinado", "Período regencial"], 0),
    ],
  },
  {
    disciplina: "Geografia",
    titulo: "Livro do aluno · Geografia · 8º ano",
    capitulos: [
      cap("geo", 1, "Unidade 1 · Mundo", "Continente americano", ["Regionalização", "Economia da América"], 70),
      cap("geo", 2, "Unidade 2 · Território", "População e migrações", ["Migrações", "Urbanização"], 10),
      cap("geo", 3, "Unidade 3 · Sociedade", "Globalização", ["Redes e fluxos", "Comércio mundial"], 0),
    ],
  },
];

export const LIVRO_ATIVO = {
  disciplina: "Matemática" as Disciplina,
  capitulo: LIVROS[1].capitulos[1],
};

// ----------------------------------------------------------------- atividades

export type TipoAtividade =
  | "Lista de questões"
  | "Podcast"
  | "Resumo"
  | "Flashcards"
  | "Revisão de conteúdo"
  | "Atividade com a TIA";
export type StatusAtividade = "Pendente" | "Em andamento" | "Concluída";

export interface AtividadeAluno {
  id: string;
  nome: string;
  disciplina: Disciplina;
  conteudo: string;
  professor: string;
  tipo: TipoAtividade;
  prazo: string;
  status: StatusAtividade;
  progresso: number;
  resultado?: string;
}

export const ATIVIDADES_ALUNO: AtividadeAluno[] = [
  { id: "a1", nome: "Lista de reforço: equações do 1º grau", disciplina: "Matemática", conteudo: "Cap. 2 · Equações do 1º grau", professor: "Carlos Mendes", tipo: "Lista de questões", prazo: "Entrega em 3 dias", status: "Pendente", progresso: 0 },
  { id: "a2", nome: "Podcast de revisão: equações com parênteses", disciplina: "Matemática", conteudo: "Cap. 2 · Equações do 1º grau", professor: "Carlos Mendes", tipo: "Podcast", prazo: "Entrega em 5 dias", status: "Em andamento", progresso: 45 },
  { id: "a3", nome: "Resumo: interpretação de textos", disciplina: "Língua Portuguesa", conteudo: "Cap. 2 · Interpretação de textos", professor: "Marta Ribeiro", tipo: "Resumo", prazo: "Entrega em 6 dias", status: "Pendente", progresso: 0 },
  { id: "a4", nome: "Flashcards: misturas e transformações", disciplina: "Ciências", conteudo: "Cap. 1 · Misturas e transformações", professor: "Paulo Vieira", tipo: "Flashcards", prazo: "Entrega em 8 dias", status: "Em andamento", progresso: 60 },
  { id: "a5", nome: "Lista: potências e raízes", disciplina: "Matemática", conteudo: "Cap. 1 · Potências e raízes", professor: "Carlos Mendes", tipo: "Lista de questões", prazo: "Entregue", status: "Concluída", progresso: 100, resultado: "8 de 10 questões" },
  { id: "a6", nome: "Revisão: Revolução Industrial", disciplina: "História", conteudo: "Cap. 1 · Revolução Industrial", professor: "Sônia Duarte", tipo: "Revisão de conteúdo", prazo: "Entregue", status: "Concluída", progresso: 100, resultado: "Concluída" },
  { id: "a7", nome: "Atividade com a TIA: notícia e opinião", disciplina: "Língua Portuguesa", conteudo: "Cap. 1 · Gêneros jornalísticos", professor: "Marta Ribeiro", tipo: "Atividade com a TIA", prazo: "Entregue", status: "Concluída", progresso: 100, resultado: "Concluída" },
];

/** Atividade que o professor cria no fluxo e que aparece na home do aluno. */
export const CHAVE_NOVA_ATIVIDADE = "ap-nova-atividade-v1";

export const QUESTOES_EXEMPLO = [
  { enunciado: "Qual é o valor de x na equação 3x − 5 = 16?", alternativas: ["x = 3", "x = 5", "x = 7", "x = 11"], correta: 2, comentario: "Some 5 aos dois lados: 3x = 21. Depois divida por 3: x = 7." },
  { enunciado: "Resolva: 2(x + 4) = 18.", alternativas: ["x = 3", "x = 5", "x = 7", "x = 9"], correta: 1, comentario: "Distribua o 2: 2x + 8 = 18. Subtraia 8: 2x = 10, então x = 5." },
  { enunciado: "A soma de um número com o seu triplo é 48. Qual é o número?", alternativas: ["10", "12", "16", "24"], correta: 1, comentario: "Chame o número de x: x + 3x = 48, logo 4x = 48 e x = 12." },
];

export const FLASHCARDS_EXEMPLO = [
  { frente: "O que é uma mistura homogênea?", verso: "Mistura de aspecto uniforme, com uma única fase visível. Exemplo: água com sal dissolvido." },
  { frente: "Como separar areia e água?", verso: "Por filtração: a areia fica retida no filtro e a água passa." },
  { frente: "O que é uma transformação química?", verso: "Processo em que surgem novas substâncias. Exemplo: ferro enferrujando." },
];

// ------------------------------------------------------------------ desempenho do aluno

export const DESEMPENHO_ALUNO = {
  atividades: 12,
  conclusao: 71,
  acertos: 64,
  erros: 28,
  porDisciplina: [
    { nome: "Língua Portuguesa", taxa: 72, atividades: 3 },
    { nome: "Matemática", taxa: 58, atividades: 4 },
    { nome: "Ciências", taxa: 81, atividades: 2 },
    { nome: "História", taxa: 76, atividades: 2 },
    { nome: "Geografia", taxa: 66, atividades: 1 },
  ],
  reforco: [
    { conteudo: "Equações com parênteses", disciplina: "Matemática", taxa: 42 },
    { conteudo: "Regra de três", disciplina: "Matemática", taxa: 48 },
    { conteudo: "Inferência em textos", disciplina: "Língua Portuguesa", taxa: 55 },
  ],
  evolucao: [52, 55, 54, 60, 63, 68],
  conquistas: [
    { id: "c1", nome: "Sequência de 5 dias", desc: "Estudou 5 dias seguidos", ganha: true },
    { id: "c2", nome: "Primeira lista", desc: "Concluiu uma lista de questões", ganha: true },
    { id: "c3", nome: "Curiosa", desc: "Fez 10 perguntas à TIA", ganha: true },
    { id: "c4", nome: "Nota alta", desc: "Acertar 90% em uma lista", ganha: false },
    { id: "c5", nome: "Maratona", desc: "Concluir 5 atividades numa semana", ganha: false },
  ],
};

// ------------------------------------------------------------------ turmas e alunos

export interface Turma {
  id: string;
  nome: string;
  serie: string;
  alunos: number;
  participacao: number;
  conclusao: number;
  desempenho: number;
  professores: string[];
}

export const TURMAS: Turma[] = [
  { id: "8a", nome: "8º ano A", serie: "8º ano", alunos: 32, participacao: 78, conclusao: 71, desempenho: 68, professores: ["Carlos Mendes", "Marta Ribeiro"] },
  { id: "8b", nome: "8º ano B", serie: "8º ano", alunos: 30, participacao: 54, conclusao: 49, desempenho: 61, professores: ["Carlos Mendes", "Paulo Vieira"] },
  { id: "8c", nome: "8º ano C", serie: "8º ano", alunos: 28, participacao: 83, conclusao: 80, desempenho: 72, professores: ["Carlos Mendes", "Sônia Duarte"] },
  { id: "8d", nome: "8º ano D", serie: "8º ano", alunos: 31, participacao: 67, conclusao: 62, desempenho: 66, professores: ["Marta Ribeiro", "Paulo Vieira"] },
];

export const CAPITULOS_TURMA = [
  { nome: "Potências e raízes", taxa: 78, erros: "Notação científica" },
  { nome: "Equações do 1º grau", taxa: 52, erros: "Equações com parênteses" },
  { nome: "Proporcionalidade", taxa: 66, erros: "Regra de três" },
  { nome: "Triângulos", taxa: 71, erros: "Teorema de Pitágoras" },
];

export const ASSUNTOS_TURMA = [
  { assunto: "Equações com parênteses", capitulo: "Equações do 1º grau", taxa: 41, alunos: 14 },
  { assunto: "Problemas com equações", capitulo: "Equações do 1º grau", taxa: 49, alunos: 12 },
  { assunto: "Regra de três", capitulo: "Proporcionalidade", taxa: 58, alunos: 9 },
  { assunto: "Notação científica", capitulo: "Potências e raízes", taxa: 64, alunos: 7 },
  { assunto: "Resolver equações simples", capitulo: "Equações do 1º grau", taxa: 77, alunos: 3 },
];

export const EVOLUCAO_TURMA = [
  { rotulo: "Sem 1", taxa: 61 },
  { rotulo: "Sem 2", taxa: 63 },
  { rotulo: "Sem 3", taxa: 60 },
  { rotulo: "Sem 4", taxa: 65 },
  { rotulo: "Sem 5", taxa: 66 },
  { rotulo: "Sem 6", taxa: 68 },
];

export const HABILIDADES_REFORCO = [
  "Resolver equações do 1º grau com parênteses (EF08MA09)",
  "Resolver problemas por meio de equações (EF08MA10)",
  "Aplicar proporcionalidade em situações do cotidiano (EF08MA12)",
];

const NOMES = ["Ana", "Bruno", "Carla", "Davi", "Elisa", "Felipe", "Gabriela", "Heitor", "Isabela", "João", "Karina", "Lucas", "Marina", "Nicolas", "Olívia", "Pedro", "Rafaela", "Samuel", "Talita", "Vitor"];
const SOBRENOMES = ["Souza", "Lima", "Costa", "Pereira", "Rocha", "Alves", "Martins", "Ribeiro", "Barros", "Nunes", "Freitas", "Moraes"];

export type Engajamento = "Ativo" | "Pouca atividade" | "Sem atividade recente";

export interface AlunoTurma {
  id: string;
  nome: string;
  turma: string;
  engajamento: Engajamento;
  acessosSemana: number;
  iniciadas: number;
  concluidas: number;
  pendentes: number;
  desempenho: number | null;
  ultimoAcesso: string;
  dificuldades: string[];
}

/** Gera a lista de alunos de forma determinística (sempre os mesmos nomes e números). */
export function alunosDaTurma(turmaId = "8a"): AlunoTurma[] {
  const turma = TURMAS.find((t) => t.id === turmaId) ?? TURMAS[0];
  const base = turmaId.charCodeAt(1) % 7;
  return Array.from({ length: turma.alunos }, (_, i) => {
    const nome = `${NOMES[(i * 3 + base) % NOMES.length]} ${SOBRENOMES[(i * 5 + base) % SOBRENOMES.length]}`;
    const r = (i * 37 + base * 11) % 100;
    const engajamento: Engajamento = r < turma.participacao - 10 ? "Ativo" : r < turma.participacao + 8 ? "Pouca atividade" : "Sem atividade recente";
    const iniciadas = engajamento === "Ativo" ? 5 + (i % 3) : engajamento === "Pouca atividade" ? 2 + (i % 2) : i % 2;
    const concluidas = Math.max(0, iniciadas - (i % 3 === 0 ? 1 : 0));
    const desempenho = iniciadas < 2 ? null : Math.min(96, Math.max(32, turma.desempenho + ((i * 13) % 31) - 15));
    return {
      id: `${turmaId}-${i + 1}`,
      nome,
      turma: turma.nome,
      engajamento,
      acessosSemana: engajamento === "Ativo" ? 4 + (i % 3) : engajamento === "Pouca atividade" ? 1 + (i % 2) : 0,
      iniciadas,
      concluidas,
      pendentes: Math.max(0, 6 - concluidas),
      desempenho,
      ultimoAcesso: engajamento === "Ativo" ? "hoje" : engajamento === "Pouca atividade" ? `há ${3 + (i % 4)} dias` : `há ${12 + (i % 9)} dias`,
      dificuldades: desempenho !== null && desempenho < 60 ? [ASSUNTOS_TURMA[i % 3].assunto] : [],
    };
  });
}

// ------------------------------------------------------------------ atividades do professor

export interface AtividadeProfessor {
  id: string;
  nome: string;
  turma: string;
  tipo: TipoAtividade;
  prazo: string;
  destinatarios: number;
  iniciaram: number;
  concluiram: number;
  desempenho: number | null;
}

export const ATIVIDADES_PROFESSOR: AtividadeProfessor[] = [
  { id: "p1", nome: "Lista: potências e raízes", turma: "8º ano A", tipo: "Lista de questões", prazo: "Encerrada", destinatarios: 32, iniciaram: 30, concluiram: 27, desempenho: 74 },
  { id: "p2", nome: "Podcast: equações com parênteses", turma: "8º ano A", tipo: "Podcast", prazo: "Em 5 dias", destinatarios: 32, iniciaram: 19, concluiram: 11, desempenho: null },
  { id: "p3", nome: "Lista de reforço: equações do 1º grau", turma: "8º ano A", tipo: "Lista de questões", prazo: "Em 3 dias", destinatarios: 32, iniciaram: 22, concluiram: 15, desempenho: 59 },
  { id: "p4", nome: "Flashcards: regra de três", turma: "8º ano B", tipo: "Flashcards", prazo: "Em 7 dias", destinatarios: 30, iniciaram: 12, concluiram: 6, desempenho: null },
];

export const QUESTOES_RELATORIO = [
  { n: 1, enunciado: "Resolver 3x − 5 = 16", taxa: 81 },
  { n: 2, enunciado: "Resolver 2(x + 4) = 18", taxa: 47 },
  { n: 3, enunciado: "Soma de um número com o triplo", taxa: 52 },
  { n: 4, enunciado: "Equação com incógnita dos dois lados", taxa: 38 },
  { n: 5, enunciado: "Problema com idade", taxa: 61 },
];

// ------------------------------------------------------------------ escola, município, Aprender

export const PROFESSORES_ESCOLA = [
  { nome: "Carlos Mendes", disciplina: "Matemática", turmas: 4, atividades: 14, acessosSemana: 5, acompanhamento: 86 },
  { nome: "Marta Ribeiro", disciplina: "Língua Portuguesa", turmas: 3, atividades: 9, acessosSemana: 4, acompanhamento: 72 },
  { nome: "Paulo Vieira", disciplina: "Ciências", turmas: 3, atividades: 6, acessosSemana: 2, acompanhamento: 48 },
  { nome: "Sônia Duarte", disciplina: "História", turmas: 2, atividades: 4, acessosSemana: 3, acompanhamento: 61 },
  { nome: "Rita Campos", disciplina: "Geografia", turmas: 2, atividades: 1, acessosSemana: 1, acompanhamento: 22 },
];

export const ESCOLA_KPIS = {
  alunos: 121,
  ativos: 84,
  utilizacao: 69,
  professoresAtivos: 5,
  turmas: 4,
  atividades: 34,
  conclusao: 66,
  desempenho: 67,
};

export const SERIE_ESCOLA = [48, 55, 59, 62, 66, 69];
export const MESES_PILOTO = ["Mês 1", "Mês 2", "Mês 3", "Mês 4", "Mês 5", "Mês 6"];

export interface EscolaRede {
  id: string;
  nome: string;
  regiao: "Centro" | "Zona Norte" | "Zona Sul" | "Rural";
  alunos: number;
  ativos: number;
  conclusao: number;
  desempenho: number;
  status: "Em destaque" | "Estável" | "Baixa adesão";
}

export const ESCOLAS_REDE: EscolaRede[] = [
  { id: "e1", nome: "E.M. Prof.ª Aurora Lima", regiao: "Centro", alunos: 121, ativos: 84, conclusao: 66, desempenho: 67, status: "Estável" },
  { id: "e2", nome: "E.M. Santa Lúcia", regiao: "Zona Norte", alunos: 188, ativos: 163, conclusao: 81, desempenho: 71, status: "Em destaque" },
  { id: "e3", nome: "E.M. Dom Pedro", regiao: "Centro", alunos: 204, ativos: 142, conclusao: 69, desempenho: 66, status: "Estável" },
  { id: "e4", nome: "E.M. Ipê Amarelo", regiao: "Zona Sul", alunos: 152, ativos: 70, conclusao: 41, desempenho: 59, status: "Baixa adesão" },
  { id: "e5", nome: "E.M. Rio Claro", regiao: "Rural", alunos: 64, ativos: 29, conclusao: 38, desempenho: 57, status: "Baixa adesão" },
  { id: "e6", nome: "E.M. Monte Verde", regiao: "Zona Norte", alunos: 176, ativos: 139, conclusao: 74, desempenho: 69, status: "Estável" },
  { id: "e7", nome: "E.M. Cecília Meireles", regiao: "Centro", alunos: 219, ativos: 187, conclusao: 79, desempenho: 70, status: "Em destaque" },
  { id: "e8", nome: "E.M. Vale Alegre", regiao: "Rural", alunos: 71, ativos: 35, conclusao: 45, desempenho: 58, status: "Baixa adesão" },
];

export const DIFICULDADES_REDE = [
  { conteudo: "Equações do 1º grau", disciplina: "Matemática", taxa: 51, escolas: 7 },
  { conteudo: "Interpretação de textos (inferência)", disciplina: "Língua Portuguesa", taxa: 56, escolas: 6 },
  { conteudo: "Regra de três", disciplina: "Matemática", taxa: 58, escolas: 6 },
  { conteudo: "Separação de misturas", disciplina: "Ciências", taxa: 61, escolas: 4 },
  { conteudo: "Migrações", disciplina: "Geografia", taxa: 63, escolas: 3 },
];

export const DESEMPENHO_REDE_DISCIPLINA = [
  { nome: "Língua Portuguesa", taxa: 66 },
  { nome: "Matemática", taxa: 59 },
  { nome: "Ciências", taxa: 72 },
  { nome: "História", taxa: 70 },
  { nome: "Geografia", taxa: 64 },
];

export type StatusMunicipio = "Implantado" | "Em implantação" | "Piloto" | "Planejado";

export interface Municipio {
  id: string;
  nome: string;
  uf: string;
  escolas: number;
  previstos: number;
  cadastrados: number;
  ativos: number;
  implantacao: string;
  status: StatusMunicipio;
}

export const MUNICIPIOS: Municipio[] = [
  { id: "m1", nome: "Vale do Sol", uf: "CE", escolas: 8, previstos: 1200, cadastrados: 1195, ativos: 899, implantacao: "Mês 1", status: "Piloto" },
  { id: "m2", nome: "Serra Dourada", uf: "CE", escolas: 14, previstos: 2100, cadastrados: 1980, ativos: 1410, implantacao: "Mês 1", status: "Piloto" },
  { id: "m3", nome: "Lagoa Bonita", uf: "CE", escolas: 11, previstos: 1700, cadastrados: 1540, ativos: 960, implantacao: "Mês 2", status: "Piloto" },
  { id: "m4", nome: "Campo Formoso do Norte", uf: "PI", escolas: 9, previstos: 1300, cadastrados: 1010, ativos: 612, implantacao: "Mês 2", status: "Piloto" },
  { id: "m5", nome: "Boa Esperança", uf: "PI", escolas: 12, previstos: 1800, cadastrados: 920, ativos: 408, implantacao: "Mês 3", status: "Em implantação" },
  { id: "m6", nome: "Santa Rita do Vale", uf: "MA", escolas: 10, previstos: 1500, cadastrados: 380, ativos: 121, implantacao: "Mês 4", status: "Em implantação" },
  { id: "m7", nome: "Pedra Branca do Sul", uf: "MA", escolas: 7, previstos: 900, cadastrados: 0, ativos: 0, implantacao: "Previsto: mês 7", status: "Planejado" },
];

export const FUNCIONALIDADES_USO = [
  { nome: "TIA (perguntas)", valor: 42800 },
  { nome: "Listas de questões respondidas", valor: 18300 },
  { nome: "Resumos lidos", valor: 9400 },
  { nome: "Podcasts reproduzidos", valor: 6100 },
  { nome: "Flashcards revisados", valor: 5200 },
];

export const SERIE_USUARIOS_ATIVOS = [1800, 3100, 4300, 5200, 5900, 6400];
export const SERIE_RETENCAO = [100, 71, 64, 60, 58, 57];

// ------------------------------------------------------------------ Fala Tio (administração técnica)

export const MATERIAIS_FALATIO = [
  { livro: "Matemática · 8º ano", capitulos: 4, status: "Disponível na TIA", processado: 100 },
  { livro: "Língua Portuguesa · 8º ano", capitulos: 4, status: "Disponível na TIA", processado: 100 },
  { livro: "Ciências · 8º ano", capitulos: 4, status: "Disponível na TIA", processado: 100 },
  { livro: "História · 8º ano", capitulos: 3, status: "Processando", processado: 72 },
  { livro: "Geografia · 8º ano", capitulos: 3, status: "Em revisão", processado: 40 },
];

export const INTEGRACOES = [
  { nome: "QR Codes dos livros", detalhe: "Geração e redirecionamento por capítulo", status: "Operando", ultima: "há 2 min" },
  { nome: "Autenticação (login único)", detalhe: "Importação de matrículas da rede", status: "Operando", ultima: "há 8 min" },
  { nome: "Importação de cadastros", detalhe: "Planilhas da secretaria", status: "Atenção", ultima: "há 1 h" },
  { nome: "Sistema de gestão escolar", detalhe: "Integração a definir com a rede", status: "Não configurada", ultima: "n/d" },
];

export const REGISTROS_SUPORTE = [
  { hora: "21:42", tipo: "Erro", org: "Vale do Sol", detalhe: "Falha ao abrir QR de capítulo sem material vinculado" },
  { hora: "20:15", tipo: "Alteração", org: "Serra Dourada", detalhe: "Perfil de professor adicionado por Administração Aprender" },
  { hora: "19:02", tipo: "Suporte", org: "Lagoa Bonita", detalhe: "Solicitação: redefinir acesso de gestor escolar" },
  { hora: "17:30", tipo: "Erro", org: "Boa Esperança", detalhe: "Importação de cadastro com 12 linhas inválidas" },
  { hora: "16:11", tipo: "Intervenção", org: "Todas", detalhe: "Reprocessamento de material de História" },
];
