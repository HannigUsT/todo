-- CreateTable
CREATE TABLE "Atividade" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "concluido" BOOLEAN NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL,
    "data_conclusao" TIMESTAMP(3),

    CONSTRAINT "Atividade_pkey" PRIMARY KEY ("id")
);
