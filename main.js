let canvas;
const curve_vertex = 100;
const waist_width = 100;
const slope = 1.5;
const pointness = 0.05;
const textMargin = 50;
const textSharpness = 0.25;
let maxWidth = 0;
let maxHeight = 0;
let scrollAmount = 0;
const textLists = ["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025", "2026", "2027", "2028", "2029", "2030","2031","2032","2034","2035","2036","2037","2038","2039","2040"];



function setup(){
    document.addEventListener('wheel', scrolled);
    document.addEventListener('touchmove', scrolled);
    maxHeight = window.innerHeight;
    maxWidth = window.innerWidth;
    canvas = createCanvas(maxWidth, maxHeight);
    canvas.parent('maindisplay');
    background(50);
    drawHyperbola();
    alignText(textLists, 0);
    noLoop(); // Stop draw loop
}

function scrolled(event){
    console.log("Scrolled");
    scrollAmount -= event.deltaY;
    const deltaT = scrollAmount / 240;
    background(50);
    drawHyperbola();
    alignText(textLists, deltaT);
    
}

function draw(){

}

function drawHyperbola(){
    const maxt = Math.ceil(calcTfromY(maxWidth / 2));
    //noFill();
    fill(10);
    stroke(255);
    strokeWeight(3);
    beginShape();
    
    for(let i = - curve_vertex; i <= curve_vertex; i++){
        const t = maxt/curve_vertex * i;
        const deltax = calcXfromT(t);
        const deltay = calcYfromT(t);
        curveVertex(maxWidth - deltax, maxHeight / 2 + deltay);
    }
 
    endShape();

}

function putText(textContent,t){
    fill(255);
    noStroke();
    textAlign(RIGHT, CENTER);
    const deltaY = calcTextHight(t);
    const textHeight = 0.8*(calcTextHight(t + 1) - calcTextHight(t-1))/2;
    textSize(textHeight);
    text(textContent,maxWidth - calcXfromY(deltaY) - textMargin, deltaY + maxHeight/2);
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
    return 0.5 * maxHeight * Math.tanh(textSharpness * t);
}