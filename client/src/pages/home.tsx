import { useQuery } from "@tanstack/react-query";
import type { Topic, Video, Game, Quiz, FunFact } from "@shared/schema";
import TopicCard from "@/components/topic-card";
import VideoCard from "@/components/video-card";
import GameCard from "@/components/game-card";
import QuizWidget from "@/components/quiz-widget";
import FunFactWidget from "@/components/fun-fact-widget";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  const { data: topics, isLoading: topicsLoading } = useQuery<Topic[]>({
    queryKey: ["/api/topics"],
  });

  const { data: featuredVideos, isLoading: videosLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos/featured"],
  });

  const { data: games, isLoading: gamesLoading } = useQuery<Game[]>({
    queryKey: ["/api/games"],
  });

  const { data: featuredQuiz } = useQuery<Quiz>({
    queryKey: ["/api/quizzes/featured"],
  });

  const { data: featuredFunFact } = useQuery<FunFact>({
    queryKey: ["/api/fun-facts/featured"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="font-comic text-4xl md:text-6xl font-bold text-[hsl(var(--discovery-blue))] mb-4 animate-pulse-slow">
            🚀 Discover How Everything Works! 🔬
          </h2>
          <p className="text-xl md:text-2xl text-[hsl(var(--dark-slate))] mb-8 max-w-3xl mx-auto">
            Join us on an amazing journey to learn about machines, nature, space, and so much more through fun videos, games, and experiments!
          </p>
          
          {/* Daily Fun Fact Widget */}
          {featuredFunFact && <FunFactWidget funFact={featuredFunFact} />}
        </div>
      </section>

      {/* Featured Topics Grid */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="font-comic text-3xl md:text-4xl font-bold text-center text-[hsl(var(--discovery-blue))] mb-8">
            🎯 Choose Your Adventure!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topicsLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-3xl" />
              ))
            ) : (
              topics?.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="py-12 px-4 bg-alice-blue">
        <div className="container mx-auto">
          <h2 className="font-comic text-3xl md:text-4xl font-bold text-center text-[hsl(var(--discovery-blue))] mb-8">
            🎬 Watch & Learn!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videosLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-2xl" />
              ))
            ) : (
              featuredVideos?.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))
            )}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/videos">
              <Button className="bg-[hsl(var(--discovery-blue))] text-white px-8 py-4 text-lg hover:bg-blue-600 transition-colors">
                <i className="fas fa-video mr-2"></i>View All Videos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Games Preview */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="font-comic text-3xl md:text-4xl font-bold text-center text-[hsl(var(--discovery-blue))] mb-8">
            🎮 Play & Discover!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {gamesLoading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-96 rounded-3xl" />
              ))
            ) : (
              games?.slice(0, 2).map((game) => (
                <GameCard key={game.id} game={game} featured />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Weekly Quiz Section */}
      {featuredQuiz && <QuizWidget quiz={featuredQuiz} />}
    </div>
  );
}
