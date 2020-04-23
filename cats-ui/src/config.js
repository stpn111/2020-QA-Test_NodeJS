const local = {
  catsApi: 'http://localhost:3003',
  reactionApi: 'http://localhost:3002',
  photosApi: 'http://localhost:3001',
};
const production = {
  catsApi: '/api/core',
  reactionApi: '/api/likes',
  photosApi: '/api/photos',
};

export const urls = process.env.NODE_ENV === 'production' ? production : local;
