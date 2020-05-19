const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

let users = new Users();

io.on("connection", socket => {
  console.log("a user connected");

  //On user join
  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) && !isRealString(params.room)) {
      return callback("Name and room name are required");
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit("updateUserList", users.getUserList(params.room));

    socket.emit(
      "newMessage",
      generateMessage("Admin", "Welcome to the chat app")
    );

    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        generateMessage("Admin", `${params.name} has joined`)
      );

    callback();
  });

  // On user send new message
  socket.on("createMessage", (message, callback) => {
    console.log("CreateMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback();
  });

  // On user send location
  socket.on("createLocationMessage", coords => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.latitude, coords.longitude)
    );
  });

  // On user disconnect
  socket.on("disconnect", () => {
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit(
        "newMessage",
        generateMessage("Admin", `${user.name} has left`)
      );
    }
  });
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
