import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
}

export function SectionHeader({ title, subtitle, alignment = "left" }: SectionHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${alignment === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <div className="w-20 h-1 bg-primary/20 rounded-full mb-6 mx-auto md:mx-0" 
             style={{ margin: alignment === 'center' ? '0 auto 1.5rem auto' : '0 0 1.5rem 0' }} 
        />
      )}
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0"
           style={{ margin: alignment === 'center' ? '0 auto' : '0' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
