import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
};

async function createTables() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // await connection.execute(`
    //   DROP TABLE IF EXISTS users, posts, comments;
    // `);
    // users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        userId INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `);

    // posts table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS posts (
        postId INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        userId INT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(userId)
      );
    `);

    // comments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS comments (
        commentId INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT NOT NULL,
        userId INT,
        postId INT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(userId),
        FOREIGN KEY (postId) REFERENCES posts(postId)
      );
    `);

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await connection.end();
  }
}

createTables();
