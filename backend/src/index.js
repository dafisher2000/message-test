import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { messageRouter } from './routes/messages.js';
import { initializeRabbitMQ } from './services/rabbitmq.js';
import { errorHandler } from './middleware/errorHandler.js';
import { config } from './config/environment.js';

dotenv.config();

const app = express();

app.use(cors(config.cors));
app.use(express.json());
app.use('/messages', messageRouter);
app.use(errorHandler);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

async function startServer() {
  try {
    await initializeRabbitMQ();
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();