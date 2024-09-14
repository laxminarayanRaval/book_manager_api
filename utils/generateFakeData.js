const Book = require("../models/Book");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const books = [
  // List of books
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { title: "1984", author: "George Orwell" },
  { title: "To Kill a Mockingbird", author: "Harper Lee" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { title: "Pride and Prejudice", author: "Jane Austen" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Moby Dick", author: "Herman Melville" },
  { title: "War and Peace", author: "Leo Tolstoy" },
  { title: "Ulysses", author: "James Joyce" },
  { title: "The Odyssey", author: "Homer" },
  { title: "Brave New World", author: "Aldous Huxley" },
  { title: "The Chronicles of Narnia", author: "C.S. Lewis" },
  { title: "Catch-22", author: "Joseph Heller" },
  { title: "Fahrenheit 451", author: "Ray Bradbury" },
  { title: "The Road", author: "Cormac McCarthy" },
  { title: "Gone with the Wind", author: "Margaret Mitchell" },
  { title: "The Grapes of Wrath", author: "John Steinbeck" },
  { title: "The Sun Also Rises", author: "Ernest Hemingway" },
  { title: "Les Misérables", author: "Victor Hugo" },
  { title: "The God of Small Things", author: "Arundhati Roy" },
  { title: "The White Tiger", author: "Aravind Adiga" },
  { title: "The Inheritance of Loss", author: "Kiran Desai" },
  { title: "The Namesake", author: "Jhumpa Lahiri" },
  { title: "The Palace of Illusions", author: "Chitra Banerjee Divakaruni" },
  { title: "The Immortals of Meluha", author: "Amish Tripathi" },
  { title: "The Secret of the Nagas", author: "Amish Tripathi" },
  { title: "The Oath of the Vayuputras", author: "Amish Tripathi" },
  { title: "The Shiva Trilogy", author: "Amish Tripathi" },
  { title: "The Krishna Key", author: "Ashwin Sanghi" },
  { title: "Chanakya's Chant", author: "Ashwin Sanghi" },
  { title: "The Rozabal Line", author: "Ashwin Sanghi" },
  { title: "The Sialkot Saga", author: "Ashwin Sanghi" },
  { title: "Keep the Change", author: "Nirupama Subramanian" },
  { title: "The Bestseller She Wrote", author: "Ravi Subramanian" },
  { title: "If God Was a Banker", author: "Ravi Subramanian" },
  { title: "Devil in Pinstripes", author: "Ravi Subramanian" },
  { title: "The Incredible Banker", author: "Ravi Subramanian" },
  { title: "The Bankster", author: "Ravi Subramanian" },
  { title: "Bankerupt", author: "Ravi Subramanian" },
];

const users = [
  { email: "test1@test.com", password: "password" },
  { email: "test2@test.com", password: "password" },
];

const generateFakeData = async () => {
  try {
    // Find existing books and users
    const existingBooks = await Book.find({
      title: { $in: books.map((b) => b.title) },
    });
    const existingUsers = await User.find({
      email: { $in: users.map((u) => u.email) },
    });

    const existingBookTitles = existingBooks.map((b) => b.title);
    const existingUserEmails = existingUsers.map((u) => u.email);

    // Filter out books and users that already exist
    const newBooks = books.filter((b) => !existingBookTitles.includes(b.title));
    const newUsers = users.filter((u) => !existingUserEmails.includes(u.email));

    console.log(`Found ${existingBooks.length} existing books`);
    console.log(`Found ${existingUsers.length} existing users`);

    // Insert new books
    if (newBooks.length > 0) {
      console.log(`Adding ${newBooks.length} new books`);
      await Book.insertMany(newBooks);
    }

    // Hash user passwords and insert new users
    if (newUsers.length > 0) {
      console.log(`Adding ${newUsers.length} new users`);
      const hashedUsers = await Promise.all(
        newUsers.map(async (u) => {
          const hashedPassword = await bcrypt.hash(u.password, 10);
          return { email: u.email, password: hashedPassword };
        })
      );
      await User.insertMany(hashedUsers);
    }
  } catch (error) {
    console.error("Error generating fake data:", error); // Log error for debugging
  }
};

module.exports = generateFakeData;
