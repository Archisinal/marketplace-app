-- CreateTable
CREATE TABLE "Admins" (
    "id" BIGSERIAL NOT NULL,
    "admin" TEXT NOT NULL,
    "contract_address" TEXT NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessedBlock" (
    "id" SERIAL NOT NULL,
    "blockNumber" BIGINT NOT NULL,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcessedBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_admin_contract_address_key" ON "Admins"("admin", "contract_address");

-- CreateIndex
CREATE UNIQUE INDEX "ProcessedBlock_blockNumber_key" ON "ProcessedBlock"("blockNumber");
