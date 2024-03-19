// getting-started.js
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';

let server: Server;

process.on('uncaughtException', error => {
  console.log('Uncaught Exception Is Occured Here', error);
  process.exit(1);
});

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log('✔✔ Database connected Succesfully');
    server = app.listen(config.port, () => {
      console.log(`Auth Service Is Running On Port ${config.port}`);
    });
  } catch (error) {
    console.log(error, 'Failed To Connected Database');
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandle Rejection Is Here');
    if (error) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});

/*
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://RESTART-UNIVERSITY-AUTH-SERVICE:Puaos1L7Lmk4dX2Y@cluster0.qahuo.mongodb.net/RESTART-UNIVERSITY-AUTH-SERVICE?retryWrites=true&w=majority&appName=Cluster0
DEFAULT_STUDENT_PASS=sifat123456
*/
