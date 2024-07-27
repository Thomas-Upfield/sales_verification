import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

interface FormData {
    name: string;
    email: string;
}

app.post('/submit', (req: Request, res: Response) => {
    const { name, email }: FormData = req.body;
    console.log('Form submission received:');
    console.log('Name:', name);
    console.log('Email:', email);
    res.send('Form submitted successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
