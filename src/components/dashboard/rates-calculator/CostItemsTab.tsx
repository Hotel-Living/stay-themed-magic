
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

export const CostItemsTab: React.FC = () => {
  const { t } = useTranslation();

  const costItems = [
    {
      category: t("ratesCalculator.utilities"),
      image: "/lovable-uploads/fcb14431-76ce-4d2e-8965-d02ccb3b8bb4.png",
      title: t("ratesCalculator.utilitiesTitle"),
      subtitle: t("ratesCalculator.utilitiesGuestsNotTransients"),
      description: t("ratesCalculator.utilitiesDescription1"),
      smartTitle: t("ratesCalculator.utilitiesSmartGuestsTitle"),
      smartDescription: t("ratesCalculator.utilitiesDescription2"),
      additionalInfo: t("ratesCalculator.utilitiesDescription3"),
      details: [
        t("ratesCalculator.utilitiesElectricity"),
        t("ratesCalculator.utilitiesWater"),
        t("ratesCalculator.utilitiesHeating")
      ]
    },
    {
      category: t("ratesCalculator.cleaning"),
      image: "/lovable-uploads/fcb14431-76ce-4d2e-8965-d02ccb3b8bb4.png",
      title: t("ratesCalculator.cleaningModelTitle"),
      subtitle: t("ratesCalculator.cleaningHotelLivingStandard"),
      description: t("ratesCalculator.cleaningDescription1"),
      smartTitle: t("ratesCalculator.cleaningFeelsLikeHome"),
      smartDescription: t("ratesCalculator.cleaningDescription2"),
      additionalInfo: t("ratesCalculator.cleaningCompleteTitle"),
      details: [
        t("ratesCalculator.cleaningFrequency"),
        t("ratesCalculator.cleaningDepth"),
        t("ratesCalculator.cleaningSupplies"),
        t("ratesCalculator.cleaningStaff")
      ]
    },
    {
      category: t("ratesCalculator.meals"),
      image: "/lovable-uploads/fcb14431-76ce-4d2e-8965-d02ccb3b8bb4.png",
      title: t("ratesCalculator.mealsModelTitle"),
      subtitle: t("ratesCalculator.mealsModelDescription1"),
      description: t("ratesCalculator.mealsModelDescription2"),
      smartTitle: t("ratesCalculator.mealsModelDescription3"),
      smartDescription: t("ratesCalculator.mealsModelDescription4"),
      details: [
        t("ratesCalculator.mealsBreakfast"),
        t("ratesCalculator.mealsLunch"),
        t("ratesCalculator.mealsDinner"),
        t("ratesCalculator.mealsSpecialDiets")
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {costItems.map((item, index) => (
        <Card key={index} className="glass-card bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 border-purple-400/20">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Content Section */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full">
                    <h3 className="text-xl font-bold text-white">{item.category}</h3>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white leading-tight">
                    {item.title}
                  </h4>
                  
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-purple-200">
                      {item.subtitle}
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-lg font-bold text-purple-200">
                    {item.smartTitle}
                  </h5>
                  <p className="text-gray-300 leading-relaxed">
                    {item.smartDescription}
                  </p>
                  {item.additionalInfo && (
                    <p className="text-gray-300 leading-relaxed">
                      {item.additionalInfo}
                    </p>
                  )}
                </div>

                {item.details && (
                  <div className="space-y-3">
                    <h6 className="text-md font-semibold text-purple-200">Key Benefits:</h6>
                    <ul className="space-y-2">
                      {item.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span className="text-gray-300 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Image Section */}
              <div className="flex justify-center lg:justify-end">
                <img
                  src={item.image}
                  alt={`${item.category} illustration`}
                  className="rounded-lg shadow-lg border border-purple-400/20 max-w-full h-auto"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Disclaimer */}
      <Card className="glass-card bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-amber-400/20">
        <CardContent className="p-6">
          <p className="text-sm text-amber-200 leading-relaxed">
            {t("ratesCalculator.disclaimer")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
