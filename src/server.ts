// Test CI pipeline
import express, { Request, Response } from 'express';

const app = express();
const PORT: number = 3000;

// Route Health
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

// Route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'welcome to CI-CD-API' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});