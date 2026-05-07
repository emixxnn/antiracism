import * as d3 from "d3";

export function renderizarHistorias(historias) {

  const container = document.querySelector("#storiesContainer");

  container.innerHTML = "";

  // Protección por si no llega array
  if (!Array.isArray(historias)) {

    console.error("Historias no es un array:", historias);
    return;

  }

  historias
    .slice()
    .reverse()
    .forEach((historia, index) => {

      // Convertir emotions si llega como string
      const emociones =
        typeof historia.emotions === "string"
          ? JSON.parse(historia.emotions)
          : historia.emotions;

      const card = document.createElement("div");

      card.classList.add("story-card");

      card.innerHTML = `

        <div class="story-content">

          <div class="story-text">

            <h3>Resumen emocional</h3>

            <p>${historia.summary}</p>

            <div id="chart-${index}" class="mini-chart"></div>

          </div>

          <div class="story-image-container">

            <img
              src="data:image/png;base64,${historia.imageBase64}"
              class="story-image"
            />

          </div>

        </div>

      `;

      container.appendChild(card);

      renderizarMiniGrafica(
        emociones,
        `#chart-${index}`
      );

    });

}

function renderizarMiniGrafica(emotions, selector) {

  const traducciones = {

    anger: "enojo",
    sadness: "tristeza",
    fear: "miedo",
    frustration: "frustración",
    hope: "esperanza"

  };

  const data = Object.entries(emotions).map(([key, value]) => ({

    emotion: traducciones[key] || key,
    originalEmotion: key,
    value: value,

  }));

  const colores = {

    anger: "#ff4d4d",
    sadness: "#4d79ff",
    fear: "#9966cc",
    frustration: "#ff9933",
    hope: "#66cc66",

  };

  const width = 300;
  const height = 180;

  const svg = d3
    .select(selector)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.emotion))
    .range([0, width])
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - 20, 0]);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.emotion))
    .attr("y", (d) => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - 20 - y(d.value))
    .attr("fill", (d) => colores[d.originalEmotion]);

  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text((d) => d.emotion)
    .attr("x", (d) => x(d.emotion) + x.bandwidth() / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .style("font-size", "10px");

}