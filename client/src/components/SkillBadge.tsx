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
      className="bg-card border border-border rounded-xl p-6"
    >
      <h3 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
        {category.name}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <span 
            key={i}
            className="px-3 py-1.5 bg-secondary/10 text-secondary-foreground text-sm font-medium rounded-md hover:bg-secondary/20 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
