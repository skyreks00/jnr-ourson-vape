import { motion } from 'framer-motion';
import { Container, SectionTitle, GlassCard } from './UI';
import { Star, Quote } from 'lucide-react';
import { useState } from 'react';

const reviews = [
  {
    id: 1,
    name: 'Alex Chen',
    avatar: '👨',
    rating: 5,
    text: 'Absolutely incredible flavors! The Blue Ice is my go-to. Ourson6000 never disappoints.',
    location: 'Los Angeles, CA',
  },
  {
    id: 2,
    name: 'Maya Rodriguez',
    avatar: '👩',
    rating: 5,
    text: 'Premium quality and the design is fire 🔥 Best vape brand hands down.',
    location: 'Miami, FL',
  },
  {
    id: 3,
    name: 'Jordan Kim',
    avatar: '🧑',
    rating: 5,
    text: 'The packaging, the flavors, everything is next level. Worth every penny!',
    location: 'New York, NY',
  },
  {
    id: 4,
    name: 'Taylor Swift',
    avatar: '👱',
    rating: 5,
    text: 'Pink Storm is addictive! Love the futuristic vibe of this brand.',
    location: 'Austin, TX',
  },
];

const ReviewCard = ({ review, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <GlassCard className="h-full">
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-blue to-cotton-pink flex items-center justify-center text-2xl flex-shrink-0">
            {review.avatar}
          </div>

          {/* Name and rating */}
          <div className="flex-1">
            <h4 className="font-semibold text-white">{review.name}</h4>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          <Quote className="w-8 h-8 text-electric-blue/30" />
        </div>

        <p className="text-soft-gray/80 mb-4 leading-relaxed">
          {review.text}
        </p>

        <div className="text-sm text-soft-gray/50">
          📍 {review.location}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export const Reviews = () => {
  return (
    <section id="reviews" className="relative py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <SectionTitle className="text-gradient">
            What People Say
          </SectionTitle>
          <p className="text-xl text-soft-gray/60 max-w-2xl mx-auto">
            Join thousands of satisfied customers in the Ourson6000 community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <GlassCard className="text-center !p-6">
            <div className="text-4xl font-bold text-gradient mb-2">4.9★</div>
            <div className="text-sm text-soft-gray/60">Average Rating</div>
          </GlassCard>
          
          <GlassCard className="text-center !p-6">
            <div className="text-4xl font-bold text-gradient mb-2">10K+</div>
            <div className="text-sm text-soft-gray/60">Happy Customers</div>
          </GlassCard>
          
          <GlassCard className="text-center !p-6">
            <div className="text-4xl font-bold text-gradient mb-2">50+</div>
            <div className="text-sm text-soft-gray/60">Unique Flavors</div>
          </GlassCard>
          
          <GlassCard className="text-center !p-6">
            <div className="text-4xl font-bold text-gradient mb-2">100%</div>
            <div className="text-sm text-soft-gray/60">Satisfaction</div>
          </GlassCard>
        </motion.div>
      </Container>
    </section>
  );
};
