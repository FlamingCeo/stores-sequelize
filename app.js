require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const port = process.env.PORT || 3000;


//router
const authRouter = require('./routes/auth');


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('Test');
});

app.get('/migrate', (req, res) => {
  const db = require("./models");
    db.sequelize.sync()
      .then(() => {
        console.log("Synced db.");
        res.send('All database tables are now synced');
      })
      .catch((err) => {
        res.send("Failed to sync db: " + err.message);
        
      });
  
  });
//auth routes
app.use('/api/v1/auth', authRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async () => {
  try {
    await connectDB().authenticate();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
