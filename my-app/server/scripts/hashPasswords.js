// scripts/hashPasswords.js
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables based on NODE_ENV
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const hashPasswords = async () => {
    try {
        // Fetch user IDs and clear-text passwords from the 'password' column
        const [users] = await db.execute('SELECT id, password FROM users');

        for (const user of users) {
            const { id, password } = user;

            if (!password) {
                console.log(`Skipping user ID ${id} — no password found.`);
                continue;
            }

            const hashed = await bcrypt.hash(password, 10);

            // Update hashed password in password_hash column
            await db.execute('UPDATE users SET password_hash = ? WHERE id = ?', [hashed, id]);
            console.log(`✅ Password hashed for user ID ${id}`);
        }

        console.log('🎉 All passwords hashed successfully.');
    } catch (err) {
        console.error('❌ Error hashing passwords:', err);
    } finally {
        await db.end();
    }
};

hashPasswords();
