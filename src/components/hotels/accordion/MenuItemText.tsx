
interface MenuItemTextProps {
  items: string[];
}

export function MenuItemText({ items }: MenuItemTextProps) {
  return (
    <>
      {items.map((item, index) => (
        <p key={index} className="text-xl text-center mb-4">{item}</p> // Increased font size by 20%, centered text, and added more bottom margin
      ))}
    </>
  );
}
