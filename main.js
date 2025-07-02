let canvas;
const curve_vertex = 100;
const waist_width = 10;
const left_side = 200;
const slope = 1.5;
const pointness = 0.05;
const textMargin = 50;
const textSharpness = 0.25;
let maxWidth = 0;
let maxHeight = 0;
let scrollAmount = 0;
const textLists = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025", "2026", "2027", "2028", "2029", "2030","2031","2032","2034","2035","2036","2037","2038","2039","2040","2041","2042","2043","2044","2045","2046","2047","2048","2049","2050"];

let touch_y_pos = 0;
let touch_deltaY = 0;

function setup(){
    document.addEventListener('wheel', function(event){scrolled(event, false);});
    document.addEventListener('touchmove', function(event){scrolled(event, true);});
    document.addEventListener('touchstart', touch_start);
    document.addEventListener('touchend', touch_end);
    maxHeight = window.innerHeight;
    maxWidth = window.innerWidth;
    canvas = createCanvas(maxWidth, maxHeight);
    canvas.parent('maindisplay');
    background(50);
    drawHyperbola();
    alignText(textLists, 0);
    noLoop(); // Stop draw loop
}

function scrolled(event, isMobile){
    let deltaY;
    if (isMobile){
        touch_deltaY = event.touches[0].clientY - touch_y_pos;
        touch_y_pos = event.touches[0].clientY;
        deltaY = -touch_deltaY*2;
    }else{
        deltaY = event.deltaY;
    }
    console.log("Scrolled");
    scrollAmount -= deltaY/240;
    const deltaT = scrollAmount;
    background(50);
    drawHyperbola();
    alignText(textLists, deltaT);
    
}

function touch_start(event){
    touch_y_pos = event.touches[0].clientY;
}

function touch_end(event){
    touch_deltaY = 0;
    touch_y_pos = event.touches[0].clientY;
}

function draw(){

}

function drawHyperbola(){
    const upperHeight = maxHeight/2 - Math.max(maxHeight*Math.tanh(0.04*scrollAmount)/2,0);
    fill(100);
    noStroke();
    rect(0, maxHeight/2 + upperHeight, maxWidth, maxHeight);
    rect(0, maxHeight/2 - upperHeight,maxWidth, upperHeight);
    rect(maxWidth - left_side, maxHeight/2-1, waist_width, maxHeight);

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
    beginShape();
    for(let i = curve_vertex; i >= -curve_vertex; i--){
        const t = maxt/curve_vertex * i;
        const deltax = calcXfromT(t);
        const deltay = calcYfromT(t);
        curveVertex(maxWidth + deltax - 2*left_side + waist_width, maxHeight / 2 - deltay);
    }
 
    endShape();
    noStroke();
    rect(0,0,maxWidth - calcXfromY(maxHeight/2), maxHeight);

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
    dT = deltaT;
    if(deltaT > textArray.length -1){
        dT = textArray.length-1;
        scrollAmount = textArray.length-1;
    }
    if(deltaT < 0){
        dT = 0;
        scrollAmount = 0;
    }
    for(let i = 0; i < textArray.length; i++){
        putText(textArray[i], dT - i);
    }
}

function calcXfromY(y){
    return Math.sqrt(1/(pointness**2 * slope**4)+y**2/(slope**2)) - 1/(pointness * slope**2) + left_side;
}

function calcYfromT(t){
    return Math.sinh(t)/(pointness * slope);
}

function calcXfromT(t){
    return (Math.cosh(t) - 1)/(pointness * slope**2) + left_side;
}

function calcTfromY(y){
    return Math.asinh(pointness * slope * y);
}

function calcTextHight(t){
    return 0.5 * maxHeight * Math.tanh(textSharpness * t);
}