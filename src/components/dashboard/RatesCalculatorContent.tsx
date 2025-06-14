
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CostItemsTab } from "./rates-calculator/CostItemsTab";
import { DefaultCostsTab } from "./rates-calculator/DefaultCostsTab";
import { RatesCalculatorTab } from "./rates-calculator/RatesCalculatorTab";

export const RatesCalculatorContent: React.FC = () => {
  const [mainMenuExpanded, setMainMenuExpanded] = useState(false);
  const [mainTab, setMainTab] = useState<string>("");
  const [costsSubTab, setCostsSubTab] = useState<string>("");
  const [profitsSubTab, setProfitsSubTab] = useState<string>("");
  const [modelExpanded, setModelExpanded] = useState(false);
  const [costsExpanded, setCostsExpanded] = useState(false);

  // Single-click to toggle top-level main menu
  const handleHeaderClick = () => {
    setMainMenuExpanded((prev) => {
      if (prev) {
        // Collapse everything
        setMainTab("");
        setCostsExpanded(false);
        setModelExpanded(false);
        setCostsSubTab("");
        setProfitsSubTab("");
      }
      return !prev;
    });
  };

  // Single-click to toggle COSTS & PROFITS menu
  const handleCostsMainTabClick = () => {
    setCostsExpanded((prev) => {
      if (prev) {
        setMainTab("");
        setCostsSubTab("");
        setProfitsSubTab("");
      } else {
        setMainTab("costs-profits");
        setModelExpanded(false);
        setCostsSubTab("");
        setProfitsSubTab("");
      }
      return !prev;
    });
  };

  // Single-click to toggle BUILD YOUR OWN MODEL & RATES menu
  const handleModelTabClick = () => {
    setModelExpanded((prev) => {
      if (prev) {
        setMainTab("");
      } else {
        setMainTab("model-rates-calculator");
        setCostsExpanded(false);
        setCostsSubTab("");
        setProfitsSubTab("");
      }
      return !prev;
    });
  };

  // COSTS/PROFITS submenu behavior
  const handleCostsSubTabClick = () => {
    setCostsSubTab((prev) => (prev === "costs" ? "" : "costs"));
    setProfitsSubTab(""); // Close profits menu if opening costs
  };
  const handleProfitsSubTabClick = () => {
    setCostsSubTab((prev) => (prev === "profits" ? "" : "profits"));
    setProfitsSubTab(""); // Reset 3/4/5-star submenu on open/close
  };

  // 3/4/5-star submenu
  const handleProfitsStarTabClick = (star: string) => {
    setProfitsSubTab((prev) => (prev === star ? "" : star));
  };

  // Always collapsed by default on first render, handled via initial state above

  return (
    <div className="space-y-6">
      {/* Header MENU */}
      <div
        className="glass-card rounded-lg p-6 text-white border-fuchsia-500/20 bg-[#0807a0] cursor-pointer"
        onClick={handleHeaderClick}
      >
        <h2 className="text-xl font-bold text-center">
          HOTEL-LIVING STANDARD ECONOMIC MODEL
        </h2>
      </div>

      {mainMenuExpanded && (
        <Tabs value={mainTab} onValueChange={() => {}} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#460F54]/30 backdrop-blur-sm h-16 p-2">
            <TabsTrigger 
              value="costs-profits"
              className={`py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-[#8017B0] text-white hover:bg-[#8017B0]/80 transition-all duration-300 font-bold text-lg cursor-pointer ${costsExpanded ? "border border-white/40" : ""}`}
              onClick={handleCostsMainTabClick}
              aria-pressed={costsExpanded}
            >
              COSTS & PROFITS
            </TabsTrigger>
            <TabsTrigger 
              value="model-rates-calculator"
              className={`py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-[#8017B0] text-white hover:bg-[#8017B0]/80 transition-all duration-300 font-bold text-lg cursor-pointer ${modelExpanded ? "border border-white/40" : ""}`}
              onClick={handleModelTabClick}
              aria-pressed={modelExpanded}
            >
              BUILD YOUR OWN MODEL & RATES
            </TabsTrigger>
          </TabsList>

          {/* COSTS & PROFITS Submenu */}
          {costsExpanded && (
            <TabsContent value="costs-profits">
              <div className="relative text-white/90 text-sm text-center px-4 mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl opacity-60"></div>
                <div className="relative bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-400/20 rounded-lg p-4">
                  <p className="font-bold">
                    These figures represent an example of average incremental costs per additional occupied room for 3-4-5 star standard hotel model in Western markets. Actual costs may vary and should be adjusted based on each hotel's specific category, level of service, positioning, and operational model.
                  </p>
                </div>
              </div>
              <Tabs value={costsSubTab} onValueChange={() => {}} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#5A0080] backdrop-blur-lg border border-blue-400/20 rounded-xl h-14 p-2 shadow-lg">
                  <TabsTrigger
                    value="costs"
                    className={`py-3 px-4 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/80 data-[state=active]:to-purple-500/80 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-blue-300/30 bg-transparent text-white/70 hover:text-white hover:bg-blue-500/20 transition-all duration-300 font-medium text-base cursor-pointer ${costsSubTab === "costs" ? "border border-white/40" : ""}`}
                    onClick={handleCostsSubTabClick}
                    aria-pressed={costsSubTab === "costs"}
                  >
                    COSTS
                  </TabsTrigger>
                  <TabsTrigger
                    value="profits"
                    className={`py-3 px-4 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/80 data-[state=active]:to-purple-500/80 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-blue-300/30 bg-transparent text-white/70 hover:text-white hover:bg-blue-500/20 transition-all duration-300 font-medium text-base cursor-pointer ${costsSubTab === "profits" ? "border border-white/40" : ""}`}
                    onClick={handleProfitsSubTabClick}
                    aria-pressed={costsSubTab === "profits"}
                  >
                    PROFITS
                  </TabsTrigger>
                </TabsList>
                {/* COSTS TAB CONTENT */}
                {costsSubTab === "costs" && (
                  <TabsContent value="costs">
                    <CostItemsTab />
                  </TabsContent>
                )}
                {/* PROFITS SUBMENU */}
                {costsSubTab === "profits" && (
                  <TabsContent value="profits">
                    <Tabs value={profitsSubTab} onValueChange={() => {}} className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-6 bg-[#5A0080] backdrop-blur-lg border border-blue-400/20 rounded-xl h-14 p-2 shadow-lg">
                        {["3-star", "4-star", "5-star"].map(star => (
                          <TabsTrigger
                            key={star}
                            value={star}
                            className={`py-3 px-4 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/80 data-[state=active]:to-purple-500/80 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-blue-300/30 bg-transparent text-white/70 hover:text-white hover:bg-blue-500/20 transition-all duration-300 font-medium text-sm ${profitsSubTab === star ? "border border-white/40" : ""}`}
                            onClick={() => handleProfitsStarTabClick(star)}
                            aria-pressed={profitsSubTab === star}
                          >
                            {star.replace('-', ' ').toUpperCase()} HOTEL
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      <TabsContent value="3-star">
                        {profitsSubTab === "3-star" && (
                          <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
                            <img 
                              src="/lovable-uploads/d102e7a1-55cd-400e-8ce4-ff11ad9b8a7a.png"
                              alt="3 Star Hotel Profit Model"
                              className="w-full h-auto rounded-lg shadow-lg border border-purple-400/20"
                            />
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="4-star">
                        {profitsSubTab === "4-star" && (
                          <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
                            <img 
                              src="/lovable-uploads/c4c66028-2a49-4072-8ecb-b28c54c16452.png"
                              alt="4 Star Hotel Profit Model"
                              className="w-full h-auto rounded-lg shadow-lg border border-purple-400/20"
                            />
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="5-star">
                        {profitsSubTab === "5-star" && (
                          <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
                            <img 
                              src="/lovable-uploads/e36c9773-e800-452c-bd1e-a77067fc493c.png"
                              alt="5 Star Hotel Profit Model"
                              className="w-full h-auto rounded-lg shadow-lg border border-purple-400/20"
                            />
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </TabsContent>
                )}
              </Tabs>
            </TabsContent>
          )}

          {/* BUILD YOUR OWN MODEL & RATES Submenu */}
          {modelExpanded && (
            <TabsContent value="model-rates-calculator">
              <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
                <div className="text-lg">
                  Model & Rates Calculator content will be added here.
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );
};
