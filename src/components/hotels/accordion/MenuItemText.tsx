
interface MenuItemTextProps {
  items: string[];
}

export function MenuItemText({ items }: MenuItemTextProps) {
  return (
    <>
      {items.map((item, index) => (
        <p 
          key={index} 
          className={`text-base font-extrabold text-center ${index === items.length - 1 ? 'mb-8' : 'mb-4'}`} // Added more margin to the last item
        >
          {item}
        </p>
      ))}
    </>
  );
}
