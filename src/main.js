import "./styles/global.css";

import { crearFormulario } from "./components/StoryForm";
import { renderizarHistorias } from "./components/StoryCard";

import { analizarHistoria } from "./api/analizarHistoria";
import { obtenerHistorias } from "./api/obtenerHistorias";

const app = document.querySelector("#app");

app.innerHTML = `

  <div class="container">

    <section class="hero">

      <h1>
        Visualizando el Racismo en el Deporte con IA
      </h1>

      <p>
        Comparte una experiencia relacionada con racismo en el deporte y observa
        cómo la inteligencia artificial transforma emociones en arte visual.
      </p>

    </section>

    <section id="formulario"></section>

    <section>

      <h2 class="feed-title">
        Historias Analizadas
      </h2>

      <div id="storiesContainer"></div>

    </section>

  </div>

`;

async function cargarHistorias() {

  const historias = await obtenerHistorias();

  renderizarHistorias(historias);

}

crearFormulario(async (textoUsuario) => {

  const response = await analizarHistoria(textoUsuario);

  if (response.success) {

    await cargarHistorias();

  }

});

cargarHistorias();