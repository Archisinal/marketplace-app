import prisma from '@archisinal/db';

export async function updateLastAnalyzedBlock(newBlockNumber: number | bigint) {
  return prisma.blockProgress.upsert({
    where: { id: 1 }, // assuming a single row with ID 1
    update: { lastAnalyzedBlock: newBlockNumber },
    create: { id: 1, lastAnalyzedBlock: newBlockNumber },
  });
}
