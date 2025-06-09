import { Button } from "@/components/ui/button";
import type { Experiment } from "@shared/schema";

interface ExperimentCardProps {
  experiment: Experiment;
}

export default function ExperimentCard({ experiment }: ExperimentCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-[hsl(var(--lime-green))] text-white";
      case "Medium":
        return "bg-[hsl(var(--bright-yellow))] text-[hsl(var(--dark-slate))]";
      case "Advanced":
        return "bg-[hsl(var(--tomato-red))] text-white";
      default:
        return "bg-[hsl(var(--discovery-blue))] text-white";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
      <img 
        src={experiment.imageUrl} 
        alt={experiment.title}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />
      <div className="flex items-center justify-between mb-3">
        <span className={`${getDifficultyColor(experiment.difficulty)} px-3 py-1 rounded-full text-sm font-semibold`}>
          {experiment.difficulty}
        </span>
        <span className="text-[hsl(var(--dark-slate))] text-sm">
          <i className="fas fa-clock mr-1"></i>{experiment.duration}
        </span>
      </div>
      <h3 className="font-comic text-xl font-bold text-[hsl(var(--dark-slate))] mb-3">
        {experiment.title}
      </h3>
      <p className="text-[hsl(var(--dark-slate))] opacity-75 mb-4">
        {experiment.description}
      </p>
      
      {/* Materials List */}
      <div className="mb-4">
        <h4 className="font-bold text-sm text-[hsl(var(--dark-slate))] mb-2">Materials needed:</h4>
        <p className="text-xs text-[hsl(var(--dark-slate))] opacity-75">
          {experiment.materials}
        </p>
      </div>
      
      {/* Safety Notice */}
      {experiment.safetyNotes && (
        <div className="bg-[hsl(var(--bright-yellow))] bg-opacity-20 border border-[hsl(var(--bright-yellow))] rounded-lg p-2 mb-4">
          <div className="flex items-start">
            <i className="fas fa-exclamation-triangle text-[hsl(var(--tomato-red))] text-xs mr-2 mt-0.5"></i>
            <p className="text-xs text-[hsl(var(--dark-slate))]">{experiment.safetyNotes}</p>
          </div>
        </div>
      )}
      
      <Button 
        onClick={() => alert(`🧪 Downloading instructions for "${experiment.title}"!\n\nIn a real app, this would download a PDF with detailed experiment instructions.`)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        <i className="fas fa-download mr-2"></i>Get Instructions
      </Button>
    </div>
  );
}
