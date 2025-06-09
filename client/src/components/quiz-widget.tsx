import { Button } from "@/components/ui/button";
import type { Quiz } from "@shared/schema";

interface QuizWidgetProps {
  quiz: Quiz;
}

export default function QuizWidget({ quiz }: QuizWidgetProps) {
  const questions = JSON.parse(quiz.questions);

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-[hsl(var(--discovery-blue))] to-purple-600">
      <div className="container mx-auto text-center text-white drop-shadow">
        <h2 className="font-comic text-3xl md:text-4xl font-bold mb-6 text-yellow-100">
          🏆 Weekly Challenge Quiz!
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-yellow-50">
          Test your knowledge and earn cool badges! This week's topic: {quiz.category}
        </p>
        
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-[hsl(var(--bright-yellow))] rounded-full flex items-center justify-center animate-bounce-slow">
              <i className="fas fa-trophy text-3xl text-[hsl(var(--dark-slate))]"></i>
            </div>
          </div>
          <h3 className="font-comic text-2xl font-bold mb-4">{quiz.title}</h3>
          <p className="text-lg mb-6">{quiz.description}</p>
          <div className="flex justify-center space-x-4 mb-6 flex-wrap gap-2">
            <span className="bg-white bg-opacity-30 px-4 py-2 rounded-full">
              {questions.length} Questions
            </span>
            <span className="bg-white bg-opacity-30 px-4 py-2 rounded-full">
              5 Minutes
            </span>
            <span className="bg-[hsl(var(--bright-yellow))] text-[hsl(var(--dark-slate))] px-4 py-2 rounded-full font-semibold">
              Win a {quiz.badge} Badge!
            </span>
          </div>
          <Button className="bg-[hsl(var(--bright-yellow))] text-[hsl(var(--dark-slate))] hover:bg-yellow-300 transition-colors px-8 py-4 text-lg font-bold">
            <i className="fas fa-play-circle mr-2"></i>Take the Quiz!
          </Button>
        </div>
      </div>
    </section>
  );
}
