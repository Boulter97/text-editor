import { openDB } from 'idb';

const initdb = async () => {
  const db = await openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        const jateStore = db.createObjectStore('jate', {
          keyPath: 'id',
          autoIncrement: true,
        });
        jateStore.createIndex('contentIndex', 'content');
        console.log('jate database created');
      }
    },
  });
  return db;
};

export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const data = {
    content,
    createdAt: new Date(),
  };
  await store.put(data);
  await tx.complete;
  console.log('Data saved to IndexedDB');
};

export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const data = await store.getAll();
  await tx.complete;
  if (data.length > 0) {
    console.log('Data retrieved from IndexedDB');
    return data[data.length - 1].content;
  }
  return null;
};

initdb();

