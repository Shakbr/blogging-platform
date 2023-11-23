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
    // Users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Users (
        UserID INT AUTO_INCREMENT PRIMARY KEY,
        Username VARCHAR(255) NOT NULL UNIQUE,
        Email VARCHAR(255) NOT NULL UNIQUE,
        Password VARCHAR(255) NOT NULL
      );
    `);

    // Posts table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Posts (
        PostID INT AUTO_INCREMENT PRIMARY KEY,
        Title VARCHAR(255) NOT NULL,
        Content TEXT NOT NULL,
        UserID INT,
        Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
      );
    `);

    // Comments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Comments (
        CommentID INT AUTO_INCREMENT PRIMARY KEY,
        Content TEXT NOT NULL,
        UserID INT,
        PostID INT,
        Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES Users(UserID),
        FOREIGN KEY (PostID) REFERENCES Posts(PostID)
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
