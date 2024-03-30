let canvas = document.getElementById("canvas");
let upperText;
let bottomText;

function GenerarMeme() {
  upperText = document.getElementById("upperText").value;
  bottomText = document.getElementById("bottomText").value;
  let ctx = canvas.getContext("2d");
  let ObjetoImagen = new Image();
  ObjetoImagen.onload = function () {
  
    canvas.width = ObjetoImagen.width * 1;
    canvas.height = ObjetoImagen.height * 1;
    ctx.drawImage(image, 0, 0);
    

    ctx.lineWidth = 5;
    ctx.font = '32pt Impact';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.lineJoin = 'round';

    bottomText = bottomText.toUpperCase();
    x = canvas.width / 2;
    y = canvas.height - canvas.height / 15;
    
    ctx.strokeText(bottomText, x, y);
    ctx.fillText(bottomText, x, y);

    upperText = upperText.toUpperCase();
    ctx.strokeText(upperText, x, 50);
    ctx.fillText(upperText, x, 50);
  };
  ObjetoImagen.src = document.getElementById("image").src;
};

// Cargar imagen desde el escritorio
const fileInput = document.getElementById('fileMeme');
fileInput.addEventListener('change', (e)=>{
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener('load', (e)=>{
    image.setAttribute('src', e.target.result);
    GenerarMeme();
  });
});

  function RedimencionarImagen(base64, maxWidth, maxHeight) {
    if (typeof (maxWidth) === 'undefined') var maxWidth = 500;
    if (typeof (maxHeight) === 'undefined') var maxHeight = 500;
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let CopiaCambas = document.createElement("canvas");
  let copyContext = CopiaCambas.getContext("2d");
  let ImgenTemporal = new Image();
  ImgenTemporal.src = base64;
  let ratio = 1;
  if(ImgenTemporal.width > maxWidth)
    ratio = maxWidth / ImgenTemporal.width;
  else if(ImgenTemporal.height > maxHeight)
    ratio = maxHeight / ImgenTemporal.height;
  CopiaCambas.width = ImgenTemporal.width;
  CopiaCambas.height = ImgenTemporal.height;
  copyContext.drawImage(ImgenTemporal, 0, 0);
  canvas.width = ImgenTemporal.width * ratio;
  canvas.height = ImgenTemporal.height * ratio;
  ctx.drawImage(CopiaCambas, 0, 0, CopiaCambas.width, CopiaCambas.height, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL();
}
GenerarMeme();

let imagen = document.getElementsByClassName("imgthumbnail");
for (i = 0; i < imagen.length; i++) {
  imagen[i].onclick = function () { document.getElementById("image").src = this.src; GenerarMeme(); };
}




function downloadCanvas(link, canvasId, filename) {
  link.href = document.getElementById(canvasId).toDataURL();
  link.download = filename;
}

document.getElementById('btnDescargar').addEventListener('click', function () {
  downloadCanvas(this, 'canvas', 'Meme.png');
}, false);

