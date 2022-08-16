// required imports
const express = require("express");
const routes = require('./controllers/index');
const sequelize = require('./config/connection');
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create();
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// express initial set up
const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
    secret: 'secrets secrets are no fun',
    cookies: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(routes);

// connect to database
sequelize.sync({ force: false }).then(() => {
    console.log(`Now connected to database...`);
    // start express server
    app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}...`));
}); 
