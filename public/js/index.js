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

form.addEventListener("submit", e => {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: message.value
    },
    function() {}
  );

  console.log(message.innerHTML);
});

function success(position) {
  console.log(position);
  socket.emit("createLocationMessage", {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  });
}

function error() {
  alert("Unable to fetch location");
}

locationButton.addEventListener("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported on your browser");
  }

  navigator.geolocation.getCurrentPosition(success, error);
});
