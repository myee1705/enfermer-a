const courses = {
  // Primer Año
  "Bioestadística en Enfermería y Computación – ENF111": [],
  "Microbiología y Parasitología – BQM114": [],
  "Bioquímica – BQM113": [],
  "Introducción en Enfermería – ENF100": [],
  "Idioma Inglés y Quechua – LEN110": [],
  "Anatomía y Fisiología – MOR112": [],
  "Nutrición y Dietética – NUT110": [],
  "Estrategias de Aprendizaje – PED110": [],

  // Segundo Año
  "Epidemiología Enf. Tropicales – SAP210": ["Bioestadística en Enfermería y Computación – ENF111"],
  "Farmacología – FMC214": ["Bioquímica – BQM113"],
  "Salud Pública I – SAP200": ["Introducción en Enfermería – ENF100"],
  "Fundamentos de Enfermería – ENF200": ["Introducción en Enfermería – ENF100"],
  "Psicología del Desarrollo Humano – PSI211": ["Anatomía y Fisiología – MOR112"],
  "Didáctica Pedagogía – PED210": ["Estrategias de Aprendizaje – PED110"],

  // Tercer Año
  "Investigación de Enfermería I – ADM310": ["Epidemiología Enf. Tropicales – SAP210"],
  "Enfermería Médico Quirúrgico, Geriatría – ENF300": ["Farmacología – FMC214", "Fundamentos de Enfermería – ENF200"],
  "Salud Pública II – SAP310": ["Salud Pública I – SAP200", "Fundamentos de Enfermería – ENF200"],
  "Legislación Profesional y Ética – ADM311": ["Fundamentos de Enfermería – ENF200"],
  "Psiquiatría y Salud Mental – ENF310": ["Fundamentos de Enfermería – ENF200", "Psicología del Desarrollo Humano – PSI211"],

  // Cuarto Año
  "Enfermería Pediátrica – ENF400": ["Enfermería Médico Quirúrgico, Geriatría – ENF300"],
  "Enfermería Ginecobstetricia – ENF410": ["Enfermería Médico Quirúrgico, Geriatría – ENF300"],
  "Salud Pública III – SAP400": ["Salud Pública II – SAP310"],
  "Investigación en Enfermería II – ADM410": ["Psiquiatría y Salud Mental – ENF310"],
  "Internado Rotatorio - GRL001": [
    "Enfermería Pediátrica – ENF400",
    "Enfermería Ginecobstetricia – ENF410",
    "Investigación en Enfermería II – ADM410"
  ]
};

const approved = new Set();
const grid = document.getElementById("grid");

// Crear los elementos de los cursos
Object.keys(courses).forEach(name => {
  const div = document.createElement("div");
  div.textContent = name;
  div.classList.add("course");

  if (courses[name].length > 0) div.classList.add("locked");

  div.addEventListener("click", () => {
    if (div.classList.contains("locked") || div.classList.contains("approved")) return;

    div.classList.add("approved");
    approved.add(name);

    // Revisar qué cursos se desbloquean
    Object.entries(courses).forEach(([next, reqs]) => {
      if (reqs.length === 0) return;

      const nextDiv = [...document.querySelectorAll(".course")].find(d => d.textContent === next);
      if (!nextDiv.classList.contains("locked")) return;

      const allMet = reqs.every(req => approved.has(req));
      if (allMet) nextDiv.classList.remove("locked");
    });
  });

  grid.appendChild(div);
});
