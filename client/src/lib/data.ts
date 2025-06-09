// This file contains static data and utility functions for the Discovery Kids app

export const stockImageQueries = [
  "children learning science",
  "cartoon style educational illustrations", 
  "science experiments for kids",
  "space exploration for children",
  "nature and animals educational",
  "colorful learning materials"
];

export const topicCategories = [
  {
    id: "machines",
    name: "Machines & Inventions",
    description: "How do cars, computers, and robots work?",
    icon: "fas fa-cogs",
    color: "blue"
  },
  {
    id: "nature", 
    name: "Nature & Animals",
    description: "Why do flowers bloom and birds fly?",
    icon: "fas fa-leaf",
    color: "green"
  },
  {
    id: "space",
    name: "Space & Planets", 
    description: "How do rockets fly to the moon?",
    icon: "fas fa-rocket",
    color: "purple"
  },
  {
    id: "body",
    name: "Human Body",
    description: "How does your heart pump blood?", 
    icon: "fas fa-heartbeat",
    color: "red"
  },
  {
    id: "science",
    name: "Science Lab",
    description: "What makes things hot, cold, or glow?",
    icon: "fas fa-flask", 
    color: "yellow"
  },
  {
    id: "technology",
    name: "Technology",
    description: "How do phones and computers think?",
    icon: "fas fa-microchip",
    color: "gray"
  }
];

export const difficultyLevels = [
  { level: "Easy", color: "green", description: "Perfect for beginners" },
  { level: "Medium", color: "yellow", description: "For intermediate learners" },
  { level: "Advanced", color: "red", description: "Challenge yourself!" }
];

export const ageGroups = [
  { range: "6-8", description: "Simple concepts with lots of visuals" },
  { range: "9-11", description: "More detailed explanations and hands-on activities" },
  { range: "12-14", description: "Complex topics with real-world applications" }
];

export const safetyTips = [
  "Always ask an adult for help with experiments",
  "Read all instructions before starting", 
  "Have safety equipment ready (towels, water)",
  "Work in a well-ventilated area",
  "Never taste or eat experiment materials",
  "Wash hands thoroughly after experiments"
];

export const learningOutcomes = [
  "STEM concepts and critical thinking",
  "Problem-solving and creativity", 
  "Scientific method and observation skills",
  "Understanding of natural phenomena",
  "Technology literacy and digital skills",
  "Environmental awareness and conservation"
];
