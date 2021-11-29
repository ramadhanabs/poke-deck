import Dexie from 'dexie';

export const db = new Dexie('db');

db.version(1).stores({
  pokemon: '++id, nickname, original_name, url_image, timestamps', // Primary key and indexed props
});

db.version(2).stores({
  pokemon: '++id, nickname, original_name, type, url_image, timestamps', // Primary key and indexed props
});
