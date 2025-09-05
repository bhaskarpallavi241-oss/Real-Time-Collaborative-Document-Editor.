const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

app.use(cors());
app.use(express.json());
const Document = require("./models/Document");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
io.on("connection", async (socket) => {
  console.log("User connected:", socket.id);

  let document = await Document.findOne();
  if (!document) {
  document = await Document.create({ data: " " });
}
  socket.emit("document", document.data);
  socket.on("update", async (newData) => {
    await Document.findByIdAndUpdate(document._id, { data: newData });
    socket.broadcast.emit("document", newData);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
