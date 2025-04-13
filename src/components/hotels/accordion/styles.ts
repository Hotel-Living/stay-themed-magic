
export const accordionMenuItemStyles = () => ({
  item: "border-b border-fuchsia-400/30",
  trigger: "text-xl font-bold text-white hover:text-yellow-300 py-4",
  content: "text-white space-y-2"
});

export const collapsibleMenuItemStyles = () => ({
  trigger: "flex items-center justify-between w-full text-lg font-semibold text-yellow-300 hover:text-yellow-200 group",
  icon: "h-4 w-4 text-yellow-300 transition-transform duration-200 group-data-[state=open]:rotate-180",
  content: "mt-2 pl-4"
});
