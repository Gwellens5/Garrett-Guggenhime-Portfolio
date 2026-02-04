import { useProfile, useExperience, useEducation, useSkills } from "@/hooks/use-profile";
import { SectionHeader } from "@/components/SectionHeader";
import { ExperienceCard } from "@/components/ExperienceCard";
import { EducationCard } from "@/components/EducationCard";
import { SkillCategoryCard } from "@/components/SkillBadge";
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Link as LinkIcon, Download, ExternalLink } from "lucide-react";
import headshot from "@assets/DSC_0271_1770066342839.jpeg";
import resumePdf from "@assets/Garrett_Guggenhime_Resume_1770197368181.pdf";

export default function Home() {
  const { data: profile, isLoading: loadingProfile } = useProfile();
  const { data: experience, isLoading: loadingExperience } = useExperience();
  const { data: education, isLoading: loadingEducation } = useEducation();
  const { data: skills, isLoading: loadingSkills } = useSkills();

  if (loadingProfile || loadingExperience || loadingEducation || loadingSkills) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground animate-pulse">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-200/50 blur-3xl filter" />
          <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-slate-300/50 blur-3xl filter" />
        </div>

        <div className="container-width relative z-10 py-12 md:py-24">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
            
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                  Professional Portfolio
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight mb-6">
                  {profile.name}
                </h1>
                <h2 className="text-2xl md:text-3xl text-muted-foreground font-light mb-8">
                  {profile.title}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                  {profile.summary}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a 
                    href={resumePdf} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center"
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </a>
                  
                  {profile.linkedinUrl && (
                    <a 
                      href={profile.linkedinUrl.startsWith('http') ? profile.linkedinUrl : `https://${profile.linkedinUrl}`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-foreground border border-border rounded-lg font-semibold shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center"
                    >
                      <Linkedin className="w-5 h-5 text-[#0077b5]" />
                      LinkedIn
                    </a>
                  )}
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    {profile.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {profile.location}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Image Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative max-w-md lg:max-w-full"
            >
              <div className="relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-2xl shadow-slate-200 dark:shadow-slate-900 border-4 border-white dark:border-slate-800">
                <img 
                  src={headshot} 
                  alt={profile.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative dots grid */}
              <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE SECTION ================= */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-width">
          <SectionHeader 
            title="Professional Experience" 
            subtitle="My career journey and professional contributions."
            alignment="center"
          />
          
          <div className="mt-16 space-y-12 md:space-y-0 relative">
            {experience?.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= EDUCATION SECTION ================= */}
      <section className="section-padding bg-slate-50 dark:bg-slate-950">
        <div className="container-width">
          <SectionHeader title="Education" alignment="left" />
          
          <div className="grid md:grid-cols-2 gap-8">
            {education?.map((edu, index) => (
              <EducationCard key={edu.id} education={edu} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SKILLS SECTION ================= */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-width">
          <SectionHeader title="Skills & Expertise" alignment="center" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills?.map((category, index) => (
              <SkillCategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER / CTA SECTION ================= */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="container-width">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">Let's Connect</h2>
              <p className="mb-8 text-slate-400 max-w-md">
                Interested in working together? Feel free to reach out via email or connect with me on LinkedIn.
              </p>
              
              <div className="flex gap-4">
                 {profile.linkedinUrl && (
                  <a 
                    href={profile.linkedinUrl.startsWith('http') ? profile.linkedinUrl : `https://${profile.linkedinUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                <a 
                  href={`mailto:${profile.email}`}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="md:text-right">
              {profile.clubUrl && (
                <a 
                  href={profile.clubUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>DIPPNH Member Profile</span>
                </a>
              )}
              <div className="mt-8 text-sm text-slate-500">
                &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
