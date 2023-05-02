-- CreateEnum
CREATE TYPE "PriceUnit" AS ENUM ('unit', 'libra', 'kilogram', 'gram');

-- CreateTable
CREATE TABLE "Veggie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "name_es" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "unit" "PriceUnit" NOT NULL DEFAULT 'unit',
    "is_favorite" BOOLEAN DEFAULT false,
    "picture_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Veggie_pkey" PRIMARY KEY ("id")
);
