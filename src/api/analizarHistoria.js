export async function analizarHistoria(textoUsuario) {

  const WEBHOOK_URL = "https://n8n-production-f859.up.railway.app/webhook-test/racismo-story";

  try {

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        historia: textoUsuario,
      }),
    });

    const data = await response.json();

    return data;

  } catch (error) {

    console.error("Error conectando con n8n:", error);

    alert("Error procesando la historia.");

  }
}