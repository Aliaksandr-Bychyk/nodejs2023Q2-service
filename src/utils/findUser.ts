import usersDB from 'src/databases/usersDB';

const findUser = (userId: string) => {
  const user = usersDB.find((user) => user.id === userId);
  if (!user) {
    throw new Error('404');
  }
  return user;
};

export default findUser;
