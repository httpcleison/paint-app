const canvas = document.querySelector(".canvas");
const context = canvas.getContext('2d');
const inputColor = document.querySelector(".inputColor");
const divSize = document.querySelectorAll(".bar div");

canvas.width = 600;
canvas.height = 400;

let tamanhoPincel = 10;
let moverMouse = false;
let ferramenta = "pincel";

inputColor.addEventListener("change", () => {
    context.fillStyle = inputColor.value;
})

canvas.addEventListener("mousedown", ({clientX, clientY})=>{
    moverMouse = true;
    desenhar(clientX, clientY);
})

canvas.addEventListener("mousemove", ({clientX, clientY})=>{
    if(moverMouse){
        if(ferramenta == "pincel"){
            desenhar(clientX, clientY)
        }else if(ferramenta == "apagar"){
            apagar(clientX, clientY)
        }
    }
})

canvas.addEventListener("mouseup", ({clientX, clientY})=>{
    moverMouse = false;})

const desenhar = (x, y) => {
    context.beginPath();
    context.arc(x - canvas.offsetLeft, y - canvas.offsetTop, tamanhoPincel, 0, 2 * Math.PI)
    context.fill();
}

const apagar = (x, y) => {
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(x - canvas.offsetLeft, y - canvas.offsetTop, tamanhoPincel, 0, 2 * Math.PI);
    context.fill();
    context.globalCompositeOperation = "source-over";
}

document.querySelector("body").addEventListener("keypress", (ev)=>{
    if(ev.key == "p" && ferramenta == "pincel"){
        ferramenta = "apagar";
    }else if(ev.key == "p" && ferramenta == "apagar"){
        ferramenta = "pincel";
    }
})

divSize.forEach((div)=>{
    div.addEventListener("click", () => {
        if(div.classList[0] == "dezpx"){
            tamanhoPincel = 10;
            document.querySelector(".textoTamanho").innerText = tamanhoPincel+"px";
        }else if(div.classList == "vintepx"){
            tamanhoPincel = 20;
            document.querySelector(".textoTamanho").innerText = tamanhoPincel+"px";
        }else if(div.classList == "trintapx"){
            tamanhoPincel = 30;
            document.querySelector(".textoTamanho").innerText = tamanhoPincel+"px";
        }
    })
})

document.querySelector(".textoTamanho").innerText = tamanhoPincel+"px";