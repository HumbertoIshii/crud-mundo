export interface Continente {
  id: number;
  nome: string;
  descricao: string;
}

export interface Pais {
  id: number;
  nome: string;
  populacao: number;
  idioma_oficial: string;
  moeda: string;
  continenteId: number;
  sigla: string;
  bandeira: string;
}

export interface Cidade {
  id: number;
  nome: string;
  populacao: number;
  latitude: number;
  longitude: number;
  paisId: number;
}
