var socket = io();

// Get DOM elements
let form = document.querySelector("#message-form");
let message = document.querySelector("#message");
let messages = document.querySelector("#messages");
let locationButton = document.querySelector("#send-location");
let usersList = document.querySelector("#users");
let template = document.querySelector("#template").innerHTML;
let locationTemplate = document.querySelector("#location-template").innerHTML;

// Scrolling feature
function scrollToBottom() {
  let newMessage = messages.lastElementChild;

  let clientHeight = messages.clientHeight;
  let scrollTop = messages.scrollTop;
  let scrollHeight = messages.scrollHeight;
  let newMessageHeight = newMessage.clientHeight;
  let lastMessageHeight = 0;
  newMessage.previousSibling
    ? (lastMessageHeight = newMessage.previousSibling.clientHeight)
    : (lastMessageHeight = 0);

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop = scrollHeight;
  }
}

socket.on("connect", () => {
  let params = deparam(window.location.search);
  console.log(params);

  socket.emit("join", params, function(err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      console.log("Joined");
    }
  });
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("updateUserList", function(users) {
  // console.log("User List", users);
  let ul = document.createElement("ul");
  users.forEach(function(user) {
    let li = document.createElement("li");
    li.textContent = user;
    ul.appendChild(li);
  });

  usersList.innerHTML = users;
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
  scrollToBottom();
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
  scrollToBottom();
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
