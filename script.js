
const coursesByYear = {
  "año-1": {
    "Bioestadística en Enfermería y Computación – ENF111": [],
    "Microbiología y Parasitología – BQM114": [],
    "Bioquímica – BQM113": [],
    "Introducción en Enfermería – ENF100": [],
    "Idioma Inglés y Quechua – LEN110": [],
    "Anatomía y Fisiología – MOR112": [],
    "Nutrición y Dietética – NUT110": [],
    "Estrategias de Aprendizaje – PED110": []
  },
  "año-2": {
    "Epidemiología Enf. Tropicales – SAP210": ["Bioestadística en Enfermería y Computación – ENF111"],
    "Farmacología – FMC214": ["Bioquímica – BQM113"],
    "Salud Pública I – SAP200": ["Introducción en Enfermería – ENF100"],
    "Fundamentos de Enfermería – ENF200": ["Introducción en Enfermería – ENF100"],
    "Psicología del Desarrollo Humano – PSI211": ["Anatomía y Fisiología – MOR112"],
    "Didáctica Pedagogía – PED210": ["Estrategias de Aprendizaje – PED110"]
  },
  "año-3": {
    "Investigación de Enfermería I – ADM310": ["Epidemiología Enf. Tropicales – SAP210"],
    "Enfermería Médico Quirúrgico, Geriatría – ENF300": ["Farmacología – FMC214", "Fundamentos de Enfermería – ENF200"],
    "Salud Pública II – SAP310": ["Salud Pública I – SAP200", "Fundamentos de Enfermería – ENF200"],
    "Legislación Profesional y Ética – ADM311": ["Fundamentos de Enfermería – ENF200"],
    "Psiquiatría y Salud Mental – ENF310": ["Fundamentos de Enfermería – ENF200", "Psicología del Desarrollo Humano – PSI211"]
  },
  "año-4": {
    "Enfermería Pediátrica – ENF400": ["Enfermería Médico Quirúrgico, Geriatría – ENF300"],
    "Enfermería Ginecobstetricia – ENF410": ["Enfermería Médico Quirúrgico, Geriatría – ENF300"],
    "Salud Pública III – SAP400": ["Salud Pública II – SAP310"],
    "Investigación en Enfermería II – ADM410": ["Psiquiatría y Salud Mental – ENF310"]
  },
        "año-5": {
    "Internado Rotatorio - GRL001": [
      "Enfermería Pediátrica – ENF400",
      "Enfermería Ginecobstetricia – ENF410",
      "Investigación en Enfermería II – ADM410"
    ]
  }
};

let approved = new Set(JSON.parse(localStorage.getItem("aprobados") || "[]"));
const allCourses = {};

Object.entries(coursesByYear).forEach(([yearId, courses]) => {
  const container = document.getElementById(yearId);

  Object.entries(courses).forEach(([name, prereqs]) => {
    const div = document.createElement("div");
    div.textContent = name;
    div.classList.add("course");

    // 👇 Lógica corregida:
    if (approved.has(name)) {
      div.classList.add("approved");
    } else if (prereqs.length > 0 && !prereqs.every(req => approved.has(req))) {
      div.classList.add("locked");
    }

    container.appendChild(div);
    allCourses[name] = { element: div, prereqs };

    div.addEventListener("click", () => {
      if (div.classList.contains("locked") || div.classList.contains("approved")) return;

      div.classList.add("approved");
      approved.add(name);
      localStorage.setItem("aprobados", JSON.stringify([...approved]));

      // Desbloquear los cursos que dependen de este
      Object.entries(allCourses).forEach(([nextName, info]) => {
        if (!info.element.classList.contains("locked")) return;
        const ready = info.prereqs.every(req => approved.has(req));
        if (ready) info.element.classList.remove("locked");
      });
    });
  });
});
