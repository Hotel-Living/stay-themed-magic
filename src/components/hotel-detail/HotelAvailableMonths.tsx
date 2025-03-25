
interface HotelAvailableMonthsProps {
  months: string[];
}

export function HotelAvailableMonths({ months }: HotelAvailableMonthsProps) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Available Months</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {months.map(month => (
          <div 
            key={month} 
            className="text-center p-3 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20"
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
}
