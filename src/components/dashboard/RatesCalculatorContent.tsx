import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CostItemsTab } from "./rates-calculator/CostItemsTab";
import { DefaultCostsTab } from "./rates-calculator/DefaultCostsTab";
import { RatesCalculatorTab } from "./rates-calculator/RatesCalculatorTab";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ModelRatesTabs } from "./rates-calculator/ModelRatesTabs";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
export const RatesCalculatorContent: React.FC = () => {
  const {
    t,
    language
  } = useTranslation("dashboard");
  const { toast } = useToast();
  const [mainMenuExpanded, setMainMenuExpanded] = useState(false);
  const [mainTab, setMainTab] = useState<string>("");
  const [costsSubTab, setCostsSubTab] = useState<string>("");
  const [profitsSubTab, setProfitsSubTab] = useState<string>("");
  const [modelExpanded, setModelExpanded] = useState(false);
  const [costsExpanded, setCostsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

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

  // Handle Excel calculator download based on language
  const handleExcelDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      const fileName = language === 'es' 
        ? 'CALCULADORA HOTEL-LIVING.xlsm'
        : 'HOTEL-LIVING CALCULATOR ENGLISH.xlsx';
      
      const filePath = `/excel-calculators/${fileName}`;
      
      console.log('Attempting to download:', { language, fileName, filePath });
      
      // Fetch the file as a blob
      const response = await fetch(filePath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
      }
      
      const blob = await response.blob();
      
      // Create download URL and trigger download
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      URL.revokeObjectURL(downloadUrl);
      
      toast({
        title: "Download Started",
        description: `${fileName} is being downloaded`,
        variant: "success"
      });
      
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: `Could not download the Excel calculator. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

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
          {t('general.standardEconomicModel')}
        </h2>
      </div>

      {mainMenuExpanded && <Tabs value={mainTab} onValueChange={() => {}} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#460F54]/30 backdrop-blur-sm h-16 p-2">
            <TabsTrigger value="costs-profits" className={`py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-[#8017B0] text-white hover:bg-[#8017B0]/80 transition-all duration-300 font-bold text-lg cursor-pointer ${costsExpanded ? "border border-white/40" : ""}`} onClick={handleCostsMainTabClick} aria-pressed={costsExpanded}>
              {t('general.costsAndProfits')}
            </TabsTrigger>
            <TabsTrigger value="model-rates-calculator" className={`py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-[#8017B0] text-white hover:bg-[#8017B0]/80 transition-all duration-300 font-bold text-lg cursor-pointer ${modelExpanded ? "border border-white/40" : ""}`} onClick={handleModelTabClick} aria-pressed={modelExpanded}>
              {t('general.buildOwnModel')}
            </TabsTrigger>
          </TabsList>

          {/* COSTS & PROFITS Section */}
          {mainTab === "costs-profits" && <TabsContent value="costs-profits">
              <div className="relative text-white/90 text-sm text-center px-4 mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl opacity-60"></div>
                <div className="relative bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-400/20 rounded-lg p-4">
                  <p className="font-bold">
                    {t('ratesCalculator.disclaimer')}
                  </p>
                </div>
              </div>
              <Tabs value={costsSubTab} onValueChange={() => {}} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#5A0080] backdrop-blur-lg border border-blue-400/20 rounded-xl h-14 p-2 shadow-lg">
                  <TabsTrigger value="costs" className={`py-3 px-4 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/80 data-[state=active]:to-purple-500/80 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-blue-300/30 bg-transparent text-white/70 hover:text-white hover:bg-blue-500/20 transition-all duration-300 font-medium text-base cursor-pointer ${costsSubTab === "costs" ? "border border-white/40" : ""}`} onClick={handleCostsSubTabClick} aria-pressed={costsSubTab === "costs"}>
                    {t('general.costs')}
                  </TabsTrigger>
                  <TabsTrigger value="profits" className={`py-3 px-4 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/80 data-[state=active]:to-purple-500/80 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-blue-300/30 bg-transparent text-white/70 hover:text-white hover:bg-blue-500/20 transition-all duration-300 font-medium text-base cursor-pointer ${costsSubTab === "profits" ? "border border-white/40" : ""}`} onClick={handleProfitsSubTabClick} aria-pressed={costsSubTab === "profits"}>
                    {t('general.profits')}
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
                        {profitsSubTab === "3-star" && <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm font-extrabold">
                            <img alt="3 Star Hotel Profit Model" className="w-full h-auto rounded-lg shadow-lg border border-purple-400/20" src="/lovable-uploads/6112280a-824f-4699-84f9-1f6bbfdea1ec.png" />
                          </div>}
                      </TabsContent>
                      <TabsContent value="4-star">
                        {profitsSubTab === "4-star" && <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
                            <img alt="4 Star Hotel Profit Model" className="w-full h-auto rounded-lg shadow-lg border border-purple-400/20" src="/lovable-uploads/4b2c860c-d9d6-4be0-ac31-20f74f5292ea.png" />
                          </div>}
                      </TabsContent>
                      <TabsContent value="5-star">
                        {profitsSubTab === "5-star" && <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
                            <img alt="5 Star Hotel Profit Model" className="w-full h-auto rounded-lg shadow-lg border border-purple-400/20" src="/lovable-uploads/bf5eb578-eabb-4ba4-89aa-0aa672f78584.png" />
                          </div>}
                      </TabsContent>
                    </Tabs>
                  </TabsContent>}
              </Tabs>
            </TabsContent>}

          {/* BUILD YOUR OWN MODEL & RATES Section */}
          {mainTab === "model-rates-calculator" && <TabsContent value="model-rates-calculator">
              {/* Strategic Guidelines Accordion */}
              <Accordion type="single" collapsible className="w-full space-y-5">
                {Array.from({ length: 8 }, (_, index) => {
                  const sectionKey = `section${index + 1}`;
                  return (
                    <AccordionItem 
                      key={sectionKey} 
                      value={sectionKey}
                      className="border-2 border-fuchsia-400/40 rounded-xl bg-gradient-to-r from-purple-900/50 to-fuchsia-900/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-fuchsia-300/60"
                    >
                      <AccordionTrigger className="px-8 py-6 text-left hover:no-underline">
                        <span className="text-white font-bold text-lg uppercase tracking-wide leading-tight">
                          {index + 1}. {t(`ratesCalculator.strategicGuidelines.${sectionKey}.title`)}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-8 pb-8 pt-2">
                        <div className="text-white/95 text-base leading-relaxed font-medium">
                          {t(`ratesCalculator.strategicGuidelines.${sectionKey}.content`)}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>

              {/* Excel Calculator Download Section */}
              <div className="mt-12 p-8 rounded-xl bg-gradient-to-br from-fuchsia-800/20 via-purple-800/30 to-fuchsia-800/20 border-2 border-fuchsia-400/40 shadow-2xl backdrop-blur-sm">
                <div className="text-center space-y-6">
                  <p className="text-lg font-bold tracking-wide text-white uppercase leading-relaxed">
                    {t("ratesCalculator.excelCalculator.description")}
                  </p>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold px-10 py-5 shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl uppercase tracking-wider rounded-xl border border-fuchsia-300/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleExcelDownload}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      t("ratesCalculator.excelCalculator.buttonLabel")
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>}
        </Tabs>}
    </div>;
};