import { motion } from 'framer-motion';
import { Container, SectionTitle, GlassCard } from './UI';

const flavorCategories = [
  {
    id: 1,
    name: 'Fruity',
    icon: '🍓',
    description: 'Sweet and tangy fruit blends',
    gradient: 'from-red-500 to-orange-500',
    count: 12,
  },
  {
    id: 2,
    name: 'Mint',
    icon: '🌿',
    description: 'Cool and refreshing menthol',
    gradient: 'from-green-400 to-emerald-500',
    count: 8,
  },
  {
    id: 3,
    name: 'Candy',
    icon: '🍭',
    description: 'Nostalgic sweet treats',
    gradient: 'from-cotton-pink to-purple-500',
    count: 10,
  },
  {
    id: 4,
    name: 'Ice',
    icon: '❄️',
    description: 'Arctic cold sensations',
    gradient: 'from-electric-blue to-blue-600',
    count: 9,
  },
];

const CategoryCard = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="group cursor-pointer"
    >
      <GlassCard className="h-full text-center relative overflow-hidden">
        {/* Background gradient on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="text-8xl mb-4"
          >
            {category.icon}
          </motion.div>

          {/* Category name */}
          <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-gradient transition-all">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-soft-gray/60 text-sm mb-4">
            {category.description}
          </p>

          {/* Count badge */}
          <div className="inline-flex items-center glass px-4 py-2 rounded-full border border-white/10">
            <span className="text-sm font-semibold text-electric-blue">
              {category.count} Flavors
            </span>
          </div>
        </div>

        {/* Glow effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl bg-gradient-to-br ${category.gradient} blur-xl -z-10`} />
      </GlassCard>
    </motion.div>
  );
};

export const FlavorCollection = () => {
  return (
    <section id="flavors" className="relative py-32 bg-gradient-to-b from-transparent via-electric-blue/5 to-transparent">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <SectionTitle className="text-gradient">
            Flavor Collections
          </SectionTitle>
          <p className="text-xl text-soft-gray/60 max-w-2xl mx-auto">
            Choose from our curated selection of premium flavor profiles
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {flavorCategories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <GlassCard className="inline-block !p-8 max-w-2xl">
            <h3 className="text-2xl font-bold mb-4 text-gradient">
              ✨ All Flavors Lab-Tested
            </h3>
            <p className="text-soft-gray/70">
              Every flavor undergoes rigorous quality testing to ensure the perfect 
              balance of taste, vapor production, and satisfaction. Premium ingredients only.
            </p>
          </GlassCard>
        </motion.div>
      </Container>
    </section>
  );
};
