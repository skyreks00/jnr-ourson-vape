import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Package, TrendingUp, Clock, CheckCircle, X, Edit2, Save, RefreshCw, Search, ChevronDown, ChevronUp, Phone, MapPin, Calendar } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [orderItems, setOrderItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [editingStock, setEditingStock] = useState({});
  const [tempStockValues, setTempStockValues] = useState({});
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'stock'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrders, setExpandedOrders] = useState({});
  const [hideCompleted, setHideCompleted] = useState(true);

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadData();
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([loadOrders(), loadFlavors()]);
    setLoading(false);
  };

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setOrders(data || []);

      // Charger les items pour chaque commande
      for (const order of data || []) {
        const { data: items } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', order.id);
        
        setOrderItems(prev => ({ ...prev, [order.id]: items || [] }));
      }
    } catch (error) {
      console.error('Erreur chargement commandes:', error);
    }
  };

  const loadFlavors = async () => {
    try {
      const { data, error } = await supabase
        .from('flavors')
        .select('*')
        .order('stock', { ascending: true });
      
      if (error) throw error;
      setFlavors(data || []);
    } catch (error) {
      console.error('Erreur chargement saveurs:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      console.log('Updating order', orderId, 'to status', newStatus);
      
      const { data, error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)
        .select();
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Update successful:', data);
      await loadOrders();
      
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
    }
  };

  const updateStock = async (flavorId, newStock) => {
    try {
      const { error } = await supabase
        .from('flavors')
        .update({ stock: parseInt(newStock) })
        .eq('id', flavorId);
      
      if (error) throw error;
      setEditingStock(prev => ({ ...prev, [flavorId]: false }));
      setTempStockValues(prev => ({ ...prev, [flavorId]: undefined }));
      await loadFlavors();
    } catch (error) {
      console.error('Erreur mise à jour stock:', error);
      alert('Erreur lors de la mise à jour du stock');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: 'En attente', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
      confirmed: { label: 'En attente', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
      preparing: { label: 'En attente', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
      delivering: { label: 'En attente', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
      delivered: { label: 'Terminée', color: 'bg-green-500/20 text-green-400 border-green-500/40' },
      cancelled: { label: 'Annulée', color: 'bg-red-500/20 text-red-400 border-red-500/40' },
    };
    return badges[status] || badges.pending;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleOrderExpanded = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // Filtrer les commandes selon la recherche
  const filteredOrders = orders.filter(order => {
    // Filtrer par hideCompleted
    if (hideCompleted && (order.status === 'delivered' || order.status === 'cancelled')) {
      return false;
    }
    
    // Filtrer par recherche
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      order.order_number.toLowerCase().includes(query) ||
      order.phone.toLowerCase().includes(query) ||
      order.address.toLowerCase().includes(query) ||
      order.status.toLowerCase().includes(query)
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-charcoal via-dark-charcoal to-dark-charcoal flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">🔒 Admin Panel</h1>
            <p className="text-soft-gray/60">Gestion JNR Ourson 6000</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-soft-gray/80 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-soft-gray/40 focus:border-electric-blue focus:outline-none"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-electric-blue to-cotton-pink text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-charcoal via-dark-charcoal to-dark-charcoal">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              <span className="text-electric-blue">Admin</span> Panel
            </h1>
            <p className="text-soft-gray/60">Gestion des commandes et du stock</p>
          </div>
          
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-electric-blue to-cotton-pink text-white'
                : 'bg-white/10 text-soft-gray/60 hover:bg-white/20'
            }`}
          >
            <Package className="w-5 h-5" />
            Commandes ({orders.length})
          </button>
          
          <button
            onClick={() => setActiveTab('stock')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'stock'
                ? 'bg-gradient-to-r from-electric-blue to-cotton-pink text-white'
                : 'bg-white/10 text-soft-gray/60 hover:bg-white/20'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Stock ({flavors.length})
          </button>
        </div>

        {/* Commandes Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Barre de recherche et filtres */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-xl">
              <div className="relative mb-3">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-gray/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par numéro, téléphone, adresse ou statut..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-soft-gray/40 focus:border-electric-blue focus:outline-none"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-xs text-soft-gray/60">
                  {filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''} trouvée{filteredOrders.length > 1 ? 's' : ''}
                </p>
                
                <button
                  onClick={() => setHideCompleted(!hideCompleted)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    hideCompleted
                      ? 'bg-electric-blue/20 text-electric-blue border border-electric-blue/40'
                      : 'bg-white/10 text-soft-gray/60 border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {hideCompleted ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  {hideCompleted ? 'Afficher terminées/annulées' : 'Cacher terminées/annulées'}
                </button>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <Package className="w-16 h-16 text-soft-gray/40 mx-auto mb-4" />
                <p className="text-soft-gray/60">
                  {searchQuery ? 'Aucune commande trouvée' : 'Aucune commande pour le moment'}
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => {
                const badge = getStatusBadge(order.status);
                const items = orderItems[order.id] || [];
                const isExpanded = expandedOrders[order.id];
                
                return (
                  <div
                    key={order.id}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden transition-all"
                  >
                    {/* Header compact - toujours visible */}
                    <div 
                      onClick={() => toggleOrderExpanded(order.id)}
                      className="p-4 cursor-pointer hover:bg-white/5 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          {/* Numéro de commande */}
                          <div>
                            <h3 className="text-lg font-black text-white">
                              {order.order_number}
                            </h3>
                            <p className="text-xs text-soft-gray/60">
                              {formatDate(order.created_at)}
                            </p>
                          </div>

                          {/* Badge statut */}
                          <div className={`px-3 py-1 rounded-lg border font-bold text-xs ${badge.color}`}>
                            {badge.label}
                          </div>

                          {/* Infos rapides */}
                          <div className="hidden md:flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-soft-gray/60">
                              <Phone className="w-3.5 h-3.5" />
                              {order.phone}
                            </div>
                            <div className="flex items-center gap-1 text-soft-gray/60">
                              <Package className="w-3.5 h-3.5" />
                              {order.quantity} puff{order.quantity > 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>

                        {/* Prix et bouton expand */}
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-black text-gradient">
                            {order.total_price}€
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-soft-gray/60" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-soft-gray/60" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Détails - visible quand expanded */}
                    {isExpanded && (
                      <div className="border-t border-white/10 p-4 space-y-4">
                        {/* Infos client détaillées */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <Phone className="w-4 h-4 text-electric-blue mt-1" />
                              <div>
                                <p className="text-xs text-soft-gray/60">Téléphone</p>
                                <p className="text-white font-medium">{order.phone}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Calendar className="w-4 h-4 text-electric-blue mt-1" />
                              <div>
                                <p className="text-xs text-soft-gray/60">Livraison</p>
                                <p className="text-white font-medium">
                                  {new Date(order.delivery_date).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-electric-blue mt-1" />
                            <div>
                              <p className="text-xs text-soft-gray/60">Adresse de livraison</p>
                              <p className="text-white font-medium">{order.address}</p>
                            </div>
                          </div>
                        </div>

                        {/* Produits commandés */}
                        <div className="bg-white/5 rounded-xl p-4">
                          <p className="text-sm font-bold text-white mb-3">
                            Produits commandés ({order.quantity})
                          </p>
                          <div className="space-y-1.5">
                            {items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span className="text-soft-gray/80">• {item.flavor_name}</span>
                                <span className="text-white font-medium">{item.price}€</span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-white/10 mt-3 pt-3 flex justify-between items-center">
                            <span className="text-white font-bold">Total</span>
                            <span className="text-3xl font-black text-gradient">
                              {order.total_price}€
                            </span>
                          </div>
                          <div className="mt-2">
                            <span className="text-xs text-soft-gray/60">
                              💰 {order.payment_status === 'cash_on_delivery' ? 'Paiement à la livraison' : 'Payé'}
                            </span>
                          </div>
                        </div>

                        {/* Actions de statut */}
                        <div className="flex flex-wrap gap-2">
                          {order.status !== 'delivered' && order.status !== 'cancelled' && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateOrderStatus(order.id, 'delivered');
                                }}
                                className="flex items-center gap-1.5 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-bold transition-all"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Commande terminée
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateOrderStatus(order.id, 'cancelled');
                                }}
                                className="flex items-center gap-1.5 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-bold transition-all"
                              >
                                <X className="w-4 h-4" />
                                Commande annulée
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Stock Tab */}
        {activeTab === 'stock' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flavors.map((flavor) => {
              const isEditing = editingStock[flavor.id];
              const tempStock = tempStockValues[flavor.id] ?? flavor.stock;
              
              return (
                <div
                  key={flavor.id}
                  className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border rounded-2xl p-4 shadow-xl ${
                    flavor.stock === 0
                      ? 'border-red-500/40'
                      : flavor.stock <= 5
                      ? 'border-orange-500/40'
                      : 'border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {flavor.name} {flavor.hot && '🔥'}
                      </h3>
                      <p className="text-xs text-soft-gray/60">{flavor.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          type="number"
                          min="0"
                          value={tempStock}
                          onChange={(e) => setTempStockValues(prev => ({
                            ...prev,
                            [flavor.id]: e.target.value
                          }))}
                          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-electric-blue focus:outline-none"
                        />
                        <button
                          onClick={() => updateStock(flavor.id, tempStock)}
                          className="bg-green-500/20 hover:bg-green-500/30 text-green-400 p-2 rounded-lg transition-all"
                        >
                          <Save className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingStock(prev => ({ ...prev, [flavor.id]: false }));
                            setTempStockValues(prev => ({ ...prev, [flavor.id]: undefined }));
                          }}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition-all"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className={`flex-1 text-center py-2 rounded-lg font-black text-2xl ${
                          flavor.stock === 0
                            ? 'bg-red-500/20 text-red-400'
                            : flavor.stock <= 5
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {flavor.stock}
                        </div>
                        <button
                          onClick={() => {
                            setEditingStock(prev => ({ ...prev, [flavor.id]: true }));
                            setTempStockValues(prev => ({ ...prev, [flavor.id]: flavor.stock }));
                          }}
                          className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
