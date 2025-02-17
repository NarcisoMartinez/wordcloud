// 1. Suscribimos nuestra función principal al evento de "cambio de datos"
dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });

// 2. Función que dibuja la nube de palabras
function drawViz(data) {
  // a) Obtenemos las filas de datos
  const rows = data.tables.DEFAULT;

  // b) Seleccionamos el contenedor principal que Looker Studio inyecta (id="root")
  const container = document.getElementById('root');
  container.innerHTML = ''; // Limpiamos antes de dibujar

  // c) Creamos un <canvas> donde WordCloud dibujará la nube
  const canvas = document.createElement('canvas');
  canvas.width = container.offsetWidth || 600;  // Ancho
  canvas.height = container.offsetHeight || 400; // Alto
  container.appendChild(canvas);

  // d) Transformamos las filas en algo que WordCloud2.js entienda
  //    Cada fila es [palabra, valor]
  const wordArray = rows.map(row => {
    const word = row[0];       // la DIMENSIÓN (texto)
    const frequency = row[1];  // la MÉTRICA (número)
    return [String(word), Number(frequency)];
  });

  // e) Configuramos las opciones de WordCloud
  const options = {
    list: wordArray,
    weightFactor: 2, // Ajusta el tamaño base de las palabras
    fontFamily: 'Arial, sans-serif',
    color: () => '#' + Math.floor(Math.random() * 16777215).toString(16), // Color aleatorio
    backgroundColor: '#ffffff' // Fondo blanco
  };

  // f) Llamamos a WordCloud
  WordCloud(canvas, options);
}
