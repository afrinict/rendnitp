
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: "/lovable-uploads/0d74774a-311a-4378-8eb7-d7c3dbe9a154.png",
    title: "Advancing Urban Planning",
    subtitle: "Excellence in Nigeria",
    description: "Join the digital hub for Nigerian town planning professionals"
  },
  {
    image: "/lovable-uploads/01fb6d0f-87f1-46f8-aba1-bf93009603ea.png",
    title: "Professional Development",
    subtitle: "Continuous Learning",
    description: "Access cutting-edge resources and training materials"
  },
  {
    image: "/lovable-uploads/27764b8c-c16d-4662-afe0-22284b74ba75.png",
    title: "Sustainable Communities",
    subtitle: "Planning for the Future",
    description: "Creating livable spaces for generations to come"
  },
  {
    image: "/lovable-uploads/c3918e7a-7a40-4efb-a288-ca809bd414ee.png",
    title: "Urban Innovation",
    subtitle: "Smart City Solutions",
    description: "Leveraging technology for better urban planning"
  },
  {
    image: "/lovable-uploads/c1b05627-53bf-4506-b2d8-3774b7332fa2.png",
    title: "Infrastructure Excellence",
    subtitle: "Building Tomorrow",
    description: "Developing robust infrastructure for growing cities"
  }
];

export const HeroSlider = ({ onRegister, onLogin }: { onRegister: () => void; onLogin: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${currentSlideData.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {currentSlideData.title}
            <span className="block text-green-400 mt-2">{currentSlideData.subtitle}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in">
            {currentSlideData.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              onClick={onRegister} 
              className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
            >
              Become a Member
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onLogin}
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-gray-900"
            >
              Member Portal
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 border-white/30 text-white hover:bg-white/30"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 border-white/30 text-white hover:bg-white/30"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-green-400" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
