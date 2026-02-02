import { motion } from "framer-motion";
import type { SkillCategory } from "@shared/schema";

interface SkillCategoryProps {
  category: SkillCategory;
  index: number;
}

export function SkillCategoryCard({ category, index }: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-md"
    >
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 pb-3 border-b-2 border-primary/30">
        {category.name}
      </h3>
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, i) => (
          <span 
            key={i}
            className="px-4 py-2 bg-primary/15 text-primary dark:text-primary-foreground dark:bg-primary/30 text-sm font-semibold rounded-lg border border-primary/20 shadow-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
