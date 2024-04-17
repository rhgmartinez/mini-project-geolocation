const express = require('express');

const app = express ();
app.use(express.json());

const PORT = process.env.PORT || 3050;
const mp_router = require("./routes/mp_routes");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/status", (request, response) => {
   const status = {
      "Status": "Running"
   };
   
   response.send(status);
});

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/mini-project-node-js", mp_router);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});