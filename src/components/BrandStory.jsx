import { motion } from 'framer-motion';
import { Package, Shield, Truck, Award } from 'lucide-react';

const features = [
  {
    icon: Package,
    title: '6000 Bouffées',
    description: 'Longue durée',
  },
  {
    icon: Shield,
    title: 'Qualité Premium',
    description: 'Certifié & testé',
  },
  {
    icon: Truck,
    title: 'Livraison Rapide',
    description: '24-48h',
  },
  {
    icon: Award,
    title: '+50 Saveurs',
    description: 'Collection unique',
  },
];

export const BrandStory = () => {
  return (
    <section id="about" className="relative py-20 bg-gradient-to-b from-transparent via-electric-blue/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-electric-blue/10 to-cotton-pink/10 border border-white/10 p-8">
              <img 
                src="/mascot.png" 
                alt="JNR Ourson"
                className="w-full h-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full aspect-square items-center justify-center">
                <div className="text-[120px]">🧸</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Pourquoi Choisir{' '}
              <span className="bg-gradient-to-r from-electric-blue to-cotton-pink bg-clip-text text-transparent">
                JNR Ourson ?
              </span>
            </h2>
            
            <div className="space-y-4 text-lg text-soft-gray/80">
              <p>
                JNR Ourson vous offre une expérience de vape premium avec plus de 
                <strong className="text-white"> 50 saveurs uniques</strong> et 
                <strong className="text-white"> 6000 bouffées</strong> par appareil.
              </p>
              
              <p>
                Chaque produit est soigneusement conçu pour vous offrir une qualité 
                exceptionnelle et des saveurs intenses qui durent.
              </p>
              
              <p>
                Notre mascotte Ourson représente la douceur et la qualité de nos 
                produits - un compagnon de confiance pour tous vos moments.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <a 
                href="#products"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-electric-blue to-cotton-pink text-white font-bold rounded-xl hover:shadow-xl transition-all"
              >
                Voir les produits
              </a>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-electric-blue/30 transition-all"
            >
              <feature.icon className="w-10 h-10 text-electric-blue mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-soft-gray/60 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
