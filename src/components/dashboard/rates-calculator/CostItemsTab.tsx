
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const CostItemsTab: React.FC = () => {
  const { t } = useTranslation();

  const costItems = [
    { 
      key: "utilities", 
      label: t("ratesCalculator.utilities"),
      image: "/lovable-uploads/589c396e-8094-48ec-956c-aeb87a21450a.png"
    },
    { 
      key: "cleaning", 
      label: t("ratesCalculator.cleaning"),
      image: "/lovable-uploads/589c396e-8094-48ec-956c-aeb87a21450a.png"
    },
    { 
      key: "meals", 
      label: t("ratesCalculator.meals"),
      image: "/lovable-uploads/b7711836-1bee-486f-b7e0-36f26096aa24.png"
    },
    { 
      key: "totalCost", 
      label: t("ratesCalculator.totalCost"),
      image: "/lovable-uploads/589c396e-8094-48ec-956c-aeb87a21450a.png"
    }
  ];

  const [activeTab, setActiveTab] = React.useState("utilities");

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {costItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === item.key
                ? "bg-fuchsia-600 text-white"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass-card rounded-lg p-8 text-center text-white/80 border-fuchsia-500/20 bg-[#5f098a]">
        {costItems.map((item) => (
          activeTab === item.key && (
            <div key={item.key}>
              <h3 className="text-xl font-bold mb-4">{item.label}</h3>
              <img
                src={item.image}
                alt={`${item.label} Cost Table`}
                className="mx-auto max-w-full h-auto rounded-lg"
              />
            </div>
          )
        ))}
      </div>
    </div>
  );
};
