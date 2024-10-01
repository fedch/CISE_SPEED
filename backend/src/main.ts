import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow requests from the frontend
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Start the server
  const port = process.env.PORT || 8082;
  await app.listen(port, () => {
    // Log the routes after the server has started
    const server = app.getHttpServer();
    const router = server._events.request._router;
    const availableRoutes: [] = router.stack
      .filter((r) => r.route)
      .map((r) => r.route.path);
    Logger.log(`Available routes: ${availableRoutes}`);

    console.log(`Server running on port ${port}`);
  });
}

bootstrap();
