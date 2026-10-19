const express = require("express");
const noteModel = require("./models/notes.model");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public")); //Access the resources / files of Public folder

//post
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "note Created Successfully ",
  });
});

app.get("/api/notes", async (req, res) => {
  const note = await noteModel.find();
  res.status(200).json({
    message: "Notes Fetch succesfully",
    note,
  });
});

//delete
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Notes deleted succesfully",
  });
});

//patch

app.patch("/api/notes/:id", async (req, res) => {
  const note = await noteModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!note) return res.status(404).json({ message: "Note not found" });

  res.status(200).json({ message: "Note updated successfully", note });
});

module.exports = app;
