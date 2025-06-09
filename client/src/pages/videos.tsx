import { useQuery } from "@tanstack/react-query";
import type { Video } from "@shared/schema";
import VideoCard from "@/components/video-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Videos() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: videos, isLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const categories = ["all", "Science Lab", "Space", "Animals", "Machines", "Human Body"];
  
  const filteredVideos = videos?.filter(video => 
    selectedCategory === "all" || video.category === selectedCategory
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h1 className="font-comic text-4xl md:text-6xl font-bold text-[hsl(var(--discovery-blue))] mb-4 animate-pulse-slow">
            🎬 Educational Videos
          </h1>
          <p className="text-xl md:text-2xl text-[hsl(var(--dark-slate))] mb-8 max-w-3xl mx-auto">
            Watch and learn! Our engaging videos explain how things work in simple, fun ways.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-alice-blue">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full px-6 py-2 font-bold transition-colors ${
                  selectedCategory === category 
                    ? "bg-blue-600 text-white border-2 border-blue-600 shadow-lg" 
                    : "bg-white text-gray-800 border-2 border-blue-600 hover:bg-blue-600 hover:text-white shadow-md"
                }`}
              >
                {category === "all" ? "All Videos" : category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-12 px-4 bg-alice-blue">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-2xl" />
              ))}
            </div>
          ) : filteredVideos && filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="font-comic text-2xl font-bold mb-2">No Videos Found</h3>
                <p className="text-[hsl(var(--dark-slate))] opacity-75">
                  {selectedCategory === "all" 
                    ? "We're working on creating amazing videos for you. Check back soon!"
                    : `No videos available in the ${selectedCategory} category yet.`
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
