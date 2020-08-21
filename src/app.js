const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCoding = require("./utils/utils");
const forcasting = require("./utils/forcast");

const app = express();
const DirName = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../template/views");
const partials = path.join(__dirname, "../template/partials");

console.log("Hello" + templatePath);

app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partials);
app.use(express.static(DirName));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    help: "We're ready to help you",
    helper: "Im Rawand, please tell me your problem...",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You Must Enter address with query",
    });
  } else {
    geoCoding(
      req.query.address,
      (error, { latitude, longtude, place } = {}) => {
        if (error) {
          res.send({ error });
        } else {
          forcasting(latitude, longtude, (error, data) => {
            if (error) {
              res.send({ error });
            } else {
              const newData = JSON.parse(data);
              res.send({
                forcast: newData.body.weather[0].description,
                place,
                Address: req.query.address,
              });
            }
          });
        }
      }
    );
  }
});

app.get("/*", (req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("Server is running..");
});
