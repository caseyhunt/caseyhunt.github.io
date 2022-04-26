let index;
let slideIndex = 1;

// document.getElementById("title").innerHTML =
// "Page location is " + window.location.href;

let subdomain = window.location.href.slice(window.location.href.lastIndexOf("/")+1, window.location.href.lastIndexOf("."));
console.log(subdomain);

fetch('../src/projects.json')
       .then(function (response) {
           return response.json();
       })
       .then(projects =>{
         console.log(projects);
         // parseData(projects);
         findSubdomain(projects);
       })
       .catch(function (err) {
           console.log('error: ' + err);
       });

function findSubdomain(projects){
  for(i=0; i<projects.projects.length; i++){
    if(projects.projects[i].subdomain == subdomain){
      index=i;
      console.log(projects.projects[i]);

      populatePage(projects.projects[i]);
    }
  }
}

function populatePage(project){
  console.log(project);

  document.getElementById("title").innerHTML += '<h1>' + project.name + '</h1>';
  document.getElementById("title").innerHTML += '<div id="collabs"></div>'
  for(i=0;i<(project.collaborators.length);i++){
    if(i==(project.collaborators.length-1)){
      document.getElementById("collabs").innerHTML += '<h3 class="collabs">' + project.collaborators[i] + '</h3>';

    }else{
      document.getElementById("collabs").innerHTML += '<h3 class="collabs">' + project.collaborators[i] + ',&nbsp;</h3>';
    }
  }

  for(i=0;i<((project.images.length)+1);i++){

    if(i==0){
      document.getElementById("slideshow").innerHTML += '<div class="slide fade"><img src="../assets/proj/' + project.mainimg +'" id="" alt=""></div>';
    }else{
      document.getElementById("slideshow").innerHTML += '<div class="slide fade"><img src="../assets/proj/' + project.images[i-1] + '" id="" alt=""></div>';
    }
  }
  //adding dot container for slideshow
document.getElementById("slideshow").innerHTML += '<div id="dotcont"></div>';
for(i=0;i<((project.images.length)+1);i++){
  document.getElementById('dotcont').innerHTML += '<span class="dot" onclick="currentSlide(' + (i+1) + ')"></span>';
}
  document.getElementById("slideshow").innerHTML +=   '<div id="arrows"><a class="prev" onclick="plusSlides(-1)">&#10094;</a><a class="next" onclick="plusSlides(1)">&#10095;</a></div>';
  document.querySelector("body").innerHTML += "<div id='description'></div>";
  for(i=0;i<project.description.length;i++){
    document.getElementById("description").innerHTML += '<p class="description">' + project.description[i] + '</p>';
  }
  showSlides(slideIndex);
}



//slideshow modified from W3 tutorial
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
