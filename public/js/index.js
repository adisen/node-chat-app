var socket = io();

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

  document.getElementById("messages").appendChild(li);
});

let form = document.getElementById("message-form");
let message = document.getElementById("message");

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
