// 5. package morgan
const morgan = require("morgan");
const path = require("path");
const express = require("express");
const usersRoute = require("./routes/usersRoute");
const carsRoute = require("./routes/carsRoute");
const sparepartsRoute = require("./routes/sparepartsRoute");
const driverRoutes = require("./routes/driverRoute");
// d. buat Dashboard Route
const dashboardRoutes = require("./routes/dashboardRoute");

const expressEJSLayout = require("express-ejs-layouts");

const errorHandling = require("./middleware/errorHandling");

const app = express();
const port = 3002;

// 1. Middleware Reading json from body (client)
app.use(express.json());

// k. Middleware : agar dari view engine form kebaca (request body) nya
app.use(express.urlencoded({ extended: false }));

// 6. panggil middleware: logging  (thirdy party package)
app.use(morgan());

// 2. contoh midhleware yang dibuat sendiri
app.use((req, res, next) => {
  console.log("incoming request ...");
  // batter loging dibawahnya
  next(); // defind penengah untuk lanjut (hendel sending request saat hit API)
});

//3. Middleware logging basic
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use((req, res, next) => {
  req.username = "FSW2";
  next();
});

// c. middleware : bisa express aplication kita membaca static file
app.use(express.static(`${__dirname}/public`));

// a. panggil view engine ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressEJSLayout);
app.set("layout", "layout");

// Middleware untuk memberikan default title
app.use((req, res, next) => {
  res.locals.title = "Default Title";
  next();
});

// b. buat url/API dashboard
app.get("/dashboard/admin/", async (req, res) => {
  try {
    // panggil respon render yang ejs
    // res.render("index", {
    //   greeting: "Hello FSW 2 dengan data dinamis, kalian luar biasa",
    // });
    res.render("layout", {
      title: "Dashboard",
      body: "<h1>Welcome to the Dashboard</h1>",
    });
  } catch (error) {
    console.log(error);
  }
});

// Health Check
app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: "Succeed",
      message: "Ping successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Ping failed",
      isSuccess: false,
      error: error.message,
    });
  }
});

// d. buat Dashboard Route
app.use("/dashboard/admin", dashboardRoutes);

// API Routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/cars", carsRoute);
app.use("/api/v1/spareparts", sparepartsRoute);
app.use("/api/v1/drivers", driverRoutes);

// 4. Middleware to handle page not found
app.use((req, res, next) => {
  // console.log("proses kapan request")
  // console.log(req.requestTime)
  // console.log("proses siapa yang request")
  // console.log(req.username)
  // console.log("proses API apa yang diminta")
  // console.log(req.originalUrl)
  res.status(404).json({
    status: "Failed",
    message: "API not found !",
    isSuccess: false,
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
