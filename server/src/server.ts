import express from 'express';
import mongoose from 'mongoose';
// import matchRoutes from './routes/matchRoutes';
// import playerRoutes from './routes/playerRoutes';
import scoreRoutes from './routes/scoreRoutes'; 
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    credentials: true, 
  }));
  ;


app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Routes
// app.use('/api/matches', matchRoutes);
// app.use('/api/players', playerRoutes);
app.use('/api/score', scoreRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
