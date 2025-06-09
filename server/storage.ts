import { 
  topics, videos, games, experiments, quizzes, funFacts,
  type Topic, type InsertTopic,
  type Video, type InsertVideo,
  type Game, type InsertGame,
  type Experiment, type InsertExperiment,
  type Quiz, type InsertQuiz,
  type FunFact, type InsertFunFact
} from "@shared/schema";

export interface IStorage {
  // Topics
  getAllTopics(): Promise<Topic[]>;
  getTopicById(id: number): Promise<Topic | undefined>;
  createTopic(topic: InsertTopic): Promise<Topic>;
  
  // Videos
  getAllVideos(): Promise<Video[]>;
  getFeaturedVideos(): Promise<Video[]>;
  getVideosByCategory(category: string): Promise<Video[]>;
  getVideosByTopicId(topicId: number): Promise<Video[]>;
  createVideo(video: InsertVideo): Promise<Video>;
  
  // Games
  getAllGames(): Promise<Game[]>;
  getGamesByCategory(category: string): Promise<Game[]>;
  getGamesByTopicId(topicId: number): Promise<Game[]>;
  createGame(game: InsertGame): Promise<Game>;
  
  // Experiments
  getAllExperiments(): Promise<Experiment[]>;
  getExperimentsByCategory(category: string): Promise<Experiment[]>;
  createExperiment(experiment: InsertExperiment): Promise<Experiment>;
  
  // Quizzes
  getAllQuizzes(): Promise<Quiz[]>;
  getFeaturedQuiz(): Promise<Quiz | undefined>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  
  // Fun Facts
  getAllFunFacts(): Promise<FunFact[]>;
  getFeaturedFunFact(): Promise<FunFact | undefined>;
  createFunFact(funFact: InsertFunFact): Promise<FunFact>;
}

export class MemStorage implements IStorage {
  private topics: Map<number, Topic> = new Map();
  private videos: Map<number, Video> = new Map();
  private games: Map<number, Game> = new Map();
  private experiments: Map<number, Experiment> = new Map();
  private quizzes: Map<number, Quiz> = new Map();
  private funFacts: Map<number, FunFact> = new Map();
  
  private currentTopicId = 1;
  private currentVideoId = 1;
  private currentGameId = 1;
  private currentExperimentId = 1;
  private currentQuizId = 1;
  private currentFunFactId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize topics
    const topicsData: InsertTopic[] = [
      {
        name: "Machines & Inventions",
        description: "How do cars, computers, and robots work?",
        icon: "fas fa-cogs",
        color: "from-blue-500 to-blue-600",
        topicCount: 25,
        gameCount: 8,
        ageRange: "Ages 8-14",
        category: "machines"
      },
      {
        name: "Nature & Animals",
        description: "Why do flowers bloom and birds fly?",
        icon: "fas fa-leaf",
        color: "from-green-500 to-green-600",
        topicCount: 30,
        gameCount: 12,
        ageRange: "Ages 6-12",
        category: "nature"
      },
      {
        name: "Space & Planets",
        description: "How do rockets fly to the moon?",
        icon: "fas fa-rocket",
        color: "from-purple-500 to-purple-700",
        topicCount: 18,
        gameCount: 5,
        ageRange: "Ages 8-14",
        category: "space"
      },
      {
        name: "Human Body",
        description: "How does your heart pump blood?",
        icon: "fas fa-heartbeat",
        color: "from-red-500 to-red-600",
        topicCount: 22,
        gameCount: 6,
        ageRange: "Ages 7-13",
        category: "body"
      },
      {
        name: "Science Lab",
        description: "What makes things hot, cold, or glow?",
        icon: "fas fa-flask",
        color: "from-yellow-500 to-yellow-600",
        topicCount: 20,
        gameCount: 10,
        ageRange: "Ages 9-14",
        category: "science"
      },
      {
        name: "Technology",
        description: "How do phones and computers think?",
        icon: "fas fa-microchip",
        color: "from-gray-600 to-gray-800",
        topicCount: 15,
        gameCount: 7,
        ageRange: "Ages 10-14",
        category: "technology"
      }
    ];

    topicsData.forEach(topic => this.createTopic(topic));

