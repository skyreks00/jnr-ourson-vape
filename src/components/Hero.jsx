import { motion } from 'framer-motion';
import { ShoppingCart, Menu, Search } from 'lucide-react';

export const Hero = () => {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-charcoal/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="text-3xl font-black">
                <span className="text-electric-blue">JNR</span>
                <span className="text-white"> | </span>
                <span className="text-cotton-pink">OURSON</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#products" className="text-white hover:text-electric-blue transition-colors font-medium">
                Produits
              </a>
              <a href="#flavors" className="text-white hover:text-electric-blue transition-colors font-medium">
                Goûts
              </a>
              <a href="#about" className="text-white hover:text-electric-blue transition-colors font-medium">
                À propos
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-white" />
              </button>
              <button className="flex items-center gap-2 bg-gradient-to-r from-electric-blue to-cotton-pink px-4 py-2 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-electric-blue/50 transition-all">
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Panier</span>
              </button>
              <button className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-4 px-4 py-2 bg-electric-blue/10 border border-electric-blue/30 rounded-full">
                <span className="text-electric-blue font-semibold text-sm">🔥 +50 Saveurs Disponibles</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="text-white">JNR Vape</span>
                <br />
                <span className="bg-gradient-to-r from-electric-blue to-cotton-pink bg-clip-text text-transparent">
                  Premium Qualité
                </span>
              </h1>

              <p className="text-lg md:text-xl text-soft-gray/80 mb-8 max-w-xl">
                Découvrez notre collection exclusive de puffs JNR. 
                Plus de 50 saveurs uniques pour une expérience inoubliable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-electric-blue to-cotton-pink text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-electric-blue/30 transition-all hover:scale-105"
                >
                  Voir les produits
                </a>
                <a 
                  href="#flavors"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                >
                  Explorer les goûts
                </a>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-black text-gradient">50+</div>
                  <div className="text-sm text-soft-gray/60">Saveurs</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gradient">6000</div>
                  <div className="text-sm text-soft-gray/60">Bouffées</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gradient">100%</div>
                  <div className="text-sm text-soft-gray/60">Qualité</div>
                </div>
              </div>
            </motion.div>

            {/* Right - Mascot Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Glow effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-electric-blue/20 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cotton-pink/20 rounded-full blur-[120px] animate-pulse" />
                
                {/* Mascot - User should replace with actual image */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <img 
                    src="/mascot.png" 
                    alt="JNR Ourson Mascot"
                    className="w-full h-auto drop-shadow-2xl"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full aspect-square bg-gradient-to-br from-electric-blue/10 to-cotton-pink/10 border-2 border-white/10 rounded-3xl items-center justify-center">
                    <div className="text-center">
                      <div className="text-[120px] mb-4">🧸</div>
                      <p className="text-soft-gray/60 text-sm">Placez mascot.png dans /public</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-10 -left-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-xl"
                >
                  <div className="text-2xl mb-1">❄️</div>
                  <div className="text-xs font-bold text-white">Ice Fresh</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute top-20 -right-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-xl"
                >
                  <div className="text-2xl mb-1">🍓</div>
                  <div className="text-xs font-bold text-white">Fruity Mix</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
