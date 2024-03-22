-- CreateTable
CREATE TABLE "Visitante" (
    "id" VARCHAR(36) NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "quem_convidou" TEXT NOT NULL,
    "como_conheceu_sara" TEXT NOT NULL,
    "data_visita" TEXT NOT NULL,
    "tipo_culto" TEXT NOT NULL,

    CONSTRAINT "Visitante_pkey" PRIMARY KEY ("id")
);
