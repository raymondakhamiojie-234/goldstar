import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// --- AUTHENTICATION ---
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Middleware for Admin routes
const requireAdmin = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// --- VEHICLES ---
app.get('/api/vehicles', async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: { category: true, images: true }
    });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

app.get('/api/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: req.params.id },
      include: { category: true, images: true }
    });
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
});

app.post('/api/vehicles', requireAdmin, upload.array('images', 5), async (req, res) => {
  try {
    const { name, brand, model, year, price, condition, description } = req.body;
    let { categoryId } = req.body;
    if (categoryId === '') categoryId = undefined;
    
    // Parse files if they exist
    const files = req.files as Express.Multer.File[];
    const imageUrls = files?.map(f => `/uploads/${f.filename}`) || [];

    const vehicle = await prisma.vehicle.create({
      data: {
        name,
        brand,
        model,
        year: parseInt(year),
        price: parseFloat(price),
        condition,
        description,
        categoryId,
        images: {
          create: imageUrls.map(url => ({ url }))
        }
      },
      include: { images: true }
    });
    res.json(vehicle);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create vehicle' });
  }
});

// Add other basic GET endpoints
app.get('/api/categories', async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

app.get('/api/services', async (req, res) => {
  const services = await prisma.service.findMany();
  res.json(services);
});

app.get('/api/parts', async (req, res) => {
  const parts = await prisma.part.findMany();
  res.json(parts);
});

app.post('/api/enquiries', async (req, res) => {
  try {
    const enquiry = await prisma.enquiry.create({
      data: req.body
    });
    res.status(201).json(enquiry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit enquiry' });
  }
});

app.get('/api/enquiries', requireAdmin, async (req, res) => {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Gold Star API running on port ${port}`);
});