    // Initialize videos
    const videosData: InsertVideo[] = [
      // Machines & Inventions Videos (Topic ID: 1)
      {
        title: "How Does a Car Engine Work?",
        description: "Discover the amazing world inside your car's engine and see how tiny explosions make it go!",
        duration: "6:45",
        thumbnailUrl: "https://images.unsplash.com/photo-1486326658981-ed68abe5868e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Machines",
        topicId: 1,
        ageRange: "Ages 8-14",
        featured: false
      },
      {
        title: "The Secret Life of Robots",
        description: "Meet different types of robots and learn how they help us in daily life!",
        duration: "5:20",
        thumbnailUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Machines",
        topicId: 1,
        ageRange: "Ages 6-12",
        featured: false
      },
      {
        title: "How Computers Think",
        description: "Journey inside a computer to see how it processes information faster than lightning!",
        duration: "7:10",
        thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Machines",
        topicId: 1,
        ageRange: "Ages 10-14",
        featured: true
      },
      {
        title: "Amazing Simple Machines",
        description: "Learn about levers, pulleys, and wheels that make our work easier every day!",
        duration: "4:55",
        thumbnailUrl: "https://images.unsplash.com/photo-1581092335878-0d92eba4ac0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Machines",
        topicId: 1,
        ageRange: "Ages 6-10",
        featured: false
      },

      // Nature & Animals Videos (Topic ID: 2)
      {
        title: "How Do Birds Fly?",
        description: "Explore the amazing secrets of flight and learn why birds can soar through the sky!",
        duration: "4:28",
        thumbnailUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Animals",
        topicId: 2,
        ageRange: "Ages 6-12",
        featured: true
      },
      {
        title: "Why Do Flowers Bloom?",
        description: "Discover the magical process that turns tiny seeds into beautiful flowers!",
        duration: "5:15",
        thumbnailUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Nature",
        topicId: 2,
        ageRange: "Ages 6-10",
        featured: false
      },
      {
        title: "Animal Superpowers",
        description: "Meet incredible animals with amazing abilities like echolocation and camouflage!",
        duration: "6:30",
        thumbnailUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Animals",
        topicId: 2,
        ageRange: "Ages 7-13",
        featured: false
      },
      {
        title: "How Trees Breathe",
        description: "Learn how trees make oxygen for us to breathe and why they're so important!",
        duration: "4:45",
        thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Nature",
        topicId: 2,
        ageRange: "Ages 8-12",
        featured: false
      },

      // Space & Planets Videos (Topic ID: 3)
      {
        title: "Journey to Mars",
        description: "Join our space adventure to learn how rockets travel to the red planet!",
        duration: "7:15",
        thumbnailUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Space",
        topicId: 3,
        ageRange: "Ages 8-14",
        featured: true
      },
      {
        title: "Why Don't We Float Away?",
        description: "Discover the invisible force of gravity that keeps us on Earth!",
        duration: "5:40",
        thumbnailUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Space",
        topicId: 3,
        ageRange: "Ages 6-12",
        featured: false
      },
      {
        title: "Solar System Safari",
        description: "Take a tour of all the planets and learn what makes each one special!",
        duration: "8:20",
        thumbnailUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Space",
        topicId: 3,
        ageRange: "Ages 7-14",
        featured: false
      },
      {
        title: "How Do Rockets Work?",
        description: "Blast off into learning about the science that sends rockets to space!",
        duration: "6:15",
        thumbnailUrl: "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Space",
        topicId: 3,
        ageRange: "Ages 8-14",
        featured: false
      },

      // Human Body Videos (Topic ID: 4)
      {
        title: "Your Amazing Heart",
        description: "See how your heart pumps blood through your body like a super engine!",
        duration: "5:25",
        thumbnailUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Human Body",
        topicId: 4,
        ageRange: "Ages 7-13",
        featured: false
      },
      {
        title: "How Do We See?",
        description: "Journey through your eyes to discover how they capture the world around you!",
        duration: "4:50",
        thumbnailUrl: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Human Body",
        topicId: 4,
        ageRange: "Ages 6-12",
        featured: false
      },
      {
        title: "The Brain Command Center",
        description: "Explore your brain - the amazing computer that controls everything you do!",
        duration: "6:35",
        thumbnailUrl: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Human Body",
        topicId: 4,
        ageRange: "Ages 8-14",
        featured: false
      },
      {
        title: "Why Do We Breathe?",
        description: "Learn how your lungs work like balloons to keep you alive and healthy!",
        duration: "4:20",
        thumbnailUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Human Body",
        topicId: 4,
        ageRange: "Ages 6-11",
        featured: false
      },

      // Science Lab Videos (Topic ID: 5)
      {
        title: "How Do Volcanoes Erupt?",
        description: "Discover the amazing science behind volcanic eruptions with our fun experiment!",
        duration: "5:32",
        thumbnailUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Science Lab",
        topicId: 5,
        ageRange: "Ages 8-14",
        featured: true
      },
      {
        title: "Magic of Magnets",
        description: "Explore the invisible forces that make magnets stick and repel each other!",
        duration: "4:40",
        thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Science Lab",
        topicId: 5,
        ageRange: "Ages 6-12",
        featured: false
      },
      {
        title: "Colors and Light",
        description: "See how white light splits into a rainbow and learn about the science of color!",
        duration: "5:55",
        thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Science Lab",
        topicId: 5,
        ageRange: "Ages 7-13",
        featured: false
      },
      {
        title: "States of Matter",
        description: "Watch water become ice and steam to learn about solids, liquids, and gases!",
        duration: "6:10",
        thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Science Lab",
        topicId: 5,
        ageRange: "Ages 8-14",
        featured: false
      },

      // Technology Videos (Topic ID: 6)
      {
        title: "How Does WiFi Work?",
        description: "Discover the invisible signals that connect your devices to the internet!",
        duration: "5:30",
        thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Technology",
        topicId: 6,
        ageRange: "Ages 10-14",
        featured: false
      },
      {
        title: "Inside Your Smartphone",
        description: "Take apart a phone to see all the tiny parts that make it so smart!",
        duration: "6:25",
        thumbnailUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Technology",
        topicId: 6,
        ageRange: "Ages 9-14",
        featured: false
      },
      {
        title: "How Do Video Games Work?",
        description: "Learn how computers create amazing worlds and characters in your favorite games!",
        duration: "7:05",
        thumbnailUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Technology",
        topicId: 6,
        ageRange: "Ages 8-14",
        featured: false
      }
    ];

