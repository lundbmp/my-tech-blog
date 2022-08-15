// required imports
const express = require("express");
const sequelize = require('./config/connection');
const routes = require('./controllers/index');
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create();

// express initial set up
const app = express();
const PORT = process.env.PORT || 3001;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(routes);

// connect to database
sequelize.sync({ force: false }).then(() => {
    console.log(`Now connected to database...`);
    // start express server
    app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}...`));
}); 
