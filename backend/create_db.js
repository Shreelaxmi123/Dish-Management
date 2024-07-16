const sqlite3 = require('sqlite3').verbose();

// Connect to the database (creates the database if it doesn't exist)
const db = new sqlite3.Database('dishes.db');

db.serialize(() => {
  // Create the 'dishes' table
  db.run(`CREATE TABLE IF NOT EXISTS dishes (
    dishId INTEGER PRIMARY KEY AUTOINCREMENT,
    dishName TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    isPublished BOOLEAN NOT NULL
  )`);

  // Insert initial data into the 'dishes' table
  const dishes = [
    {
      dishName: "Jeera Rice",
      imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/jeera-rice.jpg",
      isPublished: true
    },
    {
      dishName: "Paneer Tikka",
      imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/paneer-tikka.jpg",
      isPublished: true
    },
    {
      dishName: "Rabdi",
      imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/rabdi.jpg",
      isPublished: true
    },
    {
      dishName: "Chicken Biryani",
      imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/chicken-biryani.jpg",
      isPublished: true
    },
    {
      dishName: "Alfredo Pasta",
      imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/alfredo-pasta.jpg",
      isPublished: true
    }
  ];

  const stmt = db.prepare("INSERT INTO dishes (dishName, imageUrl, isPublished) VALUES (?, ?, ?)");
  dishes.forEach(dish => {
    stmt.run(dish.dishName, dish.imageUrl, dish.isPublished);
  });
  stmt.finalize();
});

// Close the database connection
db.close();

console.log('Database and table created, and initial data inserted.');
