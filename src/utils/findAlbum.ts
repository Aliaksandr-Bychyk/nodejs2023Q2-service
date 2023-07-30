import albumsDB from 'src/databases/albumsDB';

const findAlbum = (albumId: string) => {
  const album = albumsDB.find((album) => album.id === albumId);
  if (!album) {
    throw new Error('404');
  }
  return album;
};

export default findAlbum;
