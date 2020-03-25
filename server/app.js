const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("cache-control", "no-cache");
	next();
});

app.get("/members", (req, res) => {
	fs.readFile("members.json", "utf-8", (err, data) => {
		res.json(JSON.parse(data));
	});
});

app.post("/members", (req, res) => {
	fs.writeFile("members.json", JSON.stringify(req.body), (err) => {
		if (err) res.status(500).send(err.message);
		else res.send("Updated");
	});
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.listen(80);