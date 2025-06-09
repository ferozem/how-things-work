import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Topic, Video, Game } from "@shared/schema";
import VideoCard from "@/components/video-card";
import GameCard from "@/components/game-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TopicPage() {
  const { id } = useParams();
  const topicId = parseInt(id!);

  const { data: topic, isLoading: topicLoading } = useQuery<Topic>({
    queryKey: [`/api/topics/${topicId}`],
  });

  const { data: videos, isLoading: videosLoading } = useQuery<Video[]>({
    queryKey: [`/api/videos/topic/${topicId}`],
  });

  const { data: games, isLoading: gamesLoading } = useQuery<Game[]>({
    queryKey: [`/api/games/topic/${topicId}`],
  });

  if (topicLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-16 w-96 mx-auto mb-8" />
        <Skeleton className="h-32 w-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-comic text-4xl font-bold text-[hsl(var(--discovery-blue))] mb-4">
          Topic Not Found
        </h1>
        <p className="text-xl text-[hsl(var(--dark-slate))]">
          Sorry, we couldn't find that topic. Try exploring our other amazing subjects!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Topic Hero */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={(() => {
              const heroImages = {
                1: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop",
                2: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop", 
                3: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1200&h=600&fit=crop",
                4: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop",
                5: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1200&h=600&fit=crop",
                6: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop"
              };
              return heroImages[topic.id as keyof typeof heroImages] || heroImages[1];
            })()} 
            alt={topic.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl overflow-hidden">
            <img 
              src={(() => {
                const images = {
                  1: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=128&h=128&fit=crop",
                  2: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=128&h=128&fit=crop",
                  3: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=128&h=128&fit=crop",
                  4: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=128&h=128&fit=crop",
                  5: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=128&h=128&fit=crop",
                  6: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=128&h=128&fit=crop"
                };
                return images[topic.id as keyof typeof images] || images[1];
              })()} 
              alt={topic.name}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                const icon = target.nextElementSibling as HTMLElement;
                target.style.display = 'none';
                if (icon) icon.style.display = 'flex';
              }}
            />
            <i className={`${topic.icon} text-blue-500 text-4xl hidden`}></i>
          </div>
          <h1 className="font-comic text-4xl md:text-6xl font-bold text-[hsl(var(--discovery-blue))] mb-4 drop-shadow-lg">
            {topic.name}
          </h1>
          <p className="text-xl md:text-2xl text-[hsl(var(--dark-slate))] mb-8 max-w-3xl mx-auto drop-shadow-sm">
            {topic.description}
          </p>
          
          <div className="flex justify-center flex-wrap gap-4 mb-8">
            <span className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
              {topic.topicCount} Topics
            </span>
            <span className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-bold shadow-lg">
              {topic.gameCount} Games
            </span>
            <span className="bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-lg">
              {topic.ageRange}
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Learning Explorer */}
      <section className="py-12 px-4 bg-alice-blue">
        <div className="container mx-auto">
          <h2 className="font-comic text-3xl md:text-4xl font-bold text-center text-[hsl(var(--discovery-blue))] mb-8">
            🔍 Explore & Discover
          </h2>
          
          {topic && topic.id === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "How Car Engines Work",
                  icon: "fas fa-car",
                  color: "bg-red-500",
                  content: "Car engines are amazing! They work by creating tiny explosions inside cylinders. These explosions push pistons up and down, which turns the crankshaft and makes the wheels spin. It's like having hundreds of tiny fireworks going off every minute to power your car!"
                },
                {
                  title: "The Magic of Computers",
                  icon: "fas fa-microchip",
                  color: "bg-blue-500",
                  content: "Computers are super smart machines that think using electricity! They understand everything as 1s and 0s (called binary). The CPU is like the brain, RAM is like short-term memory, and the hard drive stores everything permanently. Your computer can do billions of calculations every second!"
                },
                {
                  title: "How Robots Move",
                  icon: "fas fa-robot",
                  color: "bg-purple-500",
                  content: "Robots have sensors like eyes and ears to see and hear the world around them. They use motors and gears to move their arms and legs, just like your muscles move your body. A computer brain tells them what to do based on their programming!"
                },
                {
                  title: "Simple Machines: Levers",
                  icon: "fas fa-balance-scale",
                  color: "bg-green-500",
                  content: "Levers help us lift heavy things with less effort! Think of a seesaw - when you push down on one side, the other side goes up. Bottle openers, scissors, and crowbars are all levers that make work easier for us!"
                },
                {
                  title: "The Power of Wheels",
                  icon: "fas fa-circle",
                  color: "bg-orange-500",
                  content: "Wheels are one of the most important inventions ever! They reduce friction, making it easy to move heavy objects. Cars, bicycles, shopping carts, and even computer mice use wheels to help us move things around!"
                },
                {
                  title: "Pulleys and Lifting",
                  icon: "fas fa-anchor",
                  color: "bg-pink-500",
                  content: "Pulleys use ropes and wheels to help us lift heavy things! By using multiple pulleys together, you can lift something that weighs much more than you do. Cranes, elevators, and flagpoles all use pulleys!"
                }
              ].map((item, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <i className={`${item.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="font-comic text-xl font-bold text-center mb-3">{item.title}</h3>
                    <p className="text-[hsl(var(--dark-slate))] text-sm leading-relaxed">
                      {item.content}
                    </p>
                    <Button 
                      onClick={() => alert(`📚 Learning more about "${item.title}"!\n\n${item.content}\n\nIn a real app, this would open detailed interactive content with animations and activities!`)}
                      className="w-full mt-4 bg-[hsl(var(--discovery-blue))] text-sm"
                    >
                      <i className="fas fa-book-open mr-2"></i>Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {topic && topic.id === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "How Birds Fly",
                  icon: "fas fa-dove",
                  color: "bg-sky-500",
                  content: "Birds are amazing flying machines! Their wings are curved on top and flat on the bottom, which creates lift when air flows over them. Their hollow bones make them super light, and their powerful chest muscles flap their wings up to 80 times per second!"
                },
                {
                  title: "Why Flowers Are Colorful",
                  icon: "fas fa-seedling",
                  color: "bg-pink-500",
                  content: "Flowers are like nature's advertisements! They use bright colors and sweet smells to attract bees, butterflies, and other pollinators. When insects visit flowers for nectar, they accidentally carry pollen from flower to flower, helping plants make seeds!"
                },
                {
                  title: "How Trees Breathe",
                  icon: "fas fa-tree",
                  color: "bg-green-500",
                  content: "Trees are like giant air purifiers! They breathe in carbon dioxide through tiny holes in their leaves called stomata. Using sunlight, water, and CO2, they make sugar for food and release oxygen for us to breathe. One tree can make enough oxygen for two people!"
                },
                {
                  title: "Animal Camouflage",
                  icon: "fas fa-eye-slash",
                  color: "bg-amber-600",
                  content: "Animals are masters of hide-and-seek! Chameleons change colors using special cells called chromatophores. Stick insects look exactly like twigs, and arctic foxes turn white in winter to blend with snow. Camouflage helps them hide from predators or sneak up on prey!"
                },
                {
                  title: "How Fish Breathe Underwater",
                  icon: "fas fa-fish",
                  color: "bg-blue-500",
                  content: "Fish have special organs called gills that work like underwater lungs! Water flows into their mouths and over their gills, which extract oxygen from the water. The oxygen goes into their blood while the water flows out through gill slits. It's like having a built-in scuba tank!"
                },
                {
                  title: "Why Some Animals Migrate",
                  icon: "fas fa-route",
                  color: "bg-orange-500",
                  content: "Some animals take incredible journeys every year! Birds fly thousands of miles to find warm weather and food. Whales swim across entire oceans to have their babies in safe, warm waters. They use the sun, stars, and Earth's magnetic field like a natural GPS!"
                }
              ].map((item, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <i className={`${item.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="font-comic text-xl font-bold text-center mb-3">{item.title}</h3>
                    <p className="text-[hsl(var(--dark-slate))] text-sm leading-relaxed">
                      {item.content}
                    </p>
                    <Button 
                      onClick={() => alert(`🌿 Discovering "${item.title}"!\n\n${item.content}\n\nIn a real app, this would show interactive nature documentaries and activities!`)}
                      className="w-full mt-4 bg-[hsl(var(--lime-green))] text-sm"
                    >
                      <i className="fas fa-leaf mr-2"></i>Explore Nature
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {topic && topic.id === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "How Rockets Escape Earth",
                  icon: "fas fa-rocket",
                  color: "bg-red-500",
                  content: "Rockets work by pushing hot gases down really fast, which pushes the rocket up! They need to go 25,000 mph to escape Earth's gravity. That's like flying from New York to Los Angeles in 6 minutes! Rockets have multiple stages that drop off as fuel is used up."
                },
                {
                  title: "Why Planets Orbit the Sun",
                  icon: "fas fa-sun",
                  color: "bg-yellow-500",
                  content: "The Sun is like a giant magnet that pulls planets toward it with gravity. But planets are also moving sideways really fast! This creates a perfect balance - gravity pulls them in while their speed keeps them from falling into the Sun, creating circular orbits."
                },
                {
                  title: "What Makes Stars Shine",
                  icon: "fas fa-star",
                  color: "bg-blue-500",
                  content: "Stars are like giant nuclear power plants in space! Deep inside stars, hydrogen atoms smash together to make helium, releasing enormous amounts of energy. This process, called fusion, creates all the light and heat that travels millions of miles to reach us!"
                },
                {
                  title: "How We Stay on Earth",
                  icon: "fas fa-globe",
                  color: "bg-green-500",
                  content: "Gravity is an invisible force that pulls everything toward the center of Earth! It's what keeps you from floating away and makes things fall down. The bigger something is, the stronger its gravity. Earth's gravity is just right to keep our atmosphere and oceans in place!"
                },
                {
                  title: "Life on Space Stations",
                  icon: "fas fa-satellite",
                  color: "bg-purple-500",
                  content: "Astronauts live in zero gravity where everything floats! They sleep in sleeping bags attached to walls, and their food comes in special packages. Water forms floating bubbles, and astronauts have to exercise 2.5 hours every day to keep their muscles strong!"
                },
                {
                  title: "How We Explore Mars",
                  icon: "fas fa-user-astronaut",
                  color: "bg-orange-500",
                  content: "Mars rovers are like remote-controlled cars on another planet! They have six wheels, cameras for eyes, and robot arms to collect rock samples. It takes 4-24 minutes for radio signals to travel between Earth and Mars, so rovers have to be pretty smart on their own!"
                }
              ].map((item, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <i className={`${item.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="font-comic text-xl font-bold text-center mb-3">{item.title}</h3>
                    <p className="text-[hsl(var(--dark-slate))] text-sm leading-relaxed">
                      {item.content}
                    </p>
                    <Button 
                      onClick={() => alert(`🚀 Exploring "${item.title}"!\n\n${item.content}\n\nIn a real app, this would launch space simulations and virtual missions!`)}
                      className="w-full mt-4 bg-purple-500 text-sm"
                    >
                      <i className="fas fa-rocket mr-2"></i>Blast Off
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {topic && (topic.id === 4 || topic.id === 5 || topic.id === 6) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {(topic.id === 4 ? [
                {
                  title: "Your Heart: A Super Pump",
                  icon: "fas fa-heartbeat",
                  color: "bg-red-500",
                  content: "Your heart is an amazing muscle that beats about 100,000 times every day! It has four chambers that work together to pump blood throughout your body. In one day, your heart pumps about 2,000 gallons of blood - that's enough to fill a small swimming pool!"
                },
                {
                  title: "How Your Brain Controls Everything",
                  icon: "fas fa-brain",
                  color: "bg-purple-500",
                  content: "Your brain is like the world's most advanced computer! It has about 86 billion neurons that send messages at 268 mph. Your brain controls breathing, thinking, moving, and even your dreams. It uses 20% of your body's energy, even though it's only 2% of your weight!"
                },
                {
                  title: "Why You Need to Breathe",
                  icon: "fas fa-lungs",
                  color: "bg-blue-500",
                  content: "Your lungs are like balloons that inflate and deflate about 20,000 times per day! They extract oxygen from air and remove carbon dioxide from your blood. Each lung has about 300 million tiny air sacs called alveoli - if you spread them out flat, they'd cover a tennis court!"
                }
              ] : topic.id === 5 ? [
                {
                  title: "The Magic of Magnets",
                  icon: "fas fa-magnet",
                  color: "bg-red-500",
                  content: "Magnets have invisible force fields around them! Every magnet has two poles - north and south. Opposite poles attract each other, while the same poles push away. Earth itself is like a giant magnet, which is why compass needles point north!"
                },
                {
                  title: "How Electricity Works",
                  icon: "fas fa-bolt",
                  color: "bg-yellow-500",
                  content: "Electricity is the flow of tiny particles called electrons! When you flip a light switch, billions of electrons race through wires at nearly the speed of light. Lightning is nature's electricity - a single bolt contains enough energy to power your house for weeks!"
                },
                {
                  title: "States of Matter",
                  icon: "fas fa-temperature-high",
                  color: "bg-blue-500",
                  content: "Everything around you is made of tiny particles that move! In solids, particles are tightly packed and barely move. In liquids, they can flow around each other. In gases, they zoom around freely. Heat makes particles move faster, which is why ice melts and water boils!"
                }
              ] : [
                {
                  title: "How WiFi Works",
                  icon: "fas fa-wifi",
                  color: "bg-blue-500",
                  content: "WiFi sends information through invisible radio waves! Your router is like a radio station that broadcasts internet signals. Your devices have antennas that catch these signals and turn them back into websites, videos, and messages. These waves bounce around your house at the speed of light!"
                },
                {
                  title: "Inside Your Smartphone",
                  icon: "fas fa-mobile-alt",
                  color: "bg-gray-700",
                  content: "Your phone is like a tiny computer that fits in your pocket! It has a processor (brain), memory (storage), a battery (power), cameras (eyes), speakers (mouth), and antennas (ears). The touchscreen uses electricity from your finger to know where you're touching!"
                },
                {
                  title: "How Video Games Work",
                  icon: "fas fa-gamepad",
                  color: "bg-purple-500",
                  content: "Video games are like digital movies that respond to your actions! The computer draws each frame of the game 60 times per second, creating smooth motion. When you press a button, the game instantly calculates what should happen and updates the picture on your screen!"
                }
              ]).map((item, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <i className={`${item.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="font-comic text-xl font-bold text-center mb-3">{item.title}</h3>
                    <p className="text-[hsl(var(--dark-slate))] text-sm leading-relaxed">
                      {item.content}
                    </p>
                    <Button 
                      onClick={() => alert(`📚 Learning about "${item.title}"!\n\n${item.content}\n\nIn a real app, this would open interactive content!`)}
                      className="w-full mt-4 bg-[hsl(var(--discovery-blue))] text-sm"
                    >
                      <i className="fas fa-search mr-2"></i>Explore More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="font-comic text-3xl md:text-4xl font-bold text-center text-[hsl(var(--discovery-blue))] mb-8">
            🎬 Videos About {topic.name}
          </h2>
          
          {videosLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-2xl" />
              ))}
            </div>
          ) : videos && videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="font-comic text-2xl font-bold mb-2">More Videos Coming Soon!</h3>
                <p className="text-[hsl(var(--dark-slate))] opacity-75">
                  We're working on amazing videos for this topic. Check back soon!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Games Section */}
      <section className="py-12 px-4 bg-alice-blue">
        <div className="container mx-auto">
          <h2 className="font-comic text-3xl md:text-4xl font-bold text-center text-[hsl(var(--discovery-blue))] mb-8">
            🎮 Games & Activities
          </h2>
          
          {gamesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-96 rounded-3xl" />
              ))}
            </div>
          ) : games && games.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="font-comic text-2xl font-bold mb-2">Games Coming Soon!</h3>
                <p className="text-[hsl(var(--dark-slate))] opacity-75">
                  We're creating exciting games for this topic. Stay tuned!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Learning Resources */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="font-comic text-3xl md:text-4xl font-bold text-center text-[hsl(var(--discovery-blue))] mb-8">
            📚 Learning Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="text-center p-8">
                <div className="w-16 h-16 bg-[hsl(var(--bright-yellow))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-book text-2xl text-[hsl(var(--dark-slate))]"></i>
                </div>
                <h3 className="font-comic text-xl font-bold mb-3">Reading Materials</h3>
                <p className="text-[hsl(var(--dark-slate))] opacity-75 mb-4">
                  Downloadable guides and articles to learn more
                </p>
                <Button 
                  onClick={() => alert("📖 Downloading reading materials!\n\nIn a real app, this would download educational PDFs and guides.")}
                  className="w-full bg-[hsl(var(--discovery-blue))]"
                >
                  <i className="fas fa-download mr-2"></i>Download
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="text-center p-8">
                <div className="w-16 h-16 bg-[hsl(var(--lime-green))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-clipboard-list text-2xl text-white"></i>
                </div>
                <h3 className="font-comic text-xl font-bold mb-3">Activity Sheets</h3>
                <p className="text-[hsl(var(--dark-slate))] opacity-75 mb-4">
                  Fun worksheets and coloring pages
                </p>
                <Button 
                  onClick={() => alert("🎨 Downloading activity sheets!\n\nIn a real app, this would download worksheets and coloring pages.")}
                  className="w-full bg-[hsl(var(--discovery-blue))]"
                >
                  <i className="fas fa-download mr-2"></i>Download
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="text-center p-8">
                <div className="w-16 h-16 bg-[hsl(var(--tomato-red))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-question-circle text-2xl text-white"></i>
                </div>
                <h3 className="font-comic text-xl font-bold mb-3">Quick Quiz</h3>
                <p className="text-[hsl(var(--dark-slate))] opacity-75 mb-4">
                  Test your knowledge with fun questions
                </p>
                <Button 
                  onClick={() => alert("🧠 Starting quiz!\n\nIn a real app, this would launch an interactive quiz about this topic.")}
                  className="w-full bg-[hsl(var(--discovery-blue))]"
                >
                  <i className="fas fa-play mr-2"></i>Start Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}