    videosData.forEach(video => this.createVideo(video));

    // Initialize games
    const gamesData: InsertGame[] = [
      // Machines & Inventions Games (Topic ID: 1)
      {
        title: "Build Your Own Machine",
        description: "Create amazing inventions by putting gears, wheels, and motors together!",
        difficulty: "Medium",
        duration: "15 min",
        ageRange: "Ages 8-14",
        category: "Machines",
        topicId: 1,
        instructions: "Drag and drop components to build working machines. Test your creations and see how they work!"
      },
      {
        title: "Robot Factory Challenge",
        description: "Design and program your own robot to complete exciting missions!",
        difficulty: "Advanced",
        duration: "25 min",
        ageRange: "Ages 10-14",
        category: "Machines",
        topicId: 1,
        instructions: "Use coding blocks to program your robot. Make it move, pick up objects, and solve puzzles!"
      },
      {
        title: "Simple Machine Playground",
        description: "Experiment with levers, pulleys, and wheels to lift heavy objects!",
        difficulty: "Easy",
        duration: "10 min",
        ageRange: "Ages 6-10",
        category: "Machines",
        topicId: 1,
        instructions: "Try different combinations of simple machines to move the heaviest objects with the least effort!"
      },
      {
        title: "Car Design Studio",
        description: "Build the fastest, most efficient car and race it against others!",
        difficulty: "Medium",
        duration: "20 min",
        ageRange: "Ages 8-14",
        category: "Machines",
        topicId: 1,
        instructions: "Choose your engine, wheels, and body. Test your car on different tracks and improve your design!"
      },

      // Nature & Animals Games (Topic ID: 2)
      {
        title: "Animal Habitat Builder",
        description: "Create the perfect homes for different animals around the world!",
        difficulty: "Easy",
        duration: "15 min",
        ageRange: "Ages 6-12",
        category: "Nature",
        topicId: 2,
        instructions: "Match animals with their correct habitats. Add food, shelter, and everything they need to survive!"
      },
      {
        title: "Plant Growing Simulator",
        description: "Grow your own virtual garden and learn what plants need to thrive!",
        difficulty: "Medium",
        duration: "18 min",
        ageRange: "Ages 7-13",
        category: "Nature",
        topicId: 2,
        instructions: "Plant seeds, provide water and sunlight, and watch your garden bloom. Learn about photosynthesis!"
      },
      {
        title: "Animal Migration Journey",
        description: "Guide animals on their incredible journeys across continents!",
        difficulty: "Medium",
        duration: "20 min",
        ageRange: "Ages 8-14",
        category: "Animals",
        topicId: 2,
        instructions: "Help animals find food, avoid dangers, and reach their destinations safely!"
      },
      {
        title: "Ecosystem Balance Game",
        description: "Learn how all living things depend on each other in nature!",
        difficulty: "Advanced",
        duration: "25 min",
        ageRange: "Ages 10-14",
        category: "Nature",
        topicId: 2,
        instructions: "Manage a forest ecosystem. Keep predators, prey, and plants in perfect balance!"
      },

      // Space & Planets Games (Topic ID: 3)
      {
        title: "Rocket Launch Mission",
        description: "Design and launch rockets to explore different planets!",
        difficulty: "Medium",
        duration: "22 min",
        ageRange: "Ages 8-14",
        category: "Space",
        topicId: 3,
        instructions: "Calculate fuel, choose your trajectory, and navigate through space to reach your target planet!"
      },
      {
        title: "Solar System Explorer",
        description: "Take a virtual tour of all the planets and their moons!",
        difficulty: "Easy",
        duration: "12 min",
        ageRange: "Ages 6-12",
        category: "Space",
        topicId: 3,
        instructions: "Click on planets to learn about them. Discover their size, temperature, and special features!"
      },
      {
        title: "Space Station Builder",
        description: "Construct your own space station and manage life in zero gravity!",
        difficulty: "Advanced",
        duration: "30 min",
        ageRange: "Ages 10-14",
        category: "Space",
        topicId: 3,
        instructions: "Add modules, manage oxygen and food supplies, and conduct space experiments!"
      },
      {
        title: "Asteroid Defense Game",
        description: "Protect Earth from incoming asteroids using space technology!",
        difficulty: "Medium",
        duration: "15 min",
        ageRange: "Ages 9-14",
        category: "Space",
        topicId: 3,
        instructions: "Track asteroids, calculate their paths, and deploy defense systems to keep Earth safe!"
      },

      // Human Body Games (Topic ID: 4)
      {
        title: "Body Systems Adventure",
        description: "Journey through the human body and see how organs work together!",
        difficulty: "Medium",
        duration: "18 min",
        ageRange: "Ages 8-14",
        category: "Human Body",
        topicId: 4,
        instructions: "Travel through the bloodstream, lungs, and brain. Complete missions in each organ system!"
      },
      {
        title: "Healthy Habits Hero",
        description: "Learn how diet, exercise, and sleep keep your body strong!",
        difficulty: "Easy",
        duration: "12 min",
        ageRange: "Ages 6-11",
        category: "Human Body",
        topicId: 4,
        instructions: "Make healthy choices for your character and see how they affect energy, strength, and happiness!"
      },
      {
        title: "Brain Training Challenge",
        description: "Exercise your brain with puzzles that test memory, logic, and speed!",
        difficulty: "Medium",
        duration: "16 min",
        ageRange: "Ages 8-14",
        category: "Human Body",
        topicId: 4,
        instructions: "Complete brain games that train different areas: memory, pattern recognition, and problem-solving!"
      },
      {
        title: "Skeleton Assembly Lab",
        description: "Put together the human skeleton and learn about bones!",
        difficulty: "Medium",
        duration: "14 min",
        ageRange: "Ages 7-13",
        category: "Human Body",
        topicId: 4,
        instructions: "Drag bones to their correct positions. Learn the names and functions of different bones!"
      },

      // Science Lab Games (Topic ID: 5)
      {
        title: "Virtual Science Lab",
        description: "Mix chemicals safely and see amazing reactions in our virtual laboratory!",
        difficulty: "Advanced",
        duration: "20 min",
        ageRange: "Ages 10-14",
        category: "Science",
        topicId: 5,
        instructions: "Follow safety protocols and mix different chemicals to create colorful reactions and learn about chemistry!"
      },
      {
        title: "Physics Playground",
        description: "Experiment with gravity, momentum, and forces in fun challenges!",
        difficulty: "Medium",
        duration: "17 min",
        ageRange: "Ages 8-14",
        category: "Science",
        topicId: 5,
        instructions: "Build ramps, towers, and machines to explore how physics works in the real world!"
      },
      {
        title: "Weather Station Manager",
        description: "Predict weather patterns and understand how weather systems work!",
        difficulty: "Medium",
        duration: "19 min",
        ageRange: "Ages 9-14",
        category: "Science",
        topicId: 5,
        instructions: "Read weather instruments, track storm systems, and make accurate weather forecasts!"
      },
      {
        title: "Matter State Changer",
        description: "Change ice to water to steam and explore the states of matter!",
        difficulty: "Easy",
        duration: "13 min",
        ageRange: "Ages 6-11",
        category: "Science",
        topicId: 5,
        instructions: "Control temperature and pressure to change matter between solid, liquid, and gas states!"
      },

      // Technology Games (Topic ID: 6)
      {
        title: "Code Your Own App",
        description: "Learn programming basics by creating your own mobile app!",
        difficulty: "Advanced",
        duration: "35 min",
        ageRange: "Ages 10-14",
        category: "Technology",
        topicId: 6,
        instructions: "Use visual programming blocks to build an app. Add buttons, games, and cool features!"
      },
      {
        title: "Computer Assembly Challenge",
        description: "Build a computer from scratch and learn about each component!",
        difficulty: "Medium",
        duration: "22 min",
        ageRange: "Ages 9-14",
        category: "Technology",
        topicId: 6,
        instructions: "Connect the motherboard, CPU, memory, and other parts. Test your computer when finished!"
      },
      {
        title: "Internet Traffic Controller",
        description: "Manage data packets traveling across the internet!",
        difficulty: "Advanced",
        duration: "25 min",
        ageRange: "Ages 11-14",
        category: "Technology",
        topicId: 6,
        instructions: "Route emails, videos, and web pages through servers to reach their destinations quickly!"
      },
      {
        title: "Digital Art Creator",
        description: "Use technology tools to create amazing digital artwork!",
        difficulty: "Easy",
        duration: "20 min",
        ageRange: "Ages 7-14",
        category: "Technology",
        topicId: 6,
        instructions: "Use digital brushes, effects, and layers to create your masterpiece. Learn about pixels and graphics!"
      }
    ];

