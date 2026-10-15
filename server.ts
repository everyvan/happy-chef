import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Route: TheMealDB filter by ingredient (defaulting to chicken_breast)
  app.get('/api/recipes/external', async (req: Request, res: Response) => {
    try {
      const ingredient = (req.query.i as string) || 'chicken_breast';
      const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        return res.status(response.status).json({
          error: `TheMealDB API error with status ${response.status}`
        });
      }

      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error('Error fetching from TheMealDB API:', error);
      res.status(500).json({
        error: 'Failed to fetch recipes from serverless external connection',
        message: error.message
      });
    }
  });

  // API Route: TheMealDB lookup meal details by ID
  app.get('/api/recipes/external/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        return res.status(response.status).json({
          error: `TheMealDB API error with status ${response.status}`
        });
      }

      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error('Error looking up meal details from TheMealDB API:', error);
      res.status(500).json({
        error: 'Failed to lookup recipe details',
        message: error.message
      });
    }
  });

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'MakanPlan SG Serverless API',
      timestamp: new Date().toISOString()
    });
  });

  // Vite middlewares in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MakanPlan SG server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
