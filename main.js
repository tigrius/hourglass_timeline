let canvas;
const curve_vertex = 10;


function setup(){
    canvas = createCanvas(window.outerWidth, window.outerHeight);
    canvas.parent('maindisplay');
    background(0);
    drawHyperbola();
}

function draw(){

}

function drawHyperbola(){
    const waist_width = 10;
    const slope = 2;
    const pointness = 1;
    const maxt = Math.asinh(pointness*slope*window.outerWidth / 2);
    noFill();
    stroke(255);
    beginShape();
    curve_vertex(window.outerWidth - waist_width, window.outerHeight / 2);
    for(let i = 0; i < curve_vertex; i++){
        const t = maxt/curve_vertex * i;
        const deltax = (Math.cosh(t) - 1)/(pointness * slope**2) + waist_width;
        const deltay = Math.sinh(t)/(pointness * slope);
        curveVertex(window.outerWidth - deltax, window.outerHeight / 2 + deltay);
        curveVertex(window.outerWidth - deltax, window.outerHeight / 2 - deltay);
    }
    endShape();

}
