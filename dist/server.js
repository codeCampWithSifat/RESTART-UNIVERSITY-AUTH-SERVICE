'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
// getting-started.js
const mongoose_1 = __importDefault(require('mongoose'));
const app_1 = __importDefault(require('./app'));
const config_1 = __importDefault(require('./config'));
let server;
process.on('uncaughtException', error => {
  console.log('Uncaught Exception Is Occured Here', error);
  process.exit(1);
});
function main() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield mongoose_1.default.connect(config_1.default.databaseUrl);
      console.log('✔✔ Database connected Succesfully');
      server = app_1.default.listen(config_1.default.port, () => {
        console.log(`Auth Service Is Running On Port ${config_1.default.port}`);
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
