let index;
let slideIndex = 1;
let proj;

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
         proj = projects;
         onYouTubeIframeAPIReady();
       })
       .catch(function (err) {
           console.log('error: ' + err);
       });

function findSubdomain(projects){
  for(i=0; i<projects.projects.length; i++){
    if(projects.projects[i].subdomain == subdomain){
      index=i;
      console.log(projects.projects[i]);
      proj = projects.projects[i];
      console.log('subdomain ' + i);
      populatePage(projects.projects[i]);
      break;
    }
  }
}

function populatePage(project){
  console.log(project);

  document.getElementById("title").innerHTML += '<h1>' + project.name + '</h1>';
  document.getElementById("title").innerHTML += '<div id="collabs"></div>';
  if(project.collaborators.length==1){
    document.getElementById("collabs").innerHTML += '<h3 class="collabs">Collaborator: &nbsp;</h3>'
  }else{
    document.getElementById("collabs").innerHTML += '<h3 class="collabs">Collaborators: &nbsp;</h3>'
  }
  for(i=0;i<(project.collaborators.length);i++){
    if(i==(project.collaborators.length-1)){
      document.getElementById("collabs").innerHTML += '<h3 class="collabs">' + project.collaborators[i] + '</h3>';

    }else{
      document.getElementById("collabs").innerHTML += '<h3 class="collabs">' + project.collaborators[i] + ',&nbsp;</h3>';
    }
  }

  for(i=0;i<((project.images.length)+1);i++){

    if(i==0){
      // document.getElementById("slideshow").innerHTML += '<div class="slide fade"><img src="../assets/proj/' + project.mainimg +'" id="" alt=""></div>';
      if(project.video[0] == "True"){
        if(project.video[1] == "True"){
        document.getElementById("slideshow").innerHTML +='<div class="slide fade"><div id="muteYouTubeVideoPlayer"></div> </div>'
        }else{
        document.getElementById("slideshow").innerHTML +='<div class="slide fade"><iframe id="player" type="text/html" width="640" height="390" src=' + project.video_url +'frameborder="0"></iframe>'

        }

      }
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

  if(project.published[0]=="True"){
  for(i=0;i<project.published[1]; i++){
  document.getElementsByTagName("body")[0].innerHTML += '<div id="publications">' + '<h2>Related Publications</h2>'+ '<div class="citation">' + '<p class="citation">' + project.citations[i][0] + '</p>' + '<a class="citation" href="'+ project.citations[i][1] + '">Download PDF</a>'+ '<a class="citation" href="'+ project.citations[i][3] + '" >' + project.citations[i][2]+ '</a>'+ '</div>'+'</div>';
  }}
  showSlides(slideIndex);
}

var player;
//youtube iframe for embed
function onYouTubeIframeAPIReady() {
  console.log(proj);
  
  player = new YT.Player('muteYouTubeVideoPlayer', {
    videoId: proj.projects[index].video_id,
    width: 560, // Player width (in px)
    height: 316, // Player height (in px)
    playerVars: {
      autoplay: 1, // Auto-play the video on load
      controls: 1, // Show pause/play buttons in player
      showinfo: 0, // Hide the video title
      modestbranding: 1, // Hide the Youtube Logo
      loop: 1, // Run the video in a loop
      fs: 0, // Hide the full screen button
      cc_load_policy: 0, // Hide closed captions
      iv_load_policy: 3, // Hide the Video Annotations
      autohide: 0, // Hide video controls when playing
    },
    events: {
      onReady: function (e) {
        e.target.mute();
      },
    },
  });
}


//slideshow modified from W3 tutorial
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
  if(slideIndex == 1){
    // console.log("play")
    player.playVideo();

}else{
    player.pauseVideo();
  }



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
