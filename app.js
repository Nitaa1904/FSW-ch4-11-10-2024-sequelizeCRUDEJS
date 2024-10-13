const morgan = require('morgan');
const express = require("express");
const usersRoute = require("./routes/usersRoute");
const carsRoute = require("./routes/carsRoute");
const sparepartsRoute = require("./routes/sparepartsRoute");
const driverRoutes = require("./routes/driverRoute");
const errorHandling = require('./middleware/errorHandling');

const app = express();
const port = 3001;

// Middleware Reading json from body (client)
app.use(express.json());

// middleware: logging  !1 thirdy party package
app.use(morgan());



// diatas routes agar kepanggi untuk semua
// pemakaian di proses upload file
// midhleware yang dibuat sendiri
app.use((req, res, next) => {
  console.log('incoming request ...')
  // batter loging
  // penengah untuk lanjut
  next();
})

//logging basic
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  // batter loging
  // penengah untuk lanjut
  next();
})

app.use((req, res, next) => {
  req.username = "FSW2"
  // batter loging
  // penengah untuk lanjut
  next();
})





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

// Routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/cars", carsRoute);
app.use("/api/v1/spareparts", sparepartsRoute);
app.use("/api/v1/drivers", driverRoutes);

// Error Handling Middleware
app.use(errorHandling);

// Middleware to handle page not found
app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "API not found !",
    isSuccess: false,
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
