import { 
  type Profile, type Experience, type Education, type SkillCategory,
  type InsertProfile, type InsertExperience, type InsertEducation, type InsertSkillCategory
} from "@shared/schema";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  getExperience(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  getSkills(): Promise<SkillCategory[]>;
  
  // Seeding methods
  setProfile(profile: InsertProfile): Promise<Profile>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  createEducation(education: InsertEducation): Promise<Education>;
  createSkillCategory(skill: InsertSkillCategory): Promise<SkillCategory>;
}

export class MemStorage implements IStorage {
  private profile?: Profile;
  private experience: Map<number, Experience>;
  private education: Map<number, Education>;
  private skills: Map<number, SkillCategory>;
  private idCounter = 1;

  constructor() {
    this.experience = new Map();
    this.education = new Map();
    this.skills = new Map();
  }

  async getProfile(): Promise<Profile | undefined> {
    return this.profile;
  }

  async getExperience(): Promise<Experience[]> {
    return Array.from(this.experience.values());
  }

  async getEducation(): Promise<Education[]> {
    return Array.from(this.education.values());
  }

  async getSkills(): Promise<SkillCategory[]> {
    return Array.from(this.skills.values());
  }

  async setProfile(insertProfile: InsertProfile): Promise<Profile> {
    const profile: Profile = { ...insertProfile, id: 1 }; // Single profile
    this.profile = profile;
    return profile;
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const id = this.idCounter++;
    const experience: Experience = { ...insertExperience, id };
    this.experience.set(id, experience);
    return experience;
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const id = this.idCounter++;
    const education: Education = { ...insertEducation, id };
    this.education.set(id, education);
    return education;
  }

  async createSkillCategory(insertSkill: InsertSkillCategory): Promise<SkillCategory> {
    const id = this.idCounter++;
    const skill: SkillCategory = { ...insertSkill, id };
    this.skills.set(id, skill);
    return skill;
  }
}

export const storage = new MemStorage();
