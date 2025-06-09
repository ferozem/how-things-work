import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { FunFact } from "@shared/schema";

interface FunFactWidgetProps {
  funFact: FunFact;
}

export default function FunFactWidget({ funFact: initialFact }: FunFactWidgetProps) {
  const [currentFact, setCurrentFact] = useState(initialFact);
  
  const { data: allFacts } = useQuery<FunFact[]>({
    queryKey: ["/api/fun-facts"],
  });

  useEffect(() => {
    if (allFacts && allFacts.length > 1) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * allFacts.length);
        setCurrentFact(allFacts[randomIndex]);
      }, 10000); // Change fact every 10 seconds

      return () => clearInterval(interval);
    }
  }, [allFacts]);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl max-w-2xl mx-auto mb-8 border-4 border-[hsl(var(--bright-yellow))]">
      <h3 className="font-comic text-2xl font-bold text-[hsl(var(--tomato-red))] mb-3">
        <i className="fas fa-star animate-wiggle mr-2"></i>Fun Fact of the Day!
      </h3>
      <p className="text-lg text-[hsl(var(--dark-slate))]">
        {currentFact.fact}
      </p>
    </div>
  );
}
