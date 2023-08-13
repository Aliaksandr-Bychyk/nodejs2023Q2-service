import { PrismaClient } from '@prisma/client';

const user = {
  id: 'd7d59e7d-cf83-5b69-a33b-8912311ceb6e',
  login: 'Aliaksandr',
  password: 'admin',
  version: 1,
  createdAt: 1690717233,
  updatedAt: 1690717233,
};
const artist = {
  id: '8a3c8a2c-2fd9-4928-9e3e-6e09c6e88247',
  name: '3OH!3',
  grammy: false,
};
const album = {
  id: '2161b9db-838c-4c13-993b-f949280b0b81',
  name: 'Streets Of Gold',
  year: 2010,
  artistId: '8a3c8a2c-2fd9-4928-9e3e-6e09c6e88247',
};
const track = {
  id: '5e25dc7e-5aec-4956-bc45-932b041d9e0c',
  name: 'Beaumont',
  artistId: '8a3c8a2c-2fd9-4928-9e3e-6e09c6e88247',
  albumId: '2161b9db-838c-4c13-993b-f949280b0b81',
  duration: 68,
};

const prisma = new PrismaClient();
async function main() {
  await prisma.users.deleteMany();
  await prisma.artists.deleteMany();
  await prisma.albums.deleteMany();
  await prisma.tracks.deleteMany();

  await prisma.users.create({
    data: user,
  });

  await prisma.artists.create({
    data: artist,
  });

  await prisma.albums.create({
    data: album,
  });

  await prisma.tracks.create({
    data: track,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
