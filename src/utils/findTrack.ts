import tracksDB from 'src/databases/tracksDB';

const findTrack = (trackId: string) => {
  const track = tracksDB.find((track) => track.id === trackId);
  if (!track) {
    throw new Error('404');
  }
  return track;
};

export default findTrack;
