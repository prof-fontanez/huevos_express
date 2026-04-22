// server/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import crypto from 'crypto';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

const decrypt = (encryptedText) => {
    const key = process.env.ENCRYPTION_KEY;
    const [iv, encrypted] = encryptedText.split(':');
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(key, 'hex'),
        Buffer.from(iv, 'hex')
    );
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: decrypt(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
});

export default pool;