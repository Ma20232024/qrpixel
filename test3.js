const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let currentColor = "#ff0000";  // Color predeterminado (rojo)
const pixelSize = 20;  // Tamaño de los píxeles en el lienzo

// Crear una cuadrícula inicial en el lienzo
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ccc";
    for (let x = 0; x < canvas.width; x += pixelSize) {
        for (let y = 0; y < canvas.height; y += pixelSize) {
            ctx.strokeRect(x, y, pixelSize, pixelSize);
        }
    }
}

// Crear paleta de colores
const palette = document.getElementById('palette');
const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff", "#000000", "#808080", "#800000", "#808000", "#008000", "#800080", "#008080", "#000080", "#ffa500", "#a52a2a", "#7fffd4", "#dc143c"];
colors.forEach(color => {
    const colorDiv = document.createElement('div');
    colorDiv.className = 'color';
    colorDiv.style.backgroundColor = color;
    colorDiv.addEventListener('click', () => {
        document.querySelectorAll('.color').forEach(c => c.classList.remove('selected'));
        colorDiv.classList.add('selected');
        currentColor = color;
    });
    palette.appendChild(colorDiv);
});

drawGrid(); // Dibujar la cuadrícula inicial

// Función para manejar el dibujo sobre el lienzo
canvas.addEventListener("mousedown", function (event) {
    drawing = true;
    const x = Math.floor(event.offsetX / pixelSize) * pixelSize;
    const y = Math.floor(event.offsetY / pixelSize) * pixelSize;
    drawPixel(x, y);
});

canvas.addEventListener("mousemove", function (event) {
    if (drawing) {
        const x = Math.floor(event.offsetX / pixelSize) * pixelSize;
        const y = Math.floor(event.offsetY / pixelSize) * pixelSize;
        drawPixel(x, y);
    }
});

canvas.addEventListener("mouseup", function () {
    drawing = false;
});

// Función para dibujar un pixel
function drawPixel(x, y) {
    ctx.fillStyle = currentColor;
    ctx.fillRect(x, y, pixelSize, pixelSize);
}

// Generar un nuevo QR sobre el lienzo basado en la entrada
function generateQR() {
    const qrText = document.getElementById('qrInput').value;
    if (!qrText) {
        alert("Por favor, ingresa un texto o URL para generar el QR.");
        return;
    }

    // Crear el objeto QRCode en el contenedor 'qrcode'
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: qrText,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Limpiar el QR actual y generar uno nuevo
    qrcode.clear();  // Limpiar el QR anterior si existe
    qrcode.makeCode(qrText);  // Generar el nuevo QR
}

// Función para descargar la imagen
function downloadImage() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = image;
    link.download = "pixel_art_qr.png";
    link.click();
}
