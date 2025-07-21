const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")
const morgan = require('morgan')

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // or '*', or your frontend URL
  credentials: true
}));
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const produceRoutes = require('./routes/produceRoutes');
// const collectionEventsRoutes = require('./routes/collectionEventsRoutes');
// const collectionPointsRoutes = require('./routes/collectionPointsRoutes');

app.use('/api/users', userRoutes);
app.use('/api/produce', produceRoutes);
// app.use('/api/collection-events', collectionEventsRoutes);
// app.use('/api/collection-points', collectionPointsRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});
app.use(morgan("tiny"));


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`Server connected successfully at http://localhost:${PORT}`))