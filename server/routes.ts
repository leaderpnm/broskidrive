import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

function calculatePrice(distance: number): number {
  const BASE_PRICE = 8.00; // Prise en charge
  const PRICE_PER_KM = 2.50;
  return BASE_PRICE + (distance * PRICE_PER_KM);
}

function calculateDistance(startAddress: string, endAddress: string): { distance: number; duration: number } {
  // Mock distance calculation - in production this would use Google Maps API
  // For now, return a random distance between 5-50km and duration based on distance
  const distance = Math.round((Math.random() * 45 + 5) * 100) / 100;
  const duration = Math.round(distance * 2.2); // Approximate 2.2 minutes per km
  return { distance, duration };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Calculate distance and price
  app.post("/api/calculate-route", async (req, res) => {
    try {
      const { startAddress, endAddress } = req.body;
      
      if (!startAddress || !endAddress) {
        return res.status(400).json({ message: "Start and end addresses are required" });
      }

      const { distance, duration } = calculateDistance(startAddress, endAddress);
      const totalPrice = calculatePrice(distance);

      res.json({
        distance,
        duration,
        totalPrice: totalPrice.toFixed(2)
      });
    } catch (error) {
      res.status(500).json({ message: "Error calculating route" });
    }
  });

  // Create booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      
      // Calculate route details
      const { distance, duration } = calculateDistance(validatedData.startAddress, validatedData.endAddress);
      const totalPrice = calculatePrice(distance);

      const booking = await storage.createBooking({
        ...validatedData,
        distance: distance.toString(),
        duration,
        totalPrice: totalPrice.toFixed(2)
      });

      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Error creating booking" });
      }
    }
  });

  // Get all bookings
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching bookings" });
    }
  });

  // Get booking by ID
  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getBooking(id);
      
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Error fetching booking" });
    }
  });

  // Update booking status
  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const booking = await storage.updateBookingStatus(id, status);
      
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Error updating booking status" });
    }
  });

  // Create contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Error sending message" });
      }
    }
  });

  // Get all contact messages
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Error fetching messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
