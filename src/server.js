const express = require("express");
const path = require("path");
const createError = require("http-errors");
const app = express();

const router = require("./routes");
const config = require("./config");
const SpeakersService = require("./services/speakers");
const speakersService = new SpeakersService(config.data.speakers);

app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static("public"));
app.get("/favicon.ico", (req, res) => {
  return res.sendStatus(204);
});
if (app.get("env") === "development") {
  app.locals.pretty = true;
}
app.locals.title = config[app.get("env")].siteName;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
  try {
    res.locals.speakers = await speakersService.getNames();
    return next();
  } catch (error) {
    return next(error);
  }
});

app.use("/", router({ speakersService }));
app.use((req, res, next) => {
  return next(createError(404, "Page not Found"));
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  const statusCode = err.status || 500;
  res.locals.status = statusCode;
  res.locals.error = app.get("env") === "development" ? err : null;
  res.status(statusCode);
  return res.render("error");
});

app.listen(3000);
console.log("server is listening at port 3000");
