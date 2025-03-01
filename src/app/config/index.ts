import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  // bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  // jwt_secret: process.env.JWT_SECRET,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
};
