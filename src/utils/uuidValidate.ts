import { validate } from 'uuid';

const uuidValidate = (uuid: string) => {
  if (!validate(uuid)) {
    throw new Error('400');
  }
};

export default uuidValidate;
