import { connect, disconnect } from 'mongoose';
import { startSession } from 'mongoose';
let isConnected = false;
let session;

initDB().catch(err => console.log(err));


export async function initDB() {
  if(!isConnected){
    await connect(process.env.DATABASE_URL);
  }

  if(session == null){
    session = await startSession();
    session.startTransaction();
  }

  return session;
}

export async function closeDB(transaction = "commit") {
  if(isConnected){
    await disconnect();
  }

  if(session != null){
    session.endSession();
  }
}