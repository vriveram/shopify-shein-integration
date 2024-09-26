const axios = require('axios');

// Información de Shopify
const shopifyToken = process.env.SHOPIFY_ACCESS_TOKEN; // Usa variable de 
entorno
const shopifyStore = process.env.SHOPIFY_STORE; // Usa variable de entorno

// URL de la API de Shopify para crear un webhook
const webhookUrl = 
`https://${shopifyStore}.myshopify.com/admin/api/2023-01/webhooks.json`;

// URL pública de Ngrok
const ngrokUrl = process.env.NGROK_URL; // Usa variable de entorno

// Datos para crear el webhook
const webhookData = {
  webhook: {
    topic: 'orders/create', // Puedes cambiar el evento si es necesario
    address: `${ngrokUrl}/webhooks/orders/create`,
    format: 'json'
  }
};

// Configuración de la solicitud
const config = {
  headers: {
    'X-Shopify-Access-Token': shopifyToken,
    'Content-Type': 'application/json'
  }
};

// Crear el webhook
axios.post(webhookUrl, webhookData, config)
  .then(response => {
    console.log('Webhook created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating webhook:', error.response ? 
error.response.data : error.message);
  });