    gamesData.forEach(game => this.createGame(game));

    // Initialize experiments
    const experimentsData: InsertExperiment[] = [
      {
        title: "Rainbow Milk Explosion",
        description: "Create amazing colors with just milk, food coloring, and dish soap!",
        difficulty: "Easy",
        duration: "15 min",
        materials: "Milk, food coloring, dish soap, cotton swabs",
        instructions: "1. Pour milk into a plate\n2. Add drops of food coloring\n3. Dip cotton swab in dish soap\n4. Touch the milk with the soapy swab\n5. Watch the colors dance!",
        safetyNotes: "Adult supervision recommended. Do not drink the milk after the experiment.",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Science",
        ageRange: "Ages 6-12"
      },
      {
        title: "Growing Crystal Garden",
        description: "Watch beautiful crystals grow right before your eyes!",
        difficulty: "Medium",
        duration: "30 min",
        materials: "Salt, hot water, string, food coloring, magnifying glass",
        instructions: "1. Heat water (ask an adult for help)\n2. Mix in salt until no more dissolves\n3. Add food coloring\n4. Hang string in solution\n5. Wait 24 hours and observe!",
        safetyNotes: "Adult supervision required for hot water. Wait for solution to cool before handling.",
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Science",
        ageRange: "Ages 8-14"
      },
      {
        title: "Magic Density Tower",
        description: "Stack liquids to create a colorful tower that defies gravity!",
        difficulty: "Easy",
        duration: "10 min",
        materials: "Honey, dish soap, water, vegetable oil, food coloring",
        instructions: "1. Pour honey into a tall glass\n2. Slowly add colored water\n3. Add dish soap gently\n4. Top with vegetable oil\n5. Watch the layers form!",
        safetyNotes: "Clean up spills immediately to prevent slipping.",
        imageUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Science",
        ageRange: "Ages 6-12"
      }
    ];

