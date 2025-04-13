
export const accordionMenuItemStyles = () => ({
  item: "border-b border-fuchsia-400/30",
  trigger: "text-2xl font-bold text-white hover:text-[#FEF7CD] py-2", // Increased font size by 30%
  content: "text-white space-y-4 pt-4" // Added padding-top for more space between title and content
});

export const collapsibleMenuItemStyles = () => ({
  trigger: "flex items-center justify-between w-full text-xl font-semibold text-[#FEF7CD] hover:text-[#FEF7CD]/80 group", // Increased font size by 20%
  icon: "h-4 w-4 text-[#FEF7CD] transition-transform duration-200 group-data-[state=open]:rotate-180", // Kept light yellow
  content: "mt-2 pl-4" // Increased margin top slightly
});

