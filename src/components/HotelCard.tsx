
import { Link } from "react-router-dom";
import { Hotel } from "@/utils/data";
import { HotelThemes } from "./ThemeTag";
import { Building, Star, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface HotelCardProps {
  hotel: Hotel;
  index?: number;
}

export function HotelCard({ hotel, index = 0 }: HotelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link 
        to={`/hotel/${hotel.id}`} 
        className="group block"
      >
        <div className="glass-card-hover overflow-hidden rounded-xl transition-all duration-500 group-hover:shadow-lg">
          <div className="aspect-[4/3] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
            <img 
              src={hotel.images[0]} 
              alt={hotel.name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 flex items-center gap-1 z-20 shadow-md">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            
            <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1">
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors drop-shadow-md">{hotel.name}</h3>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Building className="w-3 h-3" />
                <span>{hotel.city}, {hotel.country}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="mb-3">
              <HotelThemes themes={hotel.themes.slice(0, 2)} size="sm" />
              {hotel.themes.length > 2 && (
                <span className="text-xs text-indigo-500 ml-2">+{hotel.themes.length - 2} more</span>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-gradient">${hotel.pricePerMonth}/month</div>
              
              <div className="flex gap-3 text-gray-500 text-xs">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{hotel.availableMonths.length}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{Math.floor(Math.random() * 30) + 10}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
