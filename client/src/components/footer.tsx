import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[hsl(var(--discovery-blue))] rounded-full flex items-center justify-center">
                <i className="fas fa-lightbulb text-white"></i>
              </div>
              <div>
                <h3 className="font-comic text-xl font-bold">Discovery Kids</h3>
                <p className="text-sm opacity-75">How Things Work</p>
              </div>
            </div>
            <p className="text-gray-300">Making learning fun and accessible for curious minds everywhere!</p>
          </div>
          
          <div>
            <h4 className="font-comic text-lg font-bold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-300 hover:text-[hsl(var(--bright-yellow))] transition-colors cursor-pointer">
                    All Topics
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/videos">
                  <span className="text-gray-300 hover:text-[hsl(var(--bright-yellow))] transition-colors cursor-pointer">
                    Videos
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/games">
                  <span className="text-gray-300 hover:text-[hsl(var(--bright-yellow))] transition-colors cursor-pointer">
                    Games
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/experiments">
                  <span className="text-gray-300 hover:text-[hsl(var(--bright-yellow))] transition-colors cursor-pointer">
                    Experiments
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-comic text-lg font-bold mb-4">For Grown-ups</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/parent-zone">
                  <span className="text-gray-300 hover:text-[hsl(var(--bright-yellow))] transition-colors cursor-pointer">
                    Parent Zone
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/parent-zone">
                  <span className="text-gray-300 hover:text-[hsl(var(--bright-yellow))] transition-colors cursor-pointer">
                    Teacher Resources
                  </span>
                </Link>
              </li>
              <li>
                <span className="text-gray-300 hover:text-[hsl(var(--bright-yellow))] transition-colors cursor-pointer">
                  Learning Guides
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-[hsl(var(--bright-yellow))] transition-colors cursor-pointer">
                  Safety Tips
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-comic text-lg font-bold mb-4">Stay Connected</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-[hsl(var(--discovery-blue))] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-[hsl(var(--discovery-blue))] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-[hsl(var(--discovery-blue))] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-[hsl(var(--discovery-blue))] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">&copy; 2024 Discovery Kids. Making learning fun and safe for all children.</p>
        </div>
      </div>
    </footer>
  );
}
