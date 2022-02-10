const canvas = document.getElementById("jsCanvas");
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

const fillbtn = document.getElementById("paintMode");
const jsPaintHtmls = document.getElementsByClassName("controls-jsPaintControls__color");
//htmlcollection -> array
const jsPaints = Array.prototype.filter.call(jsPaintHtmls, function(collection) {
    return collection.nodeName === 'DIV';
  });
/*
es6버전 이상에서 사용
const jsPaints = Array.from(jsPaintHtmls)
*/


const ctx = canvas.getContext('2d');
const colorRange = document.getElementById("colorRange");
let lineWidth = colorRange.value;

let painting = false;
let fillMode = false;
//draw style
ctx.strokeStyle = "black";
ctx.lineWidth = lineWidth;

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(painting && !fillMode){
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
    ctx.lineWidth = event.target.value;
}

function onModeChange(event){
    if(!fillMode){
        fillMode = true;
        event.target.innerText = "FILL";
    }
    else{
        fillMode = false;
        event.target.innerText = "PAINT";
    }
}

function setStrokeStyle(event){
    //백그라운드 색 가져와서 strokeStyle set
    console.log("here");
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
}
function onMouseClick(event){
    if(fillMode){
        ctx.rect(0, 0, 500, 500);
        ctx.fill();
    }
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",onMouseDown);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",onMouseClick);
    
    colorRange.addEventListener("change",onChangeLineWidth);
    fillbtn.addEventListener("click",onModeChange);
    //색div마다 이벤트 mapping
    jsPaints.forEach((element) => {
        element.addEventListener("click",setStrokeStyle);
    });
}