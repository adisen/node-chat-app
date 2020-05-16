const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { generateMessage, generateLocationMessage } = require("./utils/message");

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

io.on("connection", socekt => {
  console.log("a user connected");

  socekt.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app")
  );

  socekt.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New User joined")
  );

  socekt.on("createMessage", (message, callback) => {
    console.log("CreateMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback();
  });

  socekt.on("createLocationMessage", coords => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.latitude, coords.longitude)
    );
  });

  socekt.on("disconnect", () => {
    console.log("User disconnected");
    socekt.broadcast.emit(
      "newMessage",
      generateMessage("Admin", "User disconnected")
    );
  });
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
