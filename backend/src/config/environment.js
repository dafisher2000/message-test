export const config = {
  port: process.env.PORT || 3000,
  rabbitmq: {
    url: process.env.RABBITMQ_URL,
    queue: process.env.QUEUE_NAME || 'messages'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST']
  }
};