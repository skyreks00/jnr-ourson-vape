import { motion } from 'framer-motion';
import { ShoppingCart, Star, Filter, Search } from 'lucide-react';
import { useState } from 'react';
import { flavors, categories } from '../data/flavors';

const getCategoryColor = (category) => {
  const colors = {
    'JNR Special': 'from-electric-blue to-cotton-pink',
    'Ice': 'from-blue-400 to-cyan-400',
    'Fruity': 'from-pink-500 to-orange-400',
    'Candy': 'from-purple-400 to-pink-400',
    'Mint': 'from-green-400 to-emerald-500',
    'Soda': 'from-amber-400 to-orange-500',
  };
  return colors[category] || 'from-gray-400 to-gray-600';
};

const ProductCard = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
      className="group"
    >
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:border-electric-blue/50 hover:bg-white/10 transition-all duration-300 h-full">
        {/* Product Image */}
        <div className={`relative mb-4 rounded-xl bg-gradient-to-br ${getCategoryColor(product.category)} p-6 aspect-square flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
          <div className="absolute inset-0 bg-dark-charcoal/30" />
          <div className="relative z-10 text-center">
            <div className="text-white font-black text-2xl mb-2">JNR</div>
            <div className="text-white/80 text-sm">6000 PUFFS</div>
          </div>
          
          {product.hot && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              🔥 HOT
            </div>
          )}
          
          {product.featured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-dark-charcoal text-xs font-bold px-2 py-1 rounded-full">
              ⭐ NEW
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <div>
            <div className="text-xs text-electric-blue font-semibold mb-1">
              {product.category}
            </div>
            <h3 className="text-white font-bold text-lg leading-tight">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-white">
                {product.price}€
              </div>
              <div className="text-xs text-green-400 font-semibold">
                {product.stock ? '✓ En stock' : '✗ Rupture'}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-electric-blue to-cotton-pink p-3 rounded-xl hover:shadow-lg hover:shadow-electric-blue/50 transition-all"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFlavors = flavors.filter(flavor => {
    const matchesCategory = selectedCategory === 'all' || flavor.category === selectedCategory;
    const matchesSearch = flavor.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-white">Notre Collection</span>
          </h2>
          <p className="text-lg text-soft-gray/70">
            {filteredFlavors.length} saveurs disponibles
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-gray/50" />
            <input
              type="text"
              placeholder="Rechercher un goût..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-soft-gray/50 focus:border-electric-blue/50 focus:bg-white/10 transition-all outline-none"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-electric-blue to-cotton-pink text-white shadow-lg'
                    : 'bg-white/5 text-soft-gray hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFlavors.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredFlavors.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-xl text-soft-gray/60">
              Aucun produit trouvé
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
