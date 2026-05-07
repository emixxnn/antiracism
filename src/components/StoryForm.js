export function crearFormulario(onSubmit) {

  const formulario = document.querySelector("#formulario");

  formulario.innerHTML = `

    <div class="card">

      <h2>Comparte tu historia</h2>

      <textarea
        id="storyInput"
        placeholder="Escribe aquí una experiencia relacionada con racismo en el deporte..."
      ></textarea>

      <button id="analyzeBtn">
        Analizar Historia
      </button>

      <div
        id="loading-container"
        class="loading-container"
        style="display: none;"
      >

        <div class="spinner"></div>

        <p id="loading-text">
          Analizando emociones...
        </p>

      </div>

    </div>

  `;

  const boton = document.querySelector("#analyzeBtn");

  const mensajesCarga = [
    "Analizando emociones...",
    "Detectando patrones emocionales...",
    "Generando representación artística...",
    "Construyendo visualización emocional...",
    "Finalizando análisis..."
  ];

  boton.addEventListener("click", async () => {

    const texto = document.querySelector("#storyInput").value;

    if (!texto.trim()) {

      alert("Por favor escribe una historia.");

      return;

    }

    boton.disabled = true;

    boton.textContent = "Procesando...";

    const loadingContainer = document.querySelector("#loading-container");

    const loadingText = document.querySelector("#loading-text");

    loadingContainer.style.display = "block";

    let mensajeActual = 0;

    const intervalo = setInterval(() => {

      if (mensajeActual < mensajesCarga.length - 1) {
        mensajeActual++;
      }

      loadingText.textContent =
        mensajesCarga[mensajeActual];

    }, 2500);

    try {

      await onSubmit(texto);

      document.querySelector("#storyInput").value = "";

    } catch (error) {

      console.error(error);

      alert("Error procesando historia.");

    }

    clearInterval(intervalo);

    loadingContainer.style.display = "none";

    boton.disabled = false;

    boton.textContent = "Analizar Historia";

  });

}