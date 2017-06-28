// data repo needs to work with db for common admin tasks such as seeding, cleaning, etc
// import mongoose to work with mongo
// ddl = data definition layer

const setup = require("./tasks/setup");
const args = require("minimist")(process.argv.slice(2));
const dotenv = require("dotenv");
const seed = require("./tasks/seed");
const nuke = require("./tasks/nuke");
const protected = ['qa', 'prod'];
const MongoClient = require('mongodb').MongoClient;

const defaults = {
  env: args.env || "local"
};

const tasks = {
  setup: setup,
  seed: seed,
  nuke: nuke
}

dotenv.config({
  path: "./.delivery/applications/data/" + defaults.env + "/.env"
})

MongoClient.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, function(err, DB) {
  console.log(err, DB);
  tasks[args.task || function() {}](DB, args)
    .then(function() {
      DB.close();
      process.exit(0);// everything went wrong
    })
    .catch(err => {
      console.log(err);
      process.exit(1); // other than zero, went wrong
    })
})

// Debug database connection
// 


// absorb config with .env using .env module
// connect to DB...then initialize tasks
