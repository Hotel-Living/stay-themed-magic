
import React from "react";
import { BankingInfo, LaundryService } from "@/types/hotel/detail";

interface HotelAmenitiesSectionProps {
  laundry_service?: LaundryService;
  additional_amenities?: string[];
  special_features?: string[];
  accessibility_features?: string[];
  check_in_instructions?: string | null;
  local_recommendations?: string | null;
  house_rules?: string[];
  cancellation_policy?: string | null;
}

export function HotelAmenitiesSection({
  laundry_service,
  additional_amenities,
  special_features,
  accessibility_features,
  check_in_instructions,
  local_recommendations,
  house_rules,
  cancellation_policy
}: HotelAmenitiesSectionProps) {
  const hasAnyContent = laundry_service?.available || 
    (additional_amenities && additional_amenities.length > 0) ||
    (special_features && special_features.length > 0) ||
    (accessibility_features && accessibility_features.length > 0) ||
    check_in_instructions ||
    local_recommendations ||
    (house_rules && house_rules.length > 0) ||
    cancellation_policy;

  if (!hasAnyContent) return null;

  return (
    <div className="mb-8 space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-white text-left">AMENITIES & SERVICES</h2>
      
      {/* Laundry Service */}
      {laundry_service?.available && (
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-2">Laundry Service</h3>
          <div className="space-y-1 text-white/80">
            {laundry_service.self_service && (
              <p>• Self-service laundry available</p>
            )}
            {laundry_service.full_service && (
              <p>• Full-service laundry available</p>
            )}
            {laundry_service.external_redirect && (
              <p>• External service: {laundry_service.external_redirect}</p>
            )}
            {laundry_service.pricing && (
              <p>• Pricing: {laundry_service.pricing}</p>
            )}
          </div>
        </div>
      )}

      {/* Additional Amenities */}
      {additional_amenities && additional_amenities.length > 0 && (
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-2">Additional Amenities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-white/80">
            {additional_amenities.map((amenity, index) => (
              <p key={index}>• {amenity}</p>
            ))}
          </div>
        </div>
      )}

      {/* Special Features */}
      {special_features && special_features.length > 0 && (
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-2">Special Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-white/80">
            {special_features.map((feature, index) => (
              <p key={index}>• {feature}</p>
            ))}
          </div>
        </div>
      )}

      {/* Accessibility Features */}
      {accessibility_features && accessibility_features.length > 0 && (
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-2">Accessibility Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-white/80">
            {accessibility_features.map((feature, index) => (
              <p key={index}>• {feature}</p>
            ))}
          </div>
        </div>
      )}

      {/* Check-in Instructions */}
      {check_in_instructions && (
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-2">Check-in Instructions</h3>
          <p className="text-white/80 whitespace-pre-line">{check_in_instructions}</p>
        </div>
      )}

      {/* Local Recommendations */}
      {local_recommendations && (
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-2">Local Recommendations</h3>
          <p className="text-white/80 whitespace-pre-line">{local_recommendations}</p>
        </div>
      )}

      {/* House Rules */}
      {house_rules && house_rules.length > 0 && (
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-2">House Rules</h3>
          <div className="space-y-1 text-white/80">
            {house_rules.map((rule, index) => (
              <p key={index}>• {rule}</p>
            ))}
          </div>
        </div>
      )}

      {/* Cancellation Policy */}
      {cancellation_policy && (
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-2">Cancellation Policy</h3>
          <p className="text-white/80 whitespace-pre-line">{cancellation_policy}</p>
        </div>
      )}
    </div>
  );
}
