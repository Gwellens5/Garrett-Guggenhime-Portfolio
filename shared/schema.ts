import { pgTable, text, serial, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  linkedinUrl: text("linkedin_url"),
  clubUrl: text("club_url"),
  headshotUrl: text("headshot_url"),
});

export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  location: text("location").notNull(),
  period: text("period").notNull(),
  description: jsonb("description").$type<string[]>().notNull(),
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  school: text("school").notNull(),
  degree: text("degree").notNull(),
  period: text("period").notNull(),
  gpa: text("gpa"),
  honors: jsonb("honors").$type<string[]>(),
});

export const skillCategory = pgTable("skill_category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  skills: jsonb("skills").$type<string[]>().notNull(),
});

export const insertProfileSchema = createInsertSchema(profile);
export const insertExperienceSchema = createInsertSchema(experience);
export const insertEducationSchema = createInsertSchema(education);
export const insertSkillCategorySchema = createInsertSchema(skillCategory);

export type Profile = typeof profile.$inferSelect;
export type Experience = typeof experience.$inferSelect;
export type Education = typeof education.$inferSelect;
export type SkillCategory = typeof skillCategory.$inferSelect;
