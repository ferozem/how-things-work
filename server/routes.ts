import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Topics routes
  app.get("/api/topics", async (req, res) => {
    try {
      const topics = await storage.getAllTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topics" });
    }
  });

  app.get("/api/topics/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const topic = await storage.getTopicById(id);
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      res.json(topic);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topic" });
    }
  });

  // Videos routes
  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getAllVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  app.get("/api/videos/featured", async (req, res) => {
    try {
      const videos = await storage.getFeaturedVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured videos" });
    }
  });

  app.get("/api/videos/category/:category", async (req, res) => {
    try {
      const videos = await storage.getVideosByCategory(req.params.category);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos by category" });
    }
  });

  app.get("/api/videos/topic/:topicId", async (req, res) => {
    try {
      const topicId = parseInt(req.params.topicId);
      const videos = await storage.getVideosByTopicId(topicId);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos by topic" });
    }
  });

  // Games routes
  app.get("/api/games", async (req, res) => {
    try {
      const games = await storage.getAllGames();
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch games" });
    }
  });

  app.get("/api/games/category/:category", async (req, res) => {
    try {
      const games = await storage.getGamesByCategory(req.params.category);
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch games by category" });
    }
  });

  app.get("/api/games/topic/:topicId", async (req, res) => {
    try {
      const topicId = parseInt(req.params.topicId);
      const games = await storage.getGamesByTopicId(topicId);
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch games by topic" });
    }
  });

  // Experiments routes
  app.get("/api/experiments", async (req, res) => {
    try {
      const experiments = await storage.getAllExperiments();
      res.json(experiments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiments" });
    }
  });

  app.get("/api/experiments/category/:category", async (req, res) => {
    try {
      const experiments = await storage.getExperimentsByCategory(req.params.category);
      res.json(experiments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiments by category" });
    }
  });

  // Quizzes routes
  app.get("/api/quizzes", async (req, res) => {
    try {
      const quizzes = await storage.getAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });

  app.get("/api/quizzes/featured", async (req, res) => {
    try {
      const quiz = await storage.getFeaturedQuiz();
      if (!quiz) {
        return res.status(404).json({ message: "No featured quiz found" });
      }
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured quiz" });
    }
  });

  // Fun facts routes
  app.get("/api/fun-facts", async (req, res) => {
    try {
      const funFacts = await storage.getAllFunFacts();
      res.json(funFacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fun facts" });
    }
  });

  app.get("/api/fun-facts/featured", async (req, res) => {
    try {
      const funFact = await storage.getFeaturedFunFact();
      if (!funFact) {
        return res.status(404).json({ message: "No featured fun fact found" });
      }
      res.json(funFact);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured fun fact" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
