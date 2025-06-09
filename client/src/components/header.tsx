import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: "fas fa-home" },
    { href: "/videos", label: "Videos", icon: "fas fa-video" },
    { href: "/games", label: "Games", icon: "fas fa-gamepad" },
    { href: "/experiments", label: "Experiments", icon: "fas fa-flask" },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-12 h-12 bg-[hsl(var(--discovery-blue))] rounded-full flex items-center justify-center animate-bounce-slow overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=48&h=48&fit=crop&crop=center" 
                  alt="Discovery Kids Logo"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    const icon = target.nextElementSibling as HTMLElement;
                    target.style.display = 'none';
                    if (icon) icon.style.display = 'flex';
                  }}
                />
                <i className="fas fa-lightbulb text-white text-xl hidden"></i>
              </div>
              <div>
                <h1 className="font-comic text-2xl font-bold text-[hsl(var(--discovery-blue))]">Discovery Kids</h1>
                <p className="text-sm text-[hsl(var(--dark-slate))] opacity-75">How Things Work</p>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={`text-[hsl(var(--dark-slate))] hover:text-[hsl(var(--discovery-blue))] font-semibold transition-colors cursor-pointer ${
                  location === item.href ? "text-[hsl(var(--discovery-blue))]" : ""
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/parent-zone">
              <Button className="bg-[hsl(var(--bright-yellow))] text-[hsl(var(--dark-slate))] hover:bg-yellow-400 transition-colors font-bold">
                <i className="fas fa-chalkboard-teacher mr-2"></i>Parents & Teachers
              </Button>
            </Link>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="bg-[hsl(var(--discovery-blue))] text-white border-none">
                  <i className="fas fa-bars"></i>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-[hsl(var(--discovery-blue))] rounded-full flex items-center justify-center">
                      <i className="fas fa-lightbulb text-white"></i>
                    </div>
                    <div>
                      <h2 className="font-comic text-lg font-bold text-[hsl(var(--discovery-blue))]">Discovery Kids</h2>
                      <p className="text-xs text-[hsl(var(--dark-slate))] opacity-75">How Things Work</p>
                    </div>
                  </div>
                  
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div 
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${
                          location === item.href 
                            ? "bg-[hsl(var(--discovery-blue))] text-white" 
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <i className={`${item.icon} text-lg`}></i>
                        <span className="font-semibold">{item.label}</span>
                      </div>
                    </Link>
                  ))}
                  
                  <Link href="/parent-zone">
                    <div 
                      className="flex items-center space-x-3 p-3 rounded-lg bg-[hsl(var(--bright-yellow))] text-[hsl(var(--dark-slate))] font-bold cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      <i className="fas fa-chalkboard-teacher text-lg"></i>
                      <span>Parents & Teachers</span>
                    </div>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
