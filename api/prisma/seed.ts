
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const genres = [
    { name: "Fiction", description: "Fictional stories and novels" },
    { name: "Science", description: "Science and scientific discoveries" },
    { name: "Technology", description: "Computers and modern technology" },
    { name: "History", description: "Historical events and biographies" },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });
  }

  const books = [
    { title: "The Silent Patient", author: "Alex Michaelides", isbn: "9781250301697", genre: "Fiction", publishedAt: 2019 },
    { title: "The Alchemist", author: "Paulo Coelho", isbn: "9780061122415", genre: "Fiction", publishedAt: 1988 },
    { title: "1984", author: "George Orwell", isbn: "9780451524935", genre: "Fiction", publishedAt: 1949 },
    { title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518", genre: "Fiction", publishedAt: 1813 },

    { title: "A Brief History of Time", author: "Stephen Hawking", isbn: "9780553380163", genre: "Science", publishedAt: 1988 },
    { title: "The Selfish Gene", author: "Richard Dawkins", isbn: "9780198788607", genre: "Science", publishedAt: 1976 },
    { title: "Cosmos", author: "Carl Sagan", isbn: "9780345539434", genre: "Science", publishedAt: 1980 },
    { title: "The Gene", author: "Siddhartha Mukherjee", isbn: "9781476733524", genre: "Science", publishedAt: 2016 },

    { title: "Clean Code", author: "Robert C. Martin", isbn: "9780132350884", genre: "Technology", publishedAt: 2008 },
    { title: "The Pragmatic Programmer", author: "David Thomas", isbn: "9780135957059", genre: "Technology", publishedAt: 2019 },
    { title: "Code", author: "Charles Petzold", isbn: "9780735611313", genre: "Technology", publishedAt: 2000 },
    { title: "Introduction to Algorithms", author: "Thomas H. Cormen", isbn: "9780262046305", genre: "Technology", publishedAt: 2022 },

    { title: "Sapiens", author: "Yuval Noah Harari", isbn: "9780062316097", genre: "History", publishedAt: 2011 },
    { title: "The Diary of a Young Girl", author: "Anne Frank", isbn: "9780553296983", genre: "History", publishedAt: 1947 },
    { title: "Guns, Germs, and Steel", author: "Jared Diamond", isbn: "9780393354324", genre: "History", publishedAt: 1997 },
    { title: "Long Walk to Freedom", author: "Nelson Mandela", isbn: "9780316548182", genre: "History", publishedAt: 1994 },
  ];

  for (const book of books) {
    const genre = await prisma.genre.findUniqueOrThrow({
      where: { name: book.genre },
    });

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publishedAt: book.publishedAt,
        genre: { connect: { id: genre.id } },
      },
    });
  }

  console.log("Database seeded successfully!");
  console.log(`Genres: ${genres.length}`);
  console.log(`Books: ${books.length}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
