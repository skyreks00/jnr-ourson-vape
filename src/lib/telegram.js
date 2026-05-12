const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

export async function sendTelegramNotification(orderDetails) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured')
    return { success: false, error: 'Not configured' }
  }

  const { orderNumber, phone, address, deliveryDate, items, totalPrice } = orderDetails

  const message = `
🛒 *NOUVELLE COMMANDE* 🛒

📋 *Commande:* ${orderNumber}
📞 *Téléphone:* ${phone}
📍 *Adresse:* ${address}
📅 *Livraison:* ${deliveryDate}

*Produits:*
${items.map(item => `• ${item.quantity}x ${item.flavor}`).join('\n')}

💰 *Total:* ${totalPrice}€

✅ *Paiement:* À la livraison (cash)
  `.trim()

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    })

    const data = await response.json()
    
    if (data.ok) {
      return { success: true }
    } else {
      console.error('Telegram API error:', data)
      return { success: false, error: data.description }
    }
  } catch (error) {
    console.error('Failed to send Telegram notification:', error)
    return { success: false, error: error.message }
  }
}
