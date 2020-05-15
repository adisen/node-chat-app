const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { generateMessage } = require("./utils/message");

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

  socekt.on("createMessage", message => {
    io.emit("newMessage", generateMessage(message.from, message.text));

    // socekt.broadcast.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: Date.now()
    // });
  });

  socekt.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
