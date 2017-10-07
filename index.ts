// ===== Connections =====
import './src/common/database/connection';
import { User } from './src/models/User';
import Server from './src/server';
// ===== Connections end =====

console.log(User);

// ===== Server run =====
const server = new Server();
server.start();
// ===== Server run end =====
