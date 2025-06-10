import { Link } from "wouter";
import type { Topic } from "@shared/schema";

interface TopicCardProps {
  topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "from-blue-500 to-blue-600":
        return "bg-gradient-to-br from-blue-500 to-blue-600";
      case "from-green-500 to-green-600":
        return "bg-gradient-to-br from-green-500 to-green-600";
      case "from-purple-500 to-purple-700":
        return "bg-gradient-to-br from-purple-500 to-purple-700";
      case "from-red-500 to-red-600":
        return "bg-gradient-to-br from-red-500 to-red-600";
      case "from-yellow-500 to-yellow-600":
        return "bg-gradient-to-br from-yellow-500 to-yellow-600 text-[hsl(var(--dark-slate))]";
      case "from-gray-600 to-gray-800":
        return "bg-gradient-to-br from-gray-600 to-gray-800";
      default:
        return "bg-gradient-to-br from-blue-500 to-blue-600";
    }
  };

  return (
    <Link href={`/topic/${topic.id}`}>
      <div className={`${getColorClasses(topic.color)} rounded-3xl p-6 text-white shadow-xl hover:transform hover:scale-105 transition-all duration-300 cursor-pointer`}>
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow overflow-hidden">
            <img 
              src={(() => {
                const images = {
1: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop&crop=center",
                  2: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop&crop=center",
                  3: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=200&h=200&fit=crop&crop=center",
                  4: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop&crop=center",
                  5: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=200&h=200&fit=crop&crop=center",
                  6: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=200&h=200&fit=crop&crop=center"
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
            <i className={`${topic.icon} text-3xl ${topic.color.includes('yellow') ? 'text-yellow-500' : 'text-blue-500'} hidden`}></i>
          </div>
          <h3 className="font-comic text-2xl font-bold mb-3">{topic.name}</h3>
          <p className="text-lg opacity-90">{topic.description}</p>
          <div className="mt-4 flex justify-center space-x-2">
            <span className={`${topic.color.includes('yellow') ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} px-3 py-1 rounded-full text-sm font-semibold`}>
              {topic.topicCount} Topics
            </span>
            <span className="bg-[hsl(var(--bright-yellow))] text-[hsl(var(--dark-slate))] px-3 py-1 rounded-full text-sm font-semibold">
              {topic.gameCount} Games
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
