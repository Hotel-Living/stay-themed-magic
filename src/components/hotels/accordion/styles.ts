
export const accordionMenuItemStyles = () => ({
  item: "border-b border-fuchsia-400/30",
  trigger: "text-xl font-bold text-white hover:text-[#FEF7CD] py-2", // Reduced padding and changed hover color to light yellow
  content: "text-white space-y-2"
});

export const collapsibleMenuItemStyles = () => ({
  trigger: "flex items-center justify-between w-full text-lg font-semibold text-[#FEF7CD] hover:text-[#FEF7CD]/80 group", // Changed yellow to light yellow
  icon: "h-4 w-4 text-[#FEF7CD] transition-transform duration-200 group-data-[state=open]:rotate-180", // Changed yellow to light yellow
  content: "mt-1 pl-4" // Reduced margin-top
});

