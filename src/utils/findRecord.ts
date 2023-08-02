import { IDatabase } from 'src/interfaces/IDatabase';

const findRecord = (database: IDatabase[], id: string, errorCode?: string) => {
  const record = database.find((record) => record.id === id);
  if (!record) {
    throw new Error(errorCode ?? '404');
  }
  return record;
};

export default findRecord;
