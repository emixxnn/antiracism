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

    </div>

  `;

  const boton = document.querySelector("#analyzeBtn");

  boton.addEventListener("click", async () => {

    const texto = document.querySelector("#storyInput").value;

    if (!texto.trim()) {
      alert("Por favor escribe una historia.");
      return;
    }

    boton.disabled = true;
    boton.textContent = "Analizando...";

    await onSubmit(texto);

    document.querySelector("#storyInput").value = "";

    boton.disabled = false;
    boton.textContent = "Analizar Historia";

  });

}