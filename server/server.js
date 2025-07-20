const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")
const morgan = require('morgan')

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const produceRoutes = require('./routes/produceRoutes');

app.use('/api/users', userRoutes);
app.use('/api/produce', produceRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});
app.use(morgan("tiny"));


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`Server connected successfully at http://localhost:${PORT}`))