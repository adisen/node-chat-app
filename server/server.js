const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

io.on("connection", socekt => {
  console.log("a user connected");

  socekt.emit("newMessage", {
    from: "User",
    text: "I am intrested",
    createdAt: Date.now()
  });

  socekt.on("createMessage", message => {
    console.log("createMessage", message);
  });

  socekt.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
