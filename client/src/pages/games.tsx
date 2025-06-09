import { useQuery } from "@tanstack/react-query";
import type { Game } from "@shared/schema";
import GameCard from "@/components/game-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Games() {
  const { data: games, isLoading } = useQuery<Game[]>({
    queryKey: ["/api/games"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h1 className="font-comic text-4xl md:text-6xl font-bold text-[hsl(var(--discovery-blue))] mb-4 animate-pulse-slow">
            🎮 Interactive Games & Activities
          </h1>
          <p className="text-xl md:text-2xl text-[hsl(var(--dark-slate))] mb-8 max-w-3xl mx-auto">
            Learn through play! Our interactive games make discovering how things work fun and engaging.
          </p>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-12 px-4 bg-alice-blue">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
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
                <h3 className="font-comic text-2xl font-bold mb-2">No Games Available</h3>
                <p className="text-[hsl(var(--dark-slate))] opacity-75">
                  We're working on creating amazing games for you. Check back soon!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Game Categories */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="font-comic text-3xl md:text-4xl font-bold text-center text-[hsl(var(--discovery-blue))] mb-8">
            🏆 Game Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Building Games", icon: "fas fa-hammer", color: "bg-[hsl(var(--bright-yellow))]" },
              { name: "Science Lab", icon: "fas fa-flask", color: "bg-[hsl(var(--lime-green))]" },
              { name: "Space Adventure", icon: "fas fa-rocket", color: "bg-purple-500" },
              { name: "Nature Explorer", icon: "fas fa-leaf", color: "bg-green-500" }
            ].map((category, index) => (
              <Card key={index} className="hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <CardContent className="text-center p-6">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow`}>
                    <i className={`${category.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="font-comic text-lg font-bold">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
