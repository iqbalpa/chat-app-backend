-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
