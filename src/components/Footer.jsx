import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-dark-charcoal py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-black mb-4">
              <span className="text-electric-blue">JNR</span>
              <span className="text-white"> | </span>
              <span className="text-cotton-pink">OURSON</span>
            </div>
            <p className="text-soft-gray/60 text-sm mb-6">
              Votre boutique premium de puffs JNR. 
              Plus de 50 saveurs disponibles.
            </p>
            
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-electric-blue/50 flex items-center justify-center transition-all"
              >
                <Instagram className="w-5 h-5 text-soft-gray hover:text-electric-blue transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-electric-blue/50 flex items-center justify-center transition-all"
              >
                <Facebook className="w-5 h-5 text-soft-gray hover:text-electric-blue transition-colors" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold text-white mb-4">Boutique</h3>
            <ul className="space-y-2">
              <li><a href="#products" className="text-soft-gray/60 hover:text-electric-blue transition-colors text-sm">Tous les produits</a></li>
              <li><a href="#products" className="text-soft-gray/60 hover:text-electric-blue transition-colors text-sm">Nouveautés</a></li>
              <li><a href="#products" className="text-soft-gray/60 hover:text-electric-blue transition-colors text-sm">Best sellers</a></li>
              <li><a href="#products" className="text-soft-gray/60 hover:text-electric-blue transition-colors text-sm">Promotions</a></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-white mb-4">Informations</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-soft-gray/60 hover:text-electric-blue transition-colors text-sm">À propos</a></li>
              <li><a href="#" className="text-soft-gray/60 hover:text-electric-blue transition-colors text-sm">Livraison</a></li>
              <li><a href="#" className="text-soft-gray/60 hover:text-electric-blue transition-colors text-sm">Paiement</a></li>
              <li><a href="#" className="text-soft-gray/60 hover:text-electric-blue transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-soft-gray/60 text-sm">
                <Mail className="w-4 h-4 text-electric-blue" />
                contact@jnrourson.com
              </li>
              <li className="flex items-center gap-2 text-soft-gray/60 text-sm">
                <Phone className="w-4 h-4 text-electric-blue" />
                +33 1 23 45 67 89
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="text-sm text-soft-gray/50">
              © 2024 JNR Ourson. Tous droits réservés.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-soft-gray/50 hover:text-electric-blue transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-soft-gray/50 hover:text-electric-blue transition-colors">
                CGV
              </a>
              <a href="#" className="text-soft-gray/50 hover:text-electric-blue transition-colors">
                Confidentialité
              </a>
            </div>
          </div>

          {/* Age warning */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
            <p className="text-xs text-yellow-400">
              ⚠️ ATTENTION : Ce produit contient de la nicotine. La nicotine crée une forte dépendance. 
              Interdit aux mineurs. Réservé aux adultes de +18 ans.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
