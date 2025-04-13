
export const accordionMenuItemStyles = () => ({
  item: "border-b border-fuchsia-400/30",
  trigger: "text-2xl font-bold text-white hover:text-[#FEF7CD] py-2", // Increased font size by 30%
  content: "text-white space-y-4 pt-4" // Added padding-top for more space between title and content
});

export const collapsibleMenuItemStyles = () => ({
  trigger: "flex items-center justify-between w-full text-xl font-semibold text-white hover:text-white/80 group", // Changed text color to white
  icon: "h-4 w-4 text-white transition-transform duration-200 group-data-[state=open]:rotate-180", // Changed icon color to white
  content: "mt-8 mb-8" // Added margin bottom to create consistent spacing
});
