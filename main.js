let canvas;
const curve_vertex = 100;
const waist_width = 100;
const slope = 1.5;
const pointness = 0.05;
const textMargin = 50;
const textSharpness = 0.3;


function setup(){
    canvas = createCanvas(window.outerWidth, window.outerHeight);
    canvas.parent('maindisplay');
    background(50);
    drawHyperbola();
    alignText(["2022","2023","2024","2025", "2026", "2027", "2028", "2029", "2030"], 0);
}

function draw(){

}

function drawHyperbola(){
    
    const maxt = Math.ceil(calcTfromY(window.outerWidth / 2));
    //noFill();
    fill(10);
    stroke(255);
    strokeWeight(3);
    beginShape();
    
    for(let i = - curve_vertex; i <= curve_vertex; i++){
        const t = maxt/curve_vertex * i;
        const deltax = calcXfromT(t);
        const deltay = calcYfromT(t);
        curveVertex(window.outerWidth - deltax, window.outerHeight / 2 + deltay);
    }
 
    endShape();

}

function putText(textContent,t){
    fill(255);
    noStroke();
    textAlign(RIGHT, CENTER);
    const deltaY = calcTextHight(t);
    const textHeight = (calcTextHight(t + 1) - calcTextHight(t-1))/2;
    textSize(textHeight);
    text(textContent,window.outerWidth - calcXfromY(deltaY) - textMargin, deltaY + window.outerHeight/2);
}

function alignText(textArray, deltaT){
    for(let i = 0; i < textArray.length; i++){
        putText(textArray[i], deltaT + i);
    }
}

function calcXfromY(y){
    return Math.sqrt(1/(pointness**2 * slope**4)+y**2/(slope**2)) - 1/(pointness * slope**2) + waist_width;
}

function calcYfromT(t){
    return Math.sinh(t)/(pointness * slope);
}

function calcXfromT(t){
    return (Math.cosh(t) - 1)/(pointness * slope**2) + waist_width;
}

function calcTfromY(y){
    return Math.asinh(pointness * slope * y);
}

function calcTextHight(t){
    return 0.6 * window.innerHeight * Math.tanh(textSharpness * t);
}