    experimentsData.forEach(experiment => this.createExperiment(experiment));

    // Initialize quizzes
    const quizData: InsertQuiz = {
      title: "Animal Superpowers",
      description: "How much do you know about the incredible abilities of animals?",
      category: "Animals",
      questions: JSON.stringify([
        {
          question: "Which animal has the fastest heartbeat?",
          options: ["Elephant", "Hummingbird", "Mouse", "Cat"],
          correct: 1
        },
        {
          question: "How many hearts does an octopus have?",
          options: ["1", "2", "3", "4"],
          correct: 2
        }
      ]),
      featured: true,
      ageRange: "Ages 7-14",
      badge: "Animal Expert"
    };

    this.createQuiz(quizData);

    // Initialize fun facts
    const funFactsData: InsertFunFact[] = [
      {
        fact: "Did you know that a hummingbird's heart beats up to 1,200 times per minute? That's 20 times faster than yours!",
        category: "Animals",
        featured: true
      },
      {
        fact: "Octopuses have three hearts and blue blood! Two hearts pump blood to their gills, and one pumps to the rest of their body.",
        category: "Animals",
        featured: false
      },
      {
        fact: "A bolt of lightning is five times hotter than the surface of the Sun! It can reach temperatures of 30,000°C.",
        category: "Science",
        featured: false
      },
      {
        fact: "Honey never spoils! Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible.",
        category: "Science",
        featured: false
      },
      {
        fact: "Your brain uses about 20% of your body's total energy, even though it only weighs about 2% of your body weight!",
        category: "Human Body",
        featured: false
      }
    ];

