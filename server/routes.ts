import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed Data
  if (!await storage.getProfile()) {
    await seedDatabase();
  }

  app.get(api.profile.get.path, async (_req, res) => {
    const profile = await storage.getProfile();
    res.json(profile || {});
  });

  app.get(api.experience.list.path, async (_req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

  app.get(api.education.list.path, async (_req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  return httpServer;
}

async function seedDatabase() {
  await storage.setProfile({
    name: "Garrett Guggenhime",
    title: "Student Entrepreneur | Aspiring Finance Professional",
    summary: "Resourceful and driven student entrepreneur eager to apply a track record of tenacity and creative problem solving to a career in finance with a top tier firm. Thrives in fast paced, analytical environments that demand adaptability and initiative. Known for turning ideas into outcomes through persistence, curiosity, and a strategic mindset.",
    email: "Garrettguggenhime27@gmail.com",
    phone: "(719) 217-3500",
    location: "Colorado Springs, CO",
    linkedinUrl: "https://www.linkedin.com/in/garrett-guggenhime-b5147929a",
    clubUrl: "https://dippnh.org/club-members",
    // This will be handled by frontend import, but we can store a reference if needed
    // or just let frontend component handle it. 
    // I'll leave it empty here or put a placeholder if the schema requires it.
    // Schema has headshotUrl as text.
    headshotUrl: "provided-in-frontend" 
  });

  // Experience
  await storage.createExperience({
    company: "FSG Investment Management",
    role: "Intern",
    location: "London, UK",
    period: "08/2025 - Current",
    description: [
      "Conduct in-depth financial and strategic research on potential investment and acquisition targets and participate in client calls.",
      "Delivered presentations to senior leadership recommending small-cap bank acquisition opportunities, contributing to the firm’s strategic growth pipeline."
    ]
  });

  await storage.createExperience({
    company: "Adapt-A-Mask",
    role: "Startup Founder",
    location: "Hanover, NH",
    period: "01/2025 - Current",
    description: [
      "Took an enhanced, gel filled, CPR mask from an idea to a final product that works 3x better than the industry standard. Patented products, and formed relationships with health care professionals, including the Hanover Fire Station and DHMC.",
      "100% of EMS providers who used the product felt more confident in the Adapt-A-Mask than the industry standard, and the significance testing revealed the product maintained a higher average pressure, indicating a significantly improved seal."
    ]
  });

  await storage.createExperience({
    company: "Cherry Creek Family Offices",
    role: "Intern",
    location: "Denver, CO",
    period: "07/2024 - 08/2024",
    description: [
      "Created presentations, market maps, and memos while developing financial modeling skills and participating in calls.",
      "Evaluated and compared REIT opportunities; presented recommendations to senior leadership at the company."
    ]
  });

  await storage.createExperience({
    company: "Satori Capital",
    role: "Private Equity Intern",
    location: "Fort Worth, TX",
    period: "06/2023 - 07/2023",
    description: [
      "Gained exposure to private equity investment strategies and the principles of conscious capitalism.",
      "Conducted preliminary due diligence on potential portfolio companies, evaluating alignment with the firm’s long-term, stakeholder-oriented investment philosophy."
    ]
  });

  // Extracurriculars (Added as Experience)
  await storage.createExperience({
    company: "Dartmouth Advising and Research for Tech Start-ups (DARTS)",
    role: "Founding Member / Project Manager",
    location: "Hanover, NH",
    period: "08/2023 - Current",
    description: [
      "Collaborate in teams of 2-5 on tasks for various tech startups. Currently, optimizing outreach for a startup called Magic Patterns by creating a grading scale for advertising success across different groups.",
      "In charge of reaching out to Dartmouth alumni, and other startup founders in order to source new projects.",
      "Navigate troubles of being a new club on campus including recruiting new members, programming events, and leading peers to create worthwhile functional final projects."
    ]
  });

  await storage.createExperience({
    company: "Dartmouth Ski Patrol",
    role: "Patroller",
    location: "Hanover, NH",
    period: "08/2023 - Current",
    description: [
      "Selected from over 150 applicants to join a group of 15 freshmen to patrol the Dartmouth Ski-Way 30 hours a week during the winter, and respond to medical emergencies with rapid decision making to assist and stabilize injured skiers.",
      "Led and trained 15 new patrollers each fall in medical response and interpersonal skills."
    ]
  });

  // Education
  await storage.createEducation({
    school: "Dartmouth College",
    degree: "Bachelor of Arts, Major in Economics and Computer Science; Minor in Spanish",
    period: "08/2023 - 06/2027",
    gpa: "3.9/4.0",
    honors: [
      "Gazette Best and Brightest Scholarship and Award Recipient",
      "Chickasaw Nation Outstanding Achievement Award in Academics",
      "Chickasaw Nation Honor Club"
    ]
  });

  await storage.createEducation({
    school: "Cheyenne Mountain High School",
    degree: "High School Diploma",
    period: "07/2019 - 05/2023",
    gpa: "4.5",
    honors: ["SAT Scores: 1550"]
  });

  // Skills
  await storage.createSkillCategory({
    name: "Technical",
    skills: ["Case Analysis", "Excel", "PowerPoint", "Word", "Business Analysis", "Market Mapping", "Emergency Medical Responder"]
  });

  await storage.createSkillCategory({
    name: "Computer Science",
    skills: ["Java", "Python", "C"]
  });

  await storage.createSkillCategory({
    name: "Languages",
    skills: ["Spanish (conversational)", "Chickasaw (Basic)"]
  });
  
  await storage.createSkillCategory({
    name: "Additional Involvement",
    skills: ["DIPP", "Psi Upsilon", "Dartmouth Leadership Attitudes and Behavior", "Club Lacrosse", "Chickasaw Nation Cultural Intern", "John D. Williams Cotillion Instructor", "Dartmouth Freeride Skiing", "National Space Foundation Volunteer", "Student Council"]
  });
}
