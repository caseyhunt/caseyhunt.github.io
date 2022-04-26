console.log("hello");
let proj;





fetch('/rebuild/src/projects.json')
       .then(function (response) {
           return response.json();
       })
       .then(projects =>{
         console.log(projects);
         parseData(projects);
         proj = projects;
       })
       .catch(function (err) {
           console.log('error: ' + err);
       });

function parseData(projects){
  let i=0;
  while(i<projects.projects.length){
        console.log(i);
    console.log(projects.projects.length);

    console.log(projects.projects[i]);
    document.getElementById("grid").innerHTML += '<div class="row project" id="' + projects.projects[i].subdomain + '"><div class="projimg"><img src="assets/proj/' + projects.projects[i].mainimg +'"' + '></div>'+'<div class="description"><h2>' +projects.projects[i].name + '</h2><p class="subtitle">' + projects.projects[i].subtitle + '</p><p>' + projects.projects[i].abstract + '</p></div></div>';
    //document.getElementById("grid").innerHTML += '<div id=""><h2>' +projects.projects[i].name + '</h2><p class="subtitle">' + projects.projects[i].subtitle + '</p></p>' + projects.projects[i].abstract + '</p></div></div>';
    console.log( projects.projects[i].subdomain);
    eventListeners();
    i++;
  }
}

function eventListeners(){
    for(i=0; i<document.getElementsByClassName("project").length; i++){
      let projid = document.getElementsByClassName("project")[i].id;
      document.getElementsByClassName("project")[i].addEventListener("click", function(){projClick(projid)});
    }
}

function projClick(subdomain){
  console.log('project clicked ' + subdomain);
  window.location.href = '/rebuild/projects/' + subdomain + '.html';
}

function contactMe(){
  document.getElementById("contact").innerHTML = "<a onclick='copyEmail()'>casey.hunt (at) colorado.edu<a>";
  copyEmail();

}

function copyEmail(){
  console.log("copy email");
  navigator.clipboard.writeText("casey.hunt@colorado.edu");
  document.getElementById('copied').style.display ="block";
  setTimeout(() => {
  document.getElementById('copied').style.display ="none";

}, "1000")
}

function filterProjects(filter, type){
  console.log(filter);
  let projects = proj.projects;
  if(filter == "clear"){
    for(i=0;i<proj.projects.length;i++){
      document.getElementById(projects[i].subdomain).style.display = "flex";
    }if(type == "dropdown"){
      document.getElementsByClassName("dropbtn")[0].innerHTML = '<i class="fas fa-solid fa-filter fa-1x"></i> Sort by';
    }
  }else{
  for(i=0;i<proj.projects.length;i++){
    if(projects[i].category.includes(filter) == true){
      console.log(projects[i].subdomain + " contains " + filter);
      document.getElementById(projects[i].subdomain).style.display = "flex";
        document.getElementsByClassName("dropbtn")[0].innerHTML = '<i class="fas fa-solid fa-filter fa-1x"></i> ' + document.getElementById(filter).innerHTML;
    }else{
      document.getElementById(projects[i].subdomain).style.display = "none";

    }
  }
}
}
