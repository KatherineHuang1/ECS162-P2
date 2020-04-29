// Always include at top of Javascript file
"use strict";

getData();
//======================share post======================
function getData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/display", true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.addEventListener("load", function () {
    if (xhr.status == 200) {
      console.log("Data recieved: ", xhr.responseText);
      let data = JSON.parse(xhr.responseText);
      document.getElementById("serverImage").src = data.photo;
      document.getElementById("text").textContent = data.message;
      document.getElementById("text").className = data.font;
      document.getElementById("postcard").style.background = data.color;
      document.getElementsByClassName("imageWrapper")[0].style.border = "none";
    } else {
      console.log(xhr.responseText);
    }
  });

  xhr.send(null);
}
