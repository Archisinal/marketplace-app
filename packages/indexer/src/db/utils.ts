import prisma from '@archisinal/db';

export async function updateLastAnalyzedBlock(newBlockNumber: number) {
  const blockProgress = await prisma.blockProgress.upsert({
    where: { id: 1 }, // assuming a single row with ID 1
    update: { lastAnalyzedBlock: newBlockNumber },
    create: { lastAnalyzedBlock: newBlockNumber },
  });

  // await prisma.processedBlock.create({
  //   data: {
  //     blockNumber: newBlockNumber,
  //   },
  // });

  return blockProgress;
}