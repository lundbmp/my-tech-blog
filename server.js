// required imports
const express = require("express");

// express initial set up
const app = express();
const PORT = process.env.PORT || 3001;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// start express server
app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}...`));
