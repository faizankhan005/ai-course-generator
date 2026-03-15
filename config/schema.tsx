import { timeStamp } from "console";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
// import { Type } from "lucide-react";
import { json } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  // age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(2),
});

export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  userId: integer().notNull().references(() => usersTable.id),

  courseId: varchar({ length: 255 }).notNull().unique(),
  courseName: varchar({ length: 255 }).notNull(),
  userInput: varchar({ length: 1000 }).notNull(),
  type: varchar({ length: 255 }).notNull(),

  courseLayout: json(),

  createdAt: timestamp().defaultNow(),

  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1000 }),
});

// export const quizTable = pgTable("quizzes", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   courseId: integer().notNull(),
//   question: varchar({ length: 1000 }).notNull(),
//   options: varchar({ length: 2000 }).notNull(), // Store options as JSON string
//   correctAnswer: varchar({ length: 255 }).notNull(),
// });

// export const videoScriptsTable = pgTable("video_scripts", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   courseId: integer().notNull(),
//   title: varchar({ length: 255 }).notNull(),
//   description: varchar({ length: 1000 }),
//   script: varchar({ length: 5000 }).notNull(), // Store script as JSON string
// });

// export const chaptersTable = pgTable("chapters", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   courseId: integer().notNull(),
//   title: varchar({ length: 255 }).notNull(),
//   description: varchar({ length: 1000 }),
// });
