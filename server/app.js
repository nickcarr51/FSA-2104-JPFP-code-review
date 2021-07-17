const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { Campuses, Students } = require("../db").models;

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/campuses", async (req, res, next) => {
  try {
    res.send(await Campuses.findAll({ include: Students }));
  } catch (err) {
    next(err);
  }
});

app.get("/students", async (req, res, next) => {
  try {
    res.send(await Students.findAll({ include: Campuses }));
  } catch (err) {
    next(err);
  }
});

app.get("/campuses/:id", async (req, res, next) => {
  try {
    res.send(await Campuses.findByPk(req.params.id, { include: Students }));
  } catch (err) {
    next(err);
  }
});

app.get("/students/:id", async (req, res, next) => {
  try {
    res.send(await Students.findByPk(req.params.id, { include: Campuses }));
  } catch (err) {
    next(err);
  }
});

app.post("/campuses", async (req, res, next) => {
  try {
    res.status(201).send(await Campuses.create(req.body));
  } catch (error) {
    next(error);
  }
});

app.post("/students", async (req, res, next) => {
  try {
    res.status(201).send(await Students.create(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = app;