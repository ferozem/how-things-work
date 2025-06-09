import { useQuery } from "@tanstack/react-query";
import type { Experiment } from "@shared/schema";
import ExperimentCard from "@/components/experiment-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Experiments() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  
  const { data: experiments, isLoading } = useQuery<Experiment[]>({
    queryKey: ["/api/experiments"],
  });

  const difficulties = ["all", "Easy", "Medium", "Advanced"];
  
  const filteredExperiments = experiments?.filter(experiment => 
    selectedDifficulty === "all" || experiment.difficulty === selectedDifficulty
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h1 className="font-comic text-4xl md:text-6xl font-bold text-[hsl(var(--discovery-blue))] mb-4 animate-pulse-slow">
            🧪 DIY Experiments
          </h1>
          <p className="text-xl md:text-2xl text-[hsl(var(--dark-slate))] mb-8 max-w-3xl mx-auto">
            Try these amazing experiments at home! Learn through hands-on discovery with safe, fun activities.
          </p>
          
          {/* Safety Notice */}
          <div className="bg-[hsl(var(--bright-yellow))] bg-opacity-20 border-2 border-[hsl(var(--bright-yellow))] rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <i className="fas fa-exclamation-triangle text-[hsl(var(--tomato-red))] text-2xl mr-3"></i>
              <h3 className="font-comic text-xl font-bold text-[hsl(var(--dark-slate))]">Safety First!</h3>
            </div>
            <p className="text-[hsl(var(--dark-slate))]">
              Always ask an adult for help with experiments. Read all safety notes before starting!
            </p>
          </div>
        </div>
      </section>

      {/* Difficulty Filter */}
      <section className="py-8 px-4 bg-alice-blue">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                className={`rounded-full px-6 py-2 font-bold transition-colors ${
                  selectedDifficulty === difficulty 
                    ? "bg-[hsl(var(--discovery-blue))] text-white" 
                    : "bg-white text-[hsl(var(--dark-slate))] border-[hsl(var(--discovery-blue))] hover:bg-[hsl(var(--discovery-blue))] hover:text-white"
                }`}
              >
                {difficulty === "all" ? "All Levels" : difficulty}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="py-12 px-4 bg-alice-blue">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-96 rounded-2xl" />
              ))}
            </div>
          ) : filteredExperiments && filteredExperiments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperiments.map((experiment) => (
                <ExperimentCard key={experiment.id} experiment={experiment} />
              ))}
            </div>
          ) : (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">🧪</div>
                <h3 className="font-comic text-2xl font-bold mb-2">No Experiments Found</h3>
                <p className="text-[hsl(var(--dark-slate))] opacity-75">
                  {selectedDifficulty === "all" 
                    ? "We're working on creating safe and fun experiments for you. Check back soon!"
                    : `No ${selectedDifficulty.toLowerCase()} experiments available yet.`
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Experiment Tips */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="font-comic text-3xl md:text-4xl font-bold text-center text-[hsl(var(--discovery-blue))] mb-8">
            🔬 Experiment Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-[hsl(var(--lime-green))] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-eye text-2xl text-white"></i>
              </div>
              <h3 className="font-comic text-xl font-bold mb-3">Observe Carefully</h3>
              <p className="text-[hsl(var(--dark-slate))] opacity-75">
                Watch what happens and ask yourself why! Write down what you see.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-[hsl(var(--bright-yellow))] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl text-[hsl(var(--dark-slate))]"></i>
              </div>
              <h3 className="font-comic text-xl font-bold mb-3">Stay Safe</h3>
              <p className="text-[hsl(var(--dark-slate))] opacity-75">
                Always follow safety instructions and have an adult help when needed.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-[hsl(var(--tomato-red))] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-lightbulb text-2xl text-white"></i>
              </div>
              <h3 className="font-comic text-xl font-bold mb-3">Have Fun!</h3>
              <p className="text-[hsl(var(--dark-slate))] opacity-75">
                Learning is an adventure! Don't worry if it doesn't work the first time.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
