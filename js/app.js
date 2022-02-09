const canvas = document.getElementById("jsCanvas");
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

console.dir(canvas);
const ctx = canvas.getContext('2d');
const colorRange = document.getElementById("colorRange");
let lineWidth = colorRange.value;

let painting = false;

//draw style
ctx.strokeStyle = "black";
ctx.lineWidth = lineWidth;

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(painting){
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    else{
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}

function onMouseDown(event){
    painting = true;
}


function onChangeLineWidth(event){
    console.dir(event);
    console.log(colorRange.value);
    ctx.lineWidth = colorRange.value;
}



if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",onMouseDown);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    colorRange.addEventListener("change",onChangeLineWidth);
}