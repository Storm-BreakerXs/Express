const express = require("express");
const app = express();

// Middleware to check working hours
function checkWorkingHours(req, res, next) {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const currentHour = currentDate.getHours();

  if (
    currentDay >= 1 &&
    currentDay <= 5 &&
    currentHour >= 9 &&
    currentHour < 17
  ) {
    // Proceed if within working hours (Monday to Friday, 9:00 AM to 5:00 PM)
    next();
  } else {
    // Return an error message outside of working hours
    res
      .status(403)
      .send(
        "Sorry, our website is only available during working hours (Monday to Friday, 9:00 AM to 5:00 PM)."
      );
  }
}

// Use the middleware globally
app.use(checkWorkingHours);

// Set the view engine if using a template engine (optional)
// app.set('view engine', 'ejs');

// Static files middleware for CSS
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.send(`
        <html>
            <head><link rel="stylesheet" type="text/css" href="styles.css"></head>
            <body>
                <nav>
                    <a href="/">Home</a>
                    <a href="/services">Our Services</a>
                    <a href="/contact">Contact Us</a>
                </nav>
                <h1>Welcome to Our Website</h1>
                <p>This is the home page.</p>
            </body>
        </html>
    `);
});

// Services route
app.get("/services", (req, res) => {
  res.send(`
        <html>
            <head><link rel="stylesheet" type="text/css" href="styles.css"></head>
            <body>
                <nav>
                    <a href="/">Home</a>
                    <a href="/services">Our Services</a>
                    <a href="/contact">Contact Us</a>
                </nav>
                <h1>Our Services</h1>
                <p>We offer a variety of services to help you grow your business.</p>
            </body>
        </html>
    `);
});

// Contact Us route
app.get("/contact", (req, res) => {
  res.send(`
        <html>
            <head><link rel="stylesheet" type="text/css" href="styles.css"></head>
            <body>
                <nav>
                    <a href="/">Home</a>
                    <a href="/services">Our Services</a>
                    <a href="/contact">Contact Us</a>
                </nav>
                <h1>Contact Us</h1>
                <p>You can reach us at contact@ourwebsite.com.</p>
            </body>
        </html>
    `);
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
