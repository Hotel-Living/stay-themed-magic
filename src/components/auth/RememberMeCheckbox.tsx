
interface RememberMeCheckboxProps {
  isHotelLogin?: boolean;
}

export function RememberMeCheckbox({ isHotelLogin = false }: RememberMeCheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        id={isHotelLogin ? "hotel-remember" : "remember"}
        type="checkbox"
        className="w-3 h-3 bg-secondary/50 border border-border rounded focus:ring-fuchsia-500 focus:border-fuchsia-500"
      />
      <label 
        htmlFor={isHotelLogin ? "hotel-remember" : "remember"} 
        className="ml-2 text-xs text-muted-foreground"
      >
        Remember me
      </label>
    </div>
  );
}
