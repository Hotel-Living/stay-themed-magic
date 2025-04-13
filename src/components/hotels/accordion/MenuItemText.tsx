
interface MenuItemTextProps {
  items: string[];
}

export function MenuItemText({ items }: MenuItemTextProps) {
  return (
    <>
      {items.map((item, index) => (
        <p key={index} className="text-lg">{item}</p>
      ))}
    </>
  );
}
