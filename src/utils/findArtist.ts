import artistsDB from 'src/databases/artistsDB';

const findArtist = (id: string) => {
  const user = artistsDB.find((artist) => artist.id === id);
  if (!user) {
    throw new Error('404');
  }
  return user;
};

export default findArtist;
