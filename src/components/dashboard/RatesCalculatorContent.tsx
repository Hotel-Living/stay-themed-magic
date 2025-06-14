import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CostItemsTab } from "./rates-calculator/CostItemsTab";
import { DefaultCostsTab } from "./rates-calculator/DefaultCostsTab";
import { RatesCalculatorTab } from "./rates-calculator/RatesCalculatorTab";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
export const RatesCalculatorContent: React.FC = () => {
  const [mainMenuExpanded, setMainMenuExpanded] = useState(false);
  const [mainTab, setMainTab] = useState<string>("");
  const [costsSubTab, setCostsSubTab] = useState<string>("");
  const [profitsSubTab, setProfitsSubTab] = useState<string>("");
  const [modelExpanded, setModelExpanded] = useState(false);
  const [costsExpanded, setCostsExpanded] = useState(false);

  // New: States for the two submenus in the "BUILD YOUR OWN MODEL & RATES" section
  const [tipsExpanded, setTipsExpanded] = useState(false);
  const [downloadExpanded, setDownloadExpanded] = useState(false);

  // New: Which TIPS submenu (if any) is open
  const [openTipsSubmenu, setOpenTipsSubmenu] = useState<string | null>(null);

  // Handler to open/close TIPS submenus (only one open at a time in expanded view)
  const handleTipsSubmenuToggle = (submenuKey: string) => {
    setOpenTipsSubmenu(prev => prev === submenuKey ? null : submenuKey);
  };

  // For the Build Model section tabs
  const [modelTab, setModelTab] = useState<string>("read-this"); // default

  // Single-click to toggle top-level main menu
  const handleHeaderClick = () => {
    setMainMenuExpanded(prev => {
      if (prev) {
        setMainTab("");
        setCostsExpanded(false);
        setModelExpanded(false);
        setCostsSubTab("");
        setProfitsSubTab("");
        // Also collapse submenus in model section if open
        setTipsExpanded(false);
        setDownloadExpanded(false);
      }
      return !prev;
    });
  };

  // Single-click to toggle COSTS & PROFITS menu
  const handleCostsMainTabClick = () => {
    setCostsExpanded(prev => {
      if (prev) {
        setMainTab("");
        setCostsSubTab("");
        setProfitsSubTab("");
      } else {
        setMainTab("costs-profits");
        setModelExpanded(false);
        setCostsSubTab("");
        setProfitsSubTab("");
        // Model submenus stay collapsed
      }
      return !prev;
    });
  };

  // Single-click to toggle BUILD YOUR OWN MODEL & RATES menu
  const handleModelTabClick = () => {
    setModelExpanded(prev => {
      if (prev) {
        setMainTab("");
        // Also collapse submenus
        setTipsExpanded(false);
        setDownloadExpanded(false);
      } else {
        setMainTab("model-rates-calculator");
        setCostsExpanded(false);
        setCostsSubTab("");
        setProfitsSubTab("");
        // Model submenus start collapsed
        setTipsExpanded(false);
        setDownloadExpanded(false);
      }
      return !prev;
    });
  };

  // COSTS/PROFITS submenu behavior
  const handleCostsSubTabClick = () => {
    setCostsSubTab(prev => prev === "costs" ? "" : "costs");
    setProfitsSubTab(""); // Close profits menu if opening costs
  };
  const handleProfitsSubTabClick = () => {
    setCostsSubTab(prev => prev === "profits" ? "" : "profits");
    setProfitsSubTab(""); // Reset 3/4/5-star submenu on open/close
  };

  // 3/4/5-star submenu
  const handleProfitsStarTabClick = (star: string) => {
    setProfitsSubTab(prev => prev === star ? "" : star);
  };

  // Handlers for new submenus (single click toggles)
  const handleTipsClick = () => {
    setTipsExpanded(prev => !prev);
    if (!tipsExpanded) setDownloadExpanded(false);
  };
  const handleDownloadClick = () => {
    setDownloadExpanded(prev => !prev);
    if (!downloadExpanded) setTipsExpanded(false);
  };
  return <div className="space-y-6">
      {/* Header MENU */}
      <div className="glass-card rounded-lg p-6 text-white border-fuchsia-500/20 bg-[#0807a0] cursor-pointer" onClick={handleHeaderClick}>
        <h2 className="text-xl font-bold text-center">
          HOTEL-LIVING STANDARD ECONOMIC MODEL
        </h2>
      </div>

      {mainMenuExpanded && <Tabs value={mainTab} onValueChange={() => {}} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#460F54]/30 backdrop-blur-sm h-16 p-2">
            <TabsTrigger value="costs-profits" className={`py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-[#8017B0] text-white hover:bg-[#8017B0]/80 transition-all duration-300 font-bold text-lg cursor-pointer ${costsExpanded ? "border border-white/40" : ""}`} onClick={handleCostsMainTabClick} aria-pressed={costsExpanded}>
              COSTS & PROFITS
            </TabsTrigger>
            <TabsTrigger value="model-rates-calculator" className={`py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-[#8017B0] text-white hover:bg-[#8017B0]/80 transition-all duration-300 font-bold text-lg cursor-pointer ${modelExpanded ? "border border-white/40" : ""}`} onClick={handleModelTabClick} aria-pressed={modelExpanded}>
              BUILD YOUR OWN MODEL & RATES
            </TabsTrigger>
          </TabsList>

          {/* COSTS & PROFITS Section (untouched) */}
          {mainTab === "costs-profits" && <TabsContent value="costs-profits">
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
                  <TabsTrigger value="costs" className={`py-3 px-4 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/80 data-[state=active]:to-purple-500/80 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-blue-300/30 bg-transparent text-white/70 hover:text-white hover:bg-blue-500/20 transition-all duration-300 font-medium text-base cursor-pointer ${costsSubTab === "costs" ? "border border-white/40" : ""}`} onClick={handleCostsSubTabClick} aria-pressed={costsSubTab === "costs"}>
                    COSTS
                  </TabsTrigger>
                  <TabsTrigger value="profits" className={`py-3 px-4 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/80 data-[state=active]:to-purple-500/80 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-blue-300/30 bg-transparent text-white/70 hover:text-white hover:bg-blue-500/20 transition-all duration-300 font-medium text-base cursor-pointer ${costsSubTab === "profits" ? "border border-white/40" : ""}`} onClick={handleProfitsSubTabClick} aria-pressed={costsSubTab === "profits"}>
                    PROFITS
                  </TabsTrigger>
                </TabsList>
                {/* COSTS TAB CONTENT */}
                {costsSubTab === "costs" && <TabsContent value="costs">
                    <CostItemsTab />
                  </TabsContent>}
                {/* PROFITS SUBMENU */}
                {costsSubTab === "profits" && <TabsContent value="profits">
                    <Tabs value={profitsSubTab} onValueChange={() => {}} className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-6 bg-[#5A0080] backdrop-blur-lg border border-blue-400/20 rounded-xl h-14 p-2 shadow-lg">
                        {["3-star", "4-star", "5-star"].map(star => <TabsTrigger key={star} value={star} className={`py-3 px-4 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/80 data-[state=active]:to-purple-500/80 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-blue-300/30 bg-transparent text-white/70 hover:text-white hover:bg-blue-500/20 transition-all duration-300 font-medium text-sm ${profitsSubTab === star ? "border border-white/40" : ""}`} onClick={() => handleProfitsStarTabClick(star)} aria-pressed={profitsSubTab === star}>
                            {star.replace('-', ' ').toUpperCase()} HOTEL
                          </TabsTrigger>)}
                      </TabsList>
                      <TabsContent value="3-star">
                        {profitsSubTab === "3-star" && <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm font-bold">
                            <img src="/lovable-uploads/d102e7a1-55cd-400e-8ce4-ff11ad9b8a7a.png" alt="3 Star Hotel Profit Model" className="w-full h-auto rounded-lg shadow-lg border border-purple-400/20" />
                          </div>}
                      </TabsContent>
                      <TabsContent value="4-star">
                        {profitsSubTab === "4-star" && <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
                            <img src="/lovable-uploads/c4c66028-2a49-4072-8ecb-b28c54c16452.png" alt="4 Star Hotel Profit Model" className="w-full h-auto rounded-lg shadow-lg border border-purple-400/20" />
                          </div>}
                      </TabsContent>
                      <TabsContent value="5-star">
                        {profitsSubTab === "5-star" && <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
                            <img src="/lovable-uploads/e36c9773-e800-452c-bd1e-a77067fc493c.png" alt="5 Star Hotel Profit Model" className="w-full h-auto rounded-lg shadow-lg border border-purple-400/20" />
                          </div>}
                      </TabsContent>
                    </Tabs>
                  </TabsContent>}
              </Tabs>
            </TabsContent>}

          {/* BUILD YOUR OWN MODEL & RATES Section */}
          {mainTab === "model-rates-calculator" && <TabsContent value="model-rates-calculator">
              {/* General instructional text */}
              <div className="mb-6 text-white bg-gradient-to-r from-blue-700/60 to-fuchsia-800/60 rounded-lg p-6 border border-fuchsia-400/15 shadow backdrop-blur-sm">
                <h3 className="font-extrabold text-base uppercase mb-2 tracking-wider text-fuchsia-200">BEFORE STARTING: PLEASE READ CAREFULLY</h3>
                <div className="text-[15px] leading-relaxed font-medium">
                  Building your custom model is a crucial step to maximize your revenue opportunities.<br />
                  We strongly recommend that you carefully review the “TIPS & STRATEGIC GUIDELINES” section first.<br />
                  These recommendations will help you design a model fully adapted to your hotel's category, capacity, and audience profile.<br />
                  <b>Once you have studied the guidelines, you may proceed to download and use the Online Calculator located on the right.</b>
                </div>
              </div>
              {/* --- Model Builder Tabs (fixed, full width) --- */}
              <Tabs value={modelTab} onValueChange={setModelTab} className="w-full">
                <TabsList className="flex w-full mb-6 gap-1 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl shadow-lg">
                  <TabsTrigger value="read-this" className="flex-1 text-xs md:text-base uppercase tracking-tight rounded-none data-[state=active]:bg-[#12002b] data-[state=active]:text-fuchsia-100 text-white bg-transparent px-1 md:px-4 py-4 transition-all font-normal">
                    PLEASE READ THIS
                  </TabsTrigger>
                  <TabsTrigger value="3star" className="flex-1 text-xs uppercase tracking-tight rounded-none data-[state=active]:bg-[#12002b] data-[state=active]:text-fuchsia-100 text-white bg-transparent px-1 md:px-4 py-4 transition-all font-normal md:text-base">
                    3-STAR HOTELS
                  </TabsTrigger>
                  <TabsTrigger value="4star" className="flex-1 text-xs md:text-base uppercase tracking-tight rounded-none data-[state=active]:bg-[#12002b] data-[state=active]:text-fuchsia-100 text-white bg-transparent px-1 md:px-4 py-4 transition-all font-normal">
                    4-STAR HOTELS
                  </TabsTrigger>
                  <TabsTrigger value="5star" className="flex-1 text-xs md:text-base uppercase tracking-tight rounded-none data-[state=active]:bg-[#12002b] data-[state=active]:text-fuchsia-100 text-white bg-transparent px-1 md:px-4 py-4 transition-all font-normal">
                    5-STAR HOTELS
                  </TabsTrigger>
                  <TabsTrigger value="download" className="flex-1 text-xs md:text-base uppercase tracking-tight rounded-none data-[state=active]:bg-[#12002b] data-[state=active]:text-fuchsia-100 text-white bg-transparent px-1 md:px-4 py-4 transition-all font-normal">
                    DOWNLOAD CALCULATOR
                  </TabsTrigger>
                </TabsList>
                {/* PLEASE READ THIS Tab Content */}
                <TabsContent value="read-this" className="w-full">
                  <div className="w-full p-6 bg-[#12002b] rounded-lg">
                    {/* All 8 points, expanded as plain text sections */}
                    <div className="mb-4">
                      <div className="font-bold text-white text-base mb-2">
                        1️⃣ DOES YOUR HOTEL HAVE TO CLOSE FOR LONG PERIODS EACH YEAR?
                      </div>
                      <div className="text-white/80 text-[15px]">
                        Most hotels have certain periods during the year when demand drops significantly, leading to partial or full closures. By adopting a flexible living model, you can keep rooms filled during these low seasons, stabilizing income and improving operational efficiency year-round.
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="font-bold text-white text-base mb-2">
                        2️⃣ NOBODY KNOWS YOUR HOTEL BETTER THAN YOU DO
                      </div>
                      <div className="text-white/80 text-[15px]">
                        Use your in-depth experience to build a living-stay model adapted to your specific reality, cultural context, and clientele. No generic formula beats your understanding of your business’s unique seasonality and potential.
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="font-bold text-white text-base mb-2">
                        3️⃣ BUILD A MODEL THAT GUARANTEES FULL OCCUPANCY
                      </div>
                      <div className="text-white/80 text-[15px]">
                        The key to sustained success is stable, predictable revenue and full rooms—even during historically low occupancy months. Structure rates and packages so that “living” guests fill gaps left by transient guests without undermining your regular pricing.
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="font-bold text-white text-base mb-2">
                        4️⃣ USE AFFINITIES TO DIFFERENTIATE AND TARGET AUDIENCES
                      </div>
                      <div className="text-white/80 text-[15px]">
                        Focus on niche audiences (artists, digital nomads, retirees, etc.) to avoid competing directly with standard hotel offerings and OTAs. Use affinities to build loyal, recurring client groups adapted to your category (see “Themes” section).
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="font-bold text-white text-base mb-2">
                        5️⃣ ADAPT LENGTH OF STAY TO HOTEL SIZE AND DYNAMICS
                      </div>
                      <div className="text-white/80 text-[15px]">
                        Smaller hotels may benefit from longer minimum stays (e.g., 1-3 months), reducing turnover cost. Larger hotels can experiment with rotations—e.g., “9 nights per month club”—to optimize for higher volume and guest experience.
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="font-bold text-white text-base mb-2">
                        6️⃣ LEVERAGE BOUTIQUE CONCEPTS FOR SMALL HIGH-END HOTELS
                      </div>
                      <div className="text-white/80 text-[15px]">
                        If you manage a boutique or luxury hotel, design tailored experiences (wellness, culture, business retreats) with premium rates. These can be highly attractive to remote professionals or guests seeking exclusivity and added value.
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="font-bold text-white text-base mb-2">
                        7️⃣ APPLY VOLUME LOGIC FOR LARGER HOTELS
                      </div>
                      <div className="text-white/80 text-[15px]">
                        Larger properties can tap into “living at scale” logic—discounts for recurring guests, flexible plans (e.g., alternate weeks), and partnerships with institutions or companies to fill blocks of rooms efficiently.
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-white text-base mb-2">
                        8️⃣ UNDERSTAND THE POWER OF RECURRING STAYS AND CUSTOMER ROTATION
                      </div>
                      <div className="text-white/80 text-[15px]">
                        Monthly, multi-month, or club-style stays (where guests return on set days each month) increase forecastability while giving guests “home” status. This increases loyalty and can transform your hotel’s business model in a predictable, positive way.
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="3star" className="w-full">
                  <div className="w-full p-8 bg-[#12002b] rounded-lg text-white text-lg">
                    <p>
                      [Insert detailed strategic guidelines for 3-star hotels here. Replace with your specific content.]
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="4star" className="w-full">
                  <div className="w-full p-8 bg-[#12002b] rounded-lg text-white text-lg">
                    <p>
                      [Insert detailed strategic guidelines for 4-star hotels here. Replace with your specific content.]
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="5star" className="w-full">
                  <div className="w-full p-8 bg-[#12002b] rounded-lg text-white text-lg">
                    <p>
                      [Insert detailed strategic guidelines for 5-star hotels here. Replace with your specific content.]
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="download" className="w-full">
                  <div className="p-4 bg-[#140030]/70 text-white rounded-lg border-t border-fuchsia-400/15">
                    <div>
                      <p className="mb-3">
                        Access the online calculator and supporting documents for building and testing your custom hotel living rates model.
                      </p>
                      <a href="#" className="inline-block px-5 py-2 font-semibold bg-fuchsia-600 hover:bg-fuchsia-700 transition rounded text-white shadow" target="_blank" rel="noopener noreferrer" tabIndex={0}>
                        Download Excel Calculator
                      </a>
                      <p className="mt-2 text-xs text-fuchsia-200 opacity-80">
                        Contact us if you need a different format or support customizing your template.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              {/* Existing content below, if needed, can remain. You may choose to comment it out or leave a simple placeholder: */}
              {/* <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
                <div className="text-lg">
                  Model & Rates Calculator content will be added here.
                </div>
               </div> */}
            </TabsContent>}
        </Tabs>}
    </div>;
};