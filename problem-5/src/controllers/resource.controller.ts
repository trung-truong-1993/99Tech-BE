import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const createResource = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const resource = await prisma.resource.create({ data: { name, description } });
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create resource' });
  }
};

export const getResources = async (_: Request, res: Response) => {
  try {
    const resources = await prisma.resource.findMany();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
};

export const getResource = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const resource = await prisma.resource.findUnique({ where: { id: Number(id) } });
    if (!resource) return res.status(404).json({ error: 'Resource not found' });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resource' });
  }
};

export const updateResource = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const resource = await prisma.resource.update({
      where: { id: Number(id) },
      data: { name, description }
    });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update resource' });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.resource.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete resource' });
  }
};
