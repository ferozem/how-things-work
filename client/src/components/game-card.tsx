import { Button } from "@/components/ui/button";
import type { Game } from "@shared/schema";

interface GameCardProps {
  game: Game;
  featured?: boolean;
}

export default function GameCard({ game, featured = false }: GameCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-[hsl(var(--lime-green))]";
      case "Medium":
        return "bg-[hsl(var(--bright-yellow))] text-[hsl(var(--dark-slate))]";
      case "Advanced":
        return "bg-[hsl(var(--tomato-red))]";
      default:
        return "bg-[hsl(var(--discovery-blue))]";
    }
  };

  const getCardBackground = () => {
    if (featured) {
      if (game.category === "Machines") {
        return "bg-gradient-to-br from-[hsl(var(--bright-yellow))] to-yellow-400 text-[hsl(var(--dark-slate))]";
      } else if (game.category === "Science") {
        return "bg-gradient-to-br from-[hsl(var(--lime-green))] to-green-400 text-white";
      }
    }
    return "bg-white text-[hsl(var(--dark-slate))]";
  };

  const getButtonStyles = () => {
    if (featured) {
      return "bg-white text-[hsl(var(--discovery-blue))] hover:bg-gray-100";
    }
    return "bg-[hsl(var(--discovery-blue))] text-white hover:bg-blue-600";
  };

  return (
    <div className={`${getCardBackground()} rounded-3xl p-8 shadow-xl hover:transform hover:scale-105 transition-all duration-300`}>
      <div className="text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
          <i className={`${game.category === "Machines" ? "fas fa-wrench" : "fas fa-flask"} text-4xl ${game.category === "Machines" ? "text-[hsl(var(--bright-yellow))]" : "text-[hsl(var(--lime-green))]"}`}></i>
        </div>
        <h3 className="font-comic text-2xl font-bold mb-4">{game.title}</h3>
        <p className="text-lg mb-6">{game.description}</p>
        <div className="flex justify-center space-x-4 mb-6">
          <span className={`${featured ? "bg-white bg-opacity-30" : "bg-gray-100"} px-4 py-2 rounded-full font-semibold`}>
            {game.ageRange}
          </span>
          <span className={`${getDifficultyColor(game.difficulty)} px-4 py-2 rounded-full font-semibold`}>
            {game.difficulty}
          </span>
          <span className={`${featured ? "bg-white bg-opacity-30" : "bg-[hsl(var(--discovery-blue))] text-white"} px-4 py-2 rounded-full font-semibold`}>
            {game.duration}
          </span>
        </div>
        <Button 
          onClick={() => alert(`🎮 Starting "${game.title}"!\n\nIn a real app, this would launch the interactive game.`)}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <i className="fas fa-play mr-2"></i>Start Game!
        </Button>
      </div>
    </div>
  );
}
