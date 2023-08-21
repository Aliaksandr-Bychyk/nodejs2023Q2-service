import { PrismaService } from 'src/prisma.service';

const findRecord = async (
  prisma: PrismaService,
  id: string,
  model: string,
  errorCode?: string,
) => {
  const record = await prisma[model].findUnique({
    where: {
      id: String(id),
    },
  });
  if (!record) {
    throw new Error(errorCode ?? '404');
  }
  return record;
};

export default findRecord;
