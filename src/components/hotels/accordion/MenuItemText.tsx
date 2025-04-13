
interface MenuItemTextProps {
  items: string[];
}

export function MenuItemText({ items }: MenuItemTextProps) {
  return (
    <>
      {items.map((item, index) => (
        <p 
          key={index} 
          className="text-base font-extrabold text-center mb-4" // Reduced size by 20%, increased boldness by 30%
        >
          {item}
        </p>
      ))}
    </>
  );
}
