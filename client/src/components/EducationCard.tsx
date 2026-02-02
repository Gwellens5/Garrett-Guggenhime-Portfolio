import { GraduationCap, Calendar, Award } from "lucide-react";
import { motion } from "framer-motion";
import type { Education } from "@shared/schema";

interface EducationCardProps {
  education: Education;
  index: number;
}

export function EducationCard({ education, index }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg text-primary shrink-0">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-1">{education.school}</h3>
          <p className="text-lg text-muted-foreground mb-2">{education.degree}</p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            <span>{education.period}</span>
            {education.gpa && (
              <>
                <span className="mx-1">•</span>
                <span className="font-medium text-foreground">GPA: {education.gpa}</span>
              </>
            )}
          </div>

          {education.honors && education.honors.length > 0 && (
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-primary">
                <Award className="w-4 h-4" />
                <span>Honors & Awards</span>
              </div>
              <ul className="grid gap-1">
                {education.honors.map((honor, i) => (
                  <li key={i} className="text-sm text-muted-foreground pl-2 border-l-2 border-primary/20">
                    {honor}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
