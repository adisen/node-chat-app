var socket = io();

// Get DOM elements
let form = document.querySelector("#message-form");
let message = document.querySelector("#message");
let messages = document.querySelector("#messages");
let locationButton = document.querySelector("#send-location");

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("newMessage", message);

  let li = document.createElement("li");
  li.innerText = `${message.from}: ${message.text}`;

  messages.appendChild(li);
});

socket.on("newLocationMessage", function(message) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.innerText = "My current Location";
  a.href = message.url;
  a.setAttribute("target", "__blank");
  li.innerText = `${message.from}: `;
  li.appendChild(a);

  messages.appendChild(li);
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
