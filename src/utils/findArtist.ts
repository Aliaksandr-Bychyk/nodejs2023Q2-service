import artistsDB from 'src/databases/artistsDB';

const findArtist = (id: string) => {
  const artist = artistsDB.find((artist) => artist.id === id);
  if (!artist) {
    throw new Error('404');
  }
  return artist;
};

export default findArtist;
