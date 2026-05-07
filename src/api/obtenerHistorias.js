export async function obtenerHistorias() {

  const WEBHOOK_URL = "TU_WEBHOOK_GET";

  try {

    const response = await fetch(WEBHOOK_URL);

    const data = await response.json();

    return data;

  } catch (error) {

    console.error("Error obteniendo historias:", error);

    return [];

  }

}