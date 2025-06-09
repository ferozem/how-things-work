import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  topicCount: integer("topic_count").notNull().default(0),
  gameCount: integer("game_count").notNull().default(0),
  ageRange: text("age_range").notNull(),
  category: text("category").notNull(),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  category: text("category").notNull(),
  topicId: integer("topic_id").references(() => topics.id),
  ageRange: text("age_range").notNull(),
  featured: boolean("featured").notNull().default(false),
});

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(),
  duration: text("duration").notNull(),
  ageRange: text("age_range").notNull(),
  category: text("category").notNull(),
  topicId: integer("topic_id").references(() => topics.id),
  instructions: text("instructions").notNull(),
});

export const experiments = pgTable("experiments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(),
  duration: text("duration").notNull(),
  materials: text("materials").notNull(),
  instructions: text("instructions").notNull(),
  safetyNotes: text("safety_notes").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  ageRange: text("age_range").notNull(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  questions: text("questions").notNull(), // JSON string
  featured: boolean("featured").notNull().default(false),
  ageRange: text("age_range").notNull(),
  badge: text("badge").notNull(),
});

export const funFacts = pgTable("fun_facts", {
  id: serial("id").primaryKey(),
  fact: text("fact").notNull(),
  category: text("category").notNull(),
  featured: boolean("featured").notNull().default(false),
});

export const insertTopicSchema = createInsertSchema(topics).omit({
  id: true,
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
});

export const insertGameSchema = createInsertSchema(games).omit({
  id: true,
});

export const insertExperimentSchema = createInsertSchema(experiments).omit({
  id: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
});

export const insertFunFactSchema = createInsertSchema(funFacts).omit({
  id: true,
});

export type Topic = typeof topics.$inferSelect;
export type InsertTopic = z.infer<typeof insertTopicSchema>;

export type Video = typeof videos.$inferSelect;
export type InsertVideo = z.infer<typeof insertVideoSchema>;

export type Game = typeof games.$inferSelect;
export type InsertGame = z.infer<typeof insertGameSchema>;

export type Experiment = typeof experiments.$inferSelect;
export type InsertExperiment = z.infer<typeof insertExperimentSchema>;

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;

export type FunFact = typeof funFacts.$inferSelect;
export type InsertFunFact = z.infer<typeof insertFunFactSchema>;
