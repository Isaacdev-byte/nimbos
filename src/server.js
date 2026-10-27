// Liga o servidor, serve a pasta public e registra as rotas.

const express = require("express");
const path = require("path");
const climaRoutes = require("./routes/clima");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve os arquivos de public/ (index.html, styles.css, app.js)
app.use(express.static(path.join(__dirname, "..", "public")));

// Rotas da API
app.use("/api/clima", climaRoutes);

app.listen(PORT, function () {
  console.log("Servidor rodando em http://localhost:" + PORT);
});