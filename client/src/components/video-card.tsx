import { Button } from "@/components/ui/button";
import type { Video } from "@shared/schema";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Science Lab":
        return "bg-[hsl(var(--discovery-blue))]";
      case "Space":
        return "bg-purple-500";
      case "Animals":
        return "bg-[hsl(var(--lime-green))]";
      case "Machines":
        return "bg-gray-600";
      case "Human Body":
        return "bg-[hsl(var(--tomato-red))]";
      default:
        return "bg-[hsl(var(--discovery-blue))]";
    }
  };

  const handleWatchClick = () => {
    // Simulate opening a video player or redirect to video content
    alert(`🎬 Opening "${video.title}"!\n\nIn a real app, this would open the video player or redirect to the video content.`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 bg-[hsl(var(--tomato-red))] rounded-full flex items-center justify-center animate-pulse">
            <i className="fas fa-play text-white text-xl ml-1"></i>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`${getCategoryColor(video.category)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
            {video.category}
          </span>
          <span className="text-[hsl(var(--dark-slate))] text-sm">{video.duration}</span>
        </div>
        <h3 className="font-comic text-xl font-bold text-[hsl(var(--dark-slate))] mb-2">
          {video.title}
        </h3>
        <p className="text-[hsl(var(--dark-slate))] opacity-75 mb-4">
          {video.description}
        </p>
        <Button 
          onClick={handleWatchClick}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <i className="fas fa-play mr-2"></i>Watch Now
        </Button>
      </div>
    </div>
  );
}
