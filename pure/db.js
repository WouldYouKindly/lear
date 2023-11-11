import { openDB, deleteDB } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';


class Database {
  constructor(db) {
    this.db = db;
  }

  static async open() {
    const db = await openDB("lear", 1, {
        upgrade(db, oldVersion, newVersion,) {
            console.log('Upgrading');
  
            if (newVersion === 1) {
                const sessionsStore = db.createObjectStore('sessions', {autoIncrement: true});
                sessionsStore.createIndex('ts', 'ts');
  
                const questionsStore = db.createObjectStore('questions', {autoIncrement: true});
                questionsStore.createIndex('sessionId', 'sessionId');
            }
    }})
    return new Database(db);
  }

  async getLastSession() {
    const tx = this.db.transaction('sessions', 'readonly');
    const index = tx.store.index('ts');
    const cursor = await index.openCursor(null, 'prev');
  
    return cursor ? {...cursor.value, key: cursor.key, pk: cursor.primaryKey} : null;
  }

  async getQuestions(sessionId) {
    return this.db.getAllFromIndex("questions", "sessionId", sessionId);
  }

  async createSession(numQuestions) {
    await this.db.add('sessions', {
        ts: Date.now(),
        numQuestions,
        finished: false,
    });
    return await this.getLastSession();
  }
  
  async saveQuestion(sessionId, question, answer) {
    return await this.db.add('questions', {
        ts: Date.now(),
        sessionId,
        question, 
        answer,
    });
  }
}

export { Database }