import { Router } from 'express';
import { publishMessage } from '../services/rabbitmq.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    await publishMessage(content);
    res.json({ success: true });
  } catch (error) {
    console.error('Error publishing message:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send message' 
    });
  }
});

export { router as messageRouter };