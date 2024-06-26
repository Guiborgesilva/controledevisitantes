export type Visitante = {
  id: string;
  nome: string;
  data_nascimento: string;
  sexo: string;
  telefone: string;
  endereco: string;
  bairro: string;
  quem_convidou: string;
  como_conheceu: string;
  data_visita: string;
  tipo_culto: string;
  created_at: string;
}

export type UpdateVisitante = {
  id: string;
  nome: string;
  data_nascimento: string;
  sexo: string;
  telefone: string;
  endereco: string;
  bairro: string;
  quem_convidou: string;
  como_conheceu: string;
  data_visita: string;
  tipo_culto: string;
}