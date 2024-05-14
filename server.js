const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log(`UNCAUGHT EXCEPTION!! SHUTTING DOWN`);
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(process.env);

// Replaces <password> in database connection string with actual password variable
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful'));
// .then(con => {
//   // console.log(con.connections);
//   console.log('DB connection successful');
// });

// Start the server
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!! SHUTTING DOWN!!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
