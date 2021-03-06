window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const clearButton = document.querySelector('.clear');
    const ctx = canvas.getContext('2d');
    const color_picker = document.querySelector('.color-picker');
    const stroke_weight = document.querySelector('.stroke-weight');
   const eraser = document.querySelector(".eraser");
   const tools = document.querySelector('.tools');
   const strokePanel = document.querySelector('.stroke');
   const rect = canvas.getBoundingClientRect();
   let erasing = false;
stroke_weight.value = 3;

    function resizing() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
    resizing() 
    window.addEventListener('resize', resizing);

    let painting = false;

    function startPosition(e){
        painting = true;
        draw(e);
    }

    function finishedPosition(){
        painting = false;
        ctx.beginPath();
    }


    function draw(e){
        if(!painting) return;
        ctx.lineWidth = stroke_weight.value;
        ctx.lineCap = 'round';
        if(erasing){
            ctx.strokeStyle = '#fff'
        }else{
            ctx.strokeStyle = color_picker.value;
        }
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    erasing = false;
}

function useEraser(){
erasing = true;
}

function strokeShow(){

if(stroke_weight.value <=1){
    stroke_weight.value = 1;
}else if(stroke_weight.value >= 30){
    stroke_weight.value = 30;
}
    strokePanel.style.height = `${stroke_weight.value}px`;
}

function drawColor(e){
    erasing = false;
    draw(e);
}

    color_picker.addEventListener('click', drawColor);
    stroke_weight.addEventListener('change', strokeShow);
    eraser.addEventListener('click', useEraser);
    clearButton.addEventListener('click', clearCanvas);
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
})