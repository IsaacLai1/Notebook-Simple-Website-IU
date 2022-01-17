function realTimeClock() {
  var rtClock = new Date();

  var hours = rtClock.getHours();
  var minute = rtClock.getMinutes();
  var second = rtClock.getSeconds();

  var ampm = hours < 12 ? "AM" : "PM";

  var displayHours = hours < 12 ? hours : hours - 12;

  displayHours = ("0" + displayHours).slice(-2);
  minute = ("0" + minute).slice(-2);
  second = ("0" + second).slice(-2);

  document.getElementById("clock").innerHTML =
    displayHours + " : " + minute + " : " + second + " " + ampm;

  var t = setTimeout(realTimeClock, 500);
}

// show form
function showForm() {
  console.log("Show");
  var x = document.getElementById("addNewForm");
  var y = document.getElementById("formDisplay");

  if (x.style.display === "none") {
    x.style.display = "block";
    y.innerHTML = "close form";
  } else {
    x.style.display = "none";
    y.innerHTML = "create new node";
  }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("my-close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
