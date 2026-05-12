import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    alert('Merci de votre inscription !');
    setEmail('');
  };

  return (
    <section className="relative py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-electric-blue/20 to-cotton-pink/20 border border-white/10 p-12 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-cotton-pink/10" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-electric-blue to-cotton-pink rounded-full mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Restez Informé
            </h2>
            <p className="text-lg text-soft-gray/80 mb-8 max-w-xl mx-auto">
              Inscrivez-vous à notre newsletter pour recevoir les nouvelles saveurs, 
              promotions exclusives et actualités en avant-première.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  required
                  className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-white placeholder-soft-gray/50 outline-none focus:border-electric-blue/50 focus:bg-white/20 transition-all"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-electric-blue to-cotton-pink px-8 py-4 rounded-xl font-bold text-white hover:shadow-xl hover:shadow-electric-blue/30 transition-all whitespace-nowrap"
                >
                  S'inscrire
                </button>
              </div>
            </form>

            <p className="text-xs text-soft-gray/50 mt-4">
              Vos données sont protégées. Désinscription possible à tout moment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
