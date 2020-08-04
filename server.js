const path = require("path");
const express = require("express");
const compression = require("compression");

const app = express();

const staticFilesPath = path.join(__dirname, "client", "build");
const indexHTMLFilePath = path.join(__dirname, "client", "build", "index.html");
const PORT = process.env.PORT || 5000;

app.use(compression());
app.use(express.static(staticFilesPath));

app.get("*", (req, res) => {
  res.sendFile(indexHTMLFilePath);
});

app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
