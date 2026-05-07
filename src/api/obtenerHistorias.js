const WEBHOOK_GET_URL = 'https://n8n-production-f859.up.railway.app/webhook/get-stories';

export async function obtenerHistorias() {
  try {
    const response = await fetch(WEBHOOK_GET_URL);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error obteniendo historias:', error);
    return [];
  }
}