    funFactsData.forEach(fact => this.createFunFact(fact));
  }

  // Topic methods
  async getAllTopics(): Promise<Topic[]> {
    return Array.from(this.topics.values());
  }

  async getTopicById(id: number): Promise<Topic | undefined> {
    return this.topics.get(id);
  }

  async createTopic(insertTopic: InsertTopic): Promise<Topic> {
    const id = this.currentTopicId++;
    const topic: Topic = { ...insertTopic, id };
    this.topics.set(id, topic);
    return topic;
  }

  // Video methods
  async getAllVideos(): Promise<Video[]> {
    return Array.from(this.videos.values());
  }

  async getFeaturedVideos(): Promise<Video[]> {
    return Array.from(this.videos.values()).filter(video => video.featured);
  }

  async getVideosByCategory(category: string): Promise<Video[]> {
    return Array.from(this.videos.values()).filter(video => video.category === category);
  }

  async getVideosByTopicId(topicId: number): Promise<Video[]> {
    return Array.from(this.videos.values()).filter(video => video.topicId === topicId);
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = this.currentVideoId++;
    const video: Video = { ...insertVideo, id };
    this.videos.set(id, video);
    return video;
  }

  // Game methods
  async getAllGames(): Promise<Game[]> {
    return Array.from(this.games.values());
  }

  async getGamesByCategory(category: string): Promise<Game[]> {
    return Array.from(this.games.values()).filter(game => game.category === category);
  }

  async getGamesByTopicId(topicId: number): Promise<Game[]> {
    return Array.from(this.games.values()).filter(game => game.topicId === topicId);
  }

  async createGame(insertGame: InsertGame): Promise<Game> {
    const id = this.currentGameId++;
    const game: Game = { ...insertGame, id };
    this.games.set(id, game);
    return game;
  }

  // Experiment methods
  async getAllExperiments(): Promise<Experiment[]> {
    return Array.from(this.experiments.values());
  }

  async getExperimentsByCategory(category: string): Promise<Experiment[]> {
    return Array.from(this.experiments.values()).filter(experiment => experiment.category === category);
  }

  async createExperiment(insertExperiment: InsertExperiment): Promise<Experiment> {
    const id = this.currentExperimentId++;
    const experiment: Experiment = { ...insertExperiment, id };
    this.experiments.set(id, experiment);
    return experiment;
  }

  // Quiz methods
  async getAllQuizzes(): Promise<Quiz[]> {
    return Array.from(this.quizzes.values());
  }

  async getFeaturedQuiz(): Promise<Quiz | undefined> {
    return Array.from(this.quizzes.values()).find(quiz => quiz.featured);
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = this.currentQuizId++;
    const quiz: Quiz = { ...insertQuiz, id };
    this.quizzes.set(id, quiz);
    return quiz;
  }

  // Fun fact methods
  async getAllFunFacts(): Promise<FunFact[]> {
    return Array.from(this.funFacts.values());
  }

  async getFeaturedFunFact(): Promise<FunFact | undefined> {
    return Array.from(this.funFacts.values()).find(fact => fact.featured);
  }

  async createFunFact(insertFunFact: InsertFunFact): Promise<FunFact> {
    const id = this.currentFunFactId++;
    const funFact: FunFact = { ...insertFunFact, id };
    this.funFacts.set(id, funFact);
    return funFact;
  }
}

export const storage = new MemStorage();
