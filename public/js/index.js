var socket = io();

// Get DOM elements
let form = document.querySelector("#message-form");
let message = document.querySelector("#message");
let messages = document.querySelector("#messages");
let locationButton = document.querySelector("#send-location");
let template = document.querySelector("#template").innerHTML;
let locationTemplate = document.querySelector("#location-template").innerHTML;

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

// New message
socket.on("newMessage", function(message) {
  let formattedTime = moment(message.createdAt).format("h:mm a");
  let rendered = Mustache.render(template, {
    text: message.text,
    createdAt: formattedTime,
    from: message.from
  });

  let div = document.createElement("div");
  div.innerHTML = rendered;

  messages.appendChild(div);
});

// New location message
socket.on("newLocationMessage", function(message) {
  let formattedTime = moment(message.createdAt).format("h:mm a");
  let rendered = Mustache.render(locationTemplate, {
    url: message.url,
    createdAt: formattedTime,
    from: message.from
  });

  let div = document.createElement("div");
  div.innerHTML = rendered;

  messages.appendChild(div);
});

// Form
form.addEventListener("submit", e => {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: message.value
    },
    function() {
      message.value = "";
    }
  );

  console.log(message.innerHTML);
});

// Location
function success(position) {
  locationButton.removeAttribute("disabled");
  locationButton.innerText = "Send Location";
  socket.emit("createLocationMessage", {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  });
}

function error() {
  locationButton.removeAttribute("disabled");
  locationButton.innerText = "Send Location";
  alert("Unable to fetch location");
}

locationButton.addEventListener("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported on your browser");
  }

  locationButton.setAttribute("disabled", "disabled");
  locationButton.innerText = "Sending Location";

  navigator.geolocation.getCurrentPosition(success, error);
});
