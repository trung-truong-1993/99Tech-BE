import express from 'express';
import dotenv from 'dotenv';
import resourceRoutes from './routes/resource.routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/resources', resourceRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
