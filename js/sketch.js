var canvas;
function setup() {
  canvas = createCanvas(windowWidth, 1000);
  canvas.position(0,0);
  //slider = createSlider(0, 255, 100);
  //slider.position(10, 370);

  //slider2 = createSlider(0, 255, 100);
  //slider2.position(200, 370);
}

function draw() {
  //let val = slider.value();
  //let num = slider2.value();
let num = 80*sin(mouseX/400);
  background(0);
  strokeWeight(3);
  strokeCap(ROUND);
  noFill();
  for(i=0; i<num; i++){
    stroke(i*6, 255-i*10, 160);
  beginShape();
  vertex(0,0);
  bezierVertex(i*10,10*i, 50*i, i-6*mouseY,0,10);
  //bezierVertex(200,10*i, 280+val*mouseX,10*i-6, 280,10*i-6);
  endShape();
  }

    for(i=0; i<num; i++){
    stroke(i*6, 255-i*10, 160);
  beginShape();
  vertex(width,height);
  bezierVertex(i*10,10*i, 50*i, i-60*mouseY,0,10);
  //bezierVertex(200,10*i, 280+val*mouseX,10*i-6, 280,10*i-6);
  endShape();
  }

      for(i=0; i<num/2; i++){
    stroke(i*6, 255-i*10, 160);
  beginShape();
  vertex(-100,height/2);
  bezierVertex(i*10,10*i, 50*i, i+60*mouseY,0,10);
  //bezierVertex(200,10*i, 280+val*mouseX,10*i-6, 280,10*i-6);
  endShape();
  }

        for(i=0; i<num/2; i++){
    stroke(i*6, 255-i*10, 160);
  beginShape();
  vertex(100,height+100);
  bezierVertex(i*10,100*i, 50*i, i-40*mouseY,i+width/2,0);
  //bezierVertex(200,10*i, 280+val*mouseX,10*i-6, 280,10*i-6);
  endShape();
  }
}
