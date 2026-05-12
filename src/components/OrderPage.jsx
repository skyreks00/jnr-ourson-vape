import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, MapPin, Package, Phone, CheckCircle, Calendar, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sendTelegramNotification } from '../lib/telegram';

export default function OrderPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavors, setSelectedFlavors] = useState(['']);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableFlavors, setAvailableFlavors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingFlavors, setLoadingFlavors] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const calendarRef = useRef(null);
  
  // Load flavors from database
  useEffect(() => {
    loadFlavors();
  }, []);
  
  const loadFlavors = async () => {
    try {
      const { data, error } = await supabase
        .from('flavors')
        .select('*')
        .gt('stock', 0) // Only show flavors in stock
        .order('featured', { ascending: false })
        .order('name');
      
      if (error) throw error;
      setAvailableFlavors(data || []);
    } catch (error) {
      console.error('Error loading flavors:', error);
      alert('Erreur lors du chargement des saveurs. Veuillez rafraîchir la page.');
    } finally {
      setLoadingFlavors(false);
    }
  };
  
  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);
  
  // Calendar helpers
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };
  
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  
  const formatDateForInput = (day) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, day);
    return date.toISOString().split('T')[0];
  };
  
  const selectDate = (day) => {
    const dateStr = formatDateForInput(day);
    setDeliveryDate(dateStr);
    setShowCalendar(false);
  };
  
  const changeMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const PRICE_PER_UNIT = 15.00;
  const totalPrice = (PRICE_PER_UNIT * quantity).toFixed(2);
  
  // Update flavor array when quantity changes
  const handleQuantityChange = (newQty) => {
    const qty = Math.max(1, Math.min(50, newQty));
    setQuantity(qty);
    setSelectedFlavors(prev => {
      const newFlavors = [...prev];
      if (qty > prev.length) {
        // Add empty slots
        while (newFlavors.length < qty) {
          newFlavors.push('');
        }
      } else {
        // Remove extra slots
        newFlavors.length = qty;
      }
      return newFlavors;
    });
  };
  
  const updateFlavor = (index, flavor) => {
    const newFlavors = [...selectedFlavors];
    newFlavors[index] = flavor;
    setSelectedFlavors(newFlavors);
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    
    // Check if all flavors are selected
    const hasEmptyFlavors = selectedFlavors.some(f => !f);
    if (hasEmptyFlavors || !address || !phone || !deliveryDate) {
      alert('Veuillez remplir tous les champs et sélectionner toutes les saveurs');
      return;
    }

    setLoading(true);

    try {
      // 1. Check stock availability for all selected flavors
      const { data: stockData, error: stockError } = await supabase
        .from('flavors')
        .select('name, stock')
        .in('name', selectedFlavors);

      if (stockError) throw stockError;

      // Create a map for quick lookup
      const stockMap = {};
      stockData.forEach(item => {
        stockMap[item.name] = item.stock;
      });

      // Count how many of each flavor is needed
      const flavorCounts = {};
      selectedFlavors.forEach(flavor => {
        flavorCounts[flavor] = (flavorCounts[flavor] || 0) + 1;
      });

      // Check if we have enough stock
      for (const [flavor, needed] of Object.entries(flavorCounts)) {
        const available = stockMap[flavor] || 0;
        if (available < needed) {
          alert(`Stock insuffisant pour ${flavor}. Disponible: ${available}, Demandé: ${needed}`);
          setLoading(false);
          return;
        }
      }

      // 2. Create the order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          phone,
          address: `${address}, Charleroi`,
          delivery_date: deliveryDate,
          quantity,
          total_price: parseFloat(totalPrice),
          status: 'pending',
          payment_status: 'cash_on_delivery'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderId = orderData.id;
      const newOrderNumber = orderData.order_number;

      // 3. Create order items
      const orderItems = selectedFlavors.map(flavor => ({
        order_id: orderId,
        flavor_name: flavor,
        quantity: 1,
        price: PRICE_PER_UNIT
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 4. Update stock for each flavor
      for (const [flavor, count] of Object.entries(flavorCounts)) {
        const { error: updateError } = await supabase.rpc('decrement_stock', {
          flavor_name: flavor,
          decrement_by: count
        });

        // Fallback if RPC doesn't exist
        if (updateError) {
          const currentStock = stockMap[flavor];
          await supabase
            .from('flavors')
            .update({ stock: currentStock - count })
            .eq('name', flavor);
        }
      }

      // 5. Send Telegram notification
      const orderDetails = {
        orderNumber: newOrderNumber,
        phone,
        address: `${address}, Charleroi`,
        deliveryDate: formatDate(deliveryDate),
        items: selectedFlavors.map((flavor, index) => ({
          quantity: 1,
          flavor
        })),
        totalPrice: totalPrice
      };

      await sendTelegramNotification(orderDetails);

      // 6. Show success message
      setOrderNumber(newOrderNumber);
      setOrderSuccess(true);
      
      // Reset form
      setQuantity(1);
      setSelectedFlavors(['']);
      setAddress('');
      setPhone('');
      setDeliveryDate('');
      
      // Reload flavors to update stock display
      loadFlavors();

    } catch (error) {
      console.error('Error creating order:', error);
      alert(`Erreur lors de la création de la commande: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-dark-charcoal via-dark-charcoal to-dark-charcoal" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-electric-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cotton-pink/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header - Branding */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-blue to-cotton-pink p-1 shadow-lg shadow-electric-blue/30">
            <div className="w-full h-full bg-dark-charcoal rounded-xl flex items-center justify-center">
              <span className="text-2xl">🧸</span>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black">
              <span className="text-electric-blue">JNR</span>
              <span className="text-white"> | </span>
              <span className="text-cotton-pink">OURSON 6000</span>
            </div>
            <div className="text-xs text-soft-gray/60">Premium Vape Shop</div>
          </div>
        </div>

        {/* Product Layout - Image Left + Order Form Right */}
        <form onSubmit={handleOrder}>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* LEFT - Product Image */}
            <div className="sticky top-8">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 to-cotton-pink/20 blur-3xl" />
                
                {/* Product container */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <img 
                    src={`${import.meta.env.BASE_URL}mascot.png`}
                    alt="JNR 6000 Puffs"
                    className="w-full h-auto drop-shadow-2xl"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden flex-col items-center justify-center min-h-[400px]">
                    <div className="text-[180px] leading-none mb-4">🧸</div>
                    <div className="text-2xl font-bold text-white mb-2">JNR 6000</div>
                    <p className="text-soft-gray/60 text-sm text-center">
                      Placez mascot.png dans /public
                    </p>
                  </div>

                  {/* Floating badges */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-br from-electric-blue to-cotton-pink p-3 rounded-xl shadow-lg">
                    <div className="text-center">
                      <div className="text-xs font-bold text-white">6000</div>
                      <div className="text-[10px] text-white/80">Puffs</div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-cotton-pink to-electric-blue p-3 rounded-xl shadow-lg">
                    <div className="text-center">
                      <div className="text-xs font-bold text-white">50+</div>
                      <div className="text-[10px] text-white/80">Flavours</div>
                    </div>
                  </div>
                </div>

                {/* Product badges below image */}
                <div className="flex flex-wrap gap-2 mt-6 justify-center">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-white">6000 Bouffées</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-white">50+ Saveurs</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-white">Premium</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT - Product Info + Order Form */}
            <div className="space-y-6 relative overflow-visible">
              {/* Product Title & Price */}
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                  JNR Falcon X 18000 Puffs
                </h1>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-5xl font-black text-gradient">€15.00</span>
                  <span className="text-soft-gray/60 text-sm">Taxes incluses</span>
                </div>
                <div className="flex items-center gap-2 text-sm mb-6">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                  <span className="text-soft-gray/60">(148 reviews)</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-white font-bold">Quantité</label>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/40 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-green-400 font-semibold">EN STOCK</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-14 h-14 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white font-bold text-xl transition-all active:scale-95"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-center text-2xl font-bold focus:border-cotton-pink focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-14 h-14 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white font-bold text-xl transition-all active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Flavor Selection - Multiple */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-xl">
                <label className="flex items-center gap-2 text-white font-bold mb-4">
                  <Package className="w-5 h-5 text-electric-blue" />
                  Saveurs {quantity > 1 && `(${quantity} puffs)`}
                </label>
                
                <div className="space-y-3">
                  {selectedFlavors.map((flavor, index) => (
                    <div key={index}>
                      <label className="block text-xs text-soft-gray/60 mb-1.5">
                        #{index + 1}
                      </label>
                      <select
                        value={flavor}
                        onChange={(e) => updateFlavor(index, e.target.value)}
                        required
                        disabled={loadingFlavors}
                        className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white font-medium focus:border-electric-blue focus:outline-none transition-all disabled:opacity-50"
                      >
                        <option value="" style={{backgroundColor: '#111111', color: '#999'}}>
                          {loadingFlavors ? 'Chargement...' : '-- Sélectionnez une saveur --'}
                        </option>
                        {availableFlavors.map((f) => (
                          <option key={f.id} value={f.name} style={{backgroundColor: '#111111', color: '#fff', padding: '8px'}}>
                            {f.name} {f.hot ? '🔥' : ''} {f.stock <= 5 ? `(${f.stock} restant${f.stock > 1 ? 's' : ''})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
                
                <p className="text-soft-gray/50 text-xs mt-3">
                  ✨ {availableFlavors.length} saveurs disponibles
                </p>
              </div>

              {/* Delivery Info */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-xl overflow-visible relative z-10">
                <label className="flex items-center gap-2 text-white font-bold mb-4">
                  <MapPin className="w-5 h-5 text-electric-blue" />
                  Informations de livraison
                </label>
                
                <div className="space-y-3">
                  <div>
                  <label className="block text-sm font-medium text-soft-gray/80 mb-2">Téléphone *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-gray/50" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+32 4XX XX XX XX"
                      className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-white placeholder-soft-gray/40 focus:border-electric-blue focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-soft-gray/80 mb-2">Adresse à Charleroi *</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="Rue, numéro, code postal..."
                    rows="3"
                    className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-soft-gray/40 focus:border-electric-blue focus:outline-none resize-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-soft-gray/80 mb-2">Date de livraison *</label>
                  <div className="relative z-50" ref={calendarRef}>
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-gray/50 z-10" />
                    <input
                      type="text"
                      value={deliveryDate ? formatDate(deliveryDate) : ''}
                      onClick={() => setShowCalendar(!showCalendar)}
                      readOnly
                      required
                      placeholder="Sélectionnez une date"
                      className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-white placeholder-soft-gray/40 focus:border-electric-blue focus:outline-none transition-all cursor-pointer"
                    />
                    
                    {/* Custom Calendar Dropdown */}
                    {showCalendar && (
                      <div className="absolute top-full mt-2 left-0 w-full min-w-[320px] bg-dark-charcoal border border-white/20 rounded-2xl p-4 shadow-2xl z-[999] animate-[slideDown_0.2s_ease-out]">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4">
                          <button
                            type="button"
                            onClick={() => changeMonth(-1)}
                            className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                          >
                            <ChevronLeft className="w-4 h-4 text-white" />
                          </button>
                          <div className="text-white font-bold text-sm">
                            {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }).charAt(0).toUpperCase() + currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }).slice(1)}
                          </div>
                          <button
                            type="button"
                            onClick={() => changeMonth(1)}
                            className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                          >
                            <ChevronRight className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        
                        {/* Days of week */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
                            <div key={day} className="text-center text-xs font-semibold text-soft-gray/60 py-1">
                              {day}
                            </div>
                          ))}
                        </div>
                        
                        {/* Calendar Days */}
                        <div className="grid grid-cols-7 gap-1">
                          {(() => {
                            const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
                            const days = [];
                            
                            // Empty cells before first day
                            for (let i = 0; i < startingDayOfWeek; i++) {
                              days.push(<div key={`empty-${i}`} className="aspect-square" />);
                            }
                            
                            // Days of the month
                            for (let day = 1; day <= daysInMonth; day++) {
                              const dateStr = formatDateForInput(day);
                              const dateObj = new Date(dateStr);
                              const isPast = dateObj < today;
                              const isSelected = deliveryDate === dateStr;
                              
                              days.push(
                                <button
                                  key={day}
                                  type="button"
                                  onClick={() => !isPast && selectDate(day)}
                                  disabled={isPast}
                                  className={`
                                    aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all
                                    ${isPast 
                                      ? 'text-soft-gray/20 cursor-not-allowed' 
                                      : isSelected
                                        ? 'bg-gradient-to-br from-electric-blue to-cotton-pink text-white font-bold shadow-lg'
                                        : 'text-white hover:bg-white/20 cursor-pointer'
                                    }
                                  `}
                                >
                                  {day}
                                </button>
                              );
                            }
                            
                            return days;
                          })()}
                        </div>
                        
                        {/* Close button */}
                        <button
                          type="button"
                          onClick={() => setShowCalendar(false)}
                          className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-all"
                        >
                          Fermer
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                  <div className="px-4 py-2.5 bg-yellow-600/20 border border-yellow-500/40 rounded-xl">
                    <p className="text-xs text-yellow-400 font-medium text-center flex items-center justify-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      Livraison uniquement à Charleroi
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Price Display */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-xl">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-white font-semibold text-lg">Total</span>
                  <span className="text-5xl font-black bg-gradient-to-r from-electric-blue via-purple-400 to-cotton-pink bg-clip-text text-transparent">
                    €{totalPrice}
                  </span>
                </div>
                <p className="text-xs text-soft-gray/60 text-right">TVA incluse</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || loadingFlavors}
                className="group relative w-full bg-gradient-to-r from-electric-blue via-cotton-pink to-electric-blue bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-black text-xl py-5 rounded-2xl shadow-2xl hover:shadow-electric-blue/50 transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      TRAITEMENT EN COURS...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      COMMANDER • €{totalPrice}
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Livraison rapide</span>
                </div>
              </div>

            </div>
          </div>
        </form>

        {/* Success Modal */}
        {orderSuccess && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="relative max-w-md w-full bg-gradient-to-br from-dark-charcoal to-dark-charcoal border border-white/20 rounded-3xl p-8 shadow-2xl">
              {/* Close button */}
              <button
                onClick={() => setOrderSuccess(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              >
                ✕
              </button>

              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Success Message */}
              <h2 className="text-2xl font-black text-center text-white mb-4">
                Commande Confirmée !
              </h2>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-3">
                <div className="text-center">
                  <p className="text-soft-gray/60 text-sm mb-1">Numéro de commande</p>
                  <p className="text-2xl font-black text-gradient">{orderNumber}</p>
                </div>
                
                <div className="border-t border-white/10 pt-3">
                  <p className="text-soft-gray/80 text-sm leading-relaxed">
                    Votre commande a été enregistrée avec succès ! Nous vous contacterons bientôt pour confirmer la livraison.
                  </p>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-2.5">
                  <p className="text-xs text-green-400 font-medium text-center">
                    💰 Paiement à la livraison (cash)
                  </p>
                </div>
              </div>

              {/* WhatsApp Contact Button */}
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=Bonjour, j'ai une question sur ma commande ${orderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-green-500/50"
              >
                <span className="text-2xl">💬</span>
                Contacter via WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=Bonjour, j'ai une question sur JNR 6000 Puffs`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-all hover:scale-110 active:scale-95"
          title="Contacter via WhatsApp"
        >
          <span className="text-3xl">💬</span>
        </a>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-soft-gray/60">
            <p>© 2026 JNR Ourson 6000   - Livraison à Charleroi</p>
          </div>
        </div>
      </div>
    </div>
  );
}
