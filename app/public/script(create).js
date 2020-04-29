// Always include at top of Javascript file
"use strict";
var current_color = "#e6e2cf";

// Add event listener to the file input element
document.getElementById("fileChooser").addEventListener("change", uploadFile);

//======================share post======================
function sharePost() {
  var data = {
    photo: document.getElementById("serverImage").src,
    message: document.getElementById("text").textContent,
    font: document.getElementById("text").className,
    color: current_color,
  };
  console.log(data);
  let dataJSON = JSON.stringify(data);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/display", true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(dataJSON);

  xhr.onloadend = function (e) {
    console.log(xhr.responseText);
    window.location = "./display.html";
  };
}

//======================upload image======================

// UPLOAD IMAGE using a post request
// Called by the event listener that is waiting for a file to be chosen
function uploadFile() {
  // get the file chosen by the file dialog control
  const selectedFileAll = document.getElementById("fileChooser").files;
  const selectedFile = selectedFileAll[0];
  console.log(selectedFileAll);
  // store it in a FormData object
  const formData = new FormData();
  // name of field, the file itself, and its name
  formData.append("newImage", selectedFile, selectedFile.name);

  // build a browser-style HTTP request data structure
  const xhr = new XMLHttpRequest();
  // it will be a POST request, the URL will this page's URL+"/upload"
  xhr.open("POST", "/upload", true);

  // callback function executed when the HTTP response comes back
  xhr.onloadend = function (e) {
    // Get the server's response body
    console.log("DEBUG: " + xhr.responseText);

    // now that the image is on the server, we can display it!
    let newImage = document.getElementById("serverImage");
    newImage.src = "../images/" + selectedFile.name;

    // change class to change style and change content
    document.getElementById("but").className = "replaceImg";
    document.getElementById("but").textContent = "Replace Image";
    document.getElementsByClassName("imageWrapper")[0].style.border = "none";

    console.log("upload image!");
  };

  // actually send the request
  xhr.send(formData);
}

//======================change font======================
function chBackFont(self) {
  //  DEBUG: console.log(document.getElementById("text").className);
  //  DEBUG: console.log(self.className);
  // font(class) of the text change
  document.getElementById("text").className = self.className;

  //change the icon
  document.getElementById("Indie").innerHTML = "&#9671 Indie Flower";
  document.getElementById("Dancing").innerHTML = "&#9671 Dancing Script";
  document.getElementById("Long").innerHTML = "&#9671 Long Cang";
  document.getElementById("Home").innerHTML = "&#9671 Homemade apple";

  if (self.className == "Indie") {
    self.innerHTML = "&#10070 Indie Flower";
  } else if (self.className == "Dancing") {
    self.innerHTML = "&#10070 Dancing Script";
  } else if (self.className == "Long") {
    self.innerHTML = "&#10070 Long Cang";
  } else if (self.className == "Home") {
    self.innerHTML = "&#10070 Homemade apple";
  }
}

//======================change color======================
function chBackColor(color, self) {
  // background color of the text box changed
  document.getElementById("postcard").style.background = color;
  current_color = color;
  //remove border
  var box = document.getElementsByClassName("box");
  for (var i = 0; i < box.length; i++) {
    box[i].style.border = "none";
  }
  // add border round
  self.style.border = "1px solid";
}

function mouseon(color, self) {
  // background color of the text box changed
  if (color == current_color) {
    return;
  }
  document.getElementById("postcard").style.background = color;
  // add dotted border
  self.style.border = "1px dotted";
}

function mouseout(self) {
  if (self.id == current_color) {
    return;
  }
  self.style.border = "none";
  document.getElementById("postcard").style.background = current_color;
}
