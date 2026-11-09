# library-management-system

A Library Management System with Prisma and PostgreSQL

## Schema Decisions

The database uses a relational structure with three main models: User, Genre, and Book.

The Book model references Genre through a `genreId` foreign key instead of storing the genre name directly inside each book.

This design was chosen because:

- It avoids repeating genre information across multiple books.
- It maintains data consistency.
- It allows multiple books to belong to the same genre.
- It uses a one-to-many relationship between Genre and Book.
- It makes it easier to update genre information without modifying every book.

The User model includes a Role enum with two roles: PATRON and LIBRARIAN. This ensures that users are assigned valid roles.

PostgreSQL was selected as the relational database, and Prisma ORM is used to define the schema, manage migrations, and interact with the database.

## Database Setup

1. Navigate to the api folder.
2. Install dependencies using `npm install`.
3. Create a `.env` file using `.env.example` as a template.
4. Add your PostgreSQL connection string to `DATABASE_URL`.
5. Run migrations using `npx prisma migrate dev`.
6. Generate Prisma Client using `npx prisma generate`.
7. Seed the database using `npm run seed`.

## Seed Data

The database is seeded with:

- 4 genres
- 16 books distributed across the genres.
