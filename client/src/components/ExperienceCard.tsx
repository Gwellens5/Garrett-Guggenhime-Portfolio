import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import type { Experience } from "@shared/schema";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      {/* Timeline connector for larger screens */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
      
      <div className={`md:flex items-start justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}>
        
        {/* Date bubble on timeline */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full z-10 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_0_4px_rgba(var(--background),1)]" />

        {/* Content Side */}
        <div className="md:w-[calc(50%-2rem)] mb-8 md:mb-0">
          <div className="bg-card hover:bg-card/50 border border-border/40 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col gap-1 mb-4">
              <h3 className="text-xl font-bold text-foreground">{experience.role}</h3>
              <div className="text-primary font-semibold text-lg">{experience.company}</div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{experience.period}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
            </div>

            <ul className="space-y-2">
              {experience.description.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Empty side for layout balance */}
        <div className="md:w-[calc(50%-2rem)]" />
      </div>
    </motion.div>
  );
}
