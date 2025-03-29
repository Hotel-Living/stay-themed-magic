
import React from "react";

interface PriceTableProps {
  roomType: string;
  mealTypes: string[];
  stayDurations: number[];
}

export default function PriceTable({ roomType, mealTypes, stayDurations }: PriceTableProps) {
  return (
    <div className="mb-8 border border-fuchsia-700/30 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-fuchsia-900/50">
            <th colSpan={stayDurations.length + 1} className="px-4 py-3 text-center font-bold uppercase">
              {roomType}
            </th>
          </tr>
          <tr className="bg-fuchsia-900/50">
            <th colSpan={stayDurations.length + 1} className="px-4 py-2 text-center text-sm">
              (Rates per person)
            </th>
          </tr>
          <tr className="bg-fuchsia-900/30">
            <th className="px-4 py-2"></th>
            <th colSpan={stayDurations.length} className="px-4 py-2 text-right font-bold uppercase">DAYS</th>
          </tr>
          <tr className="bg-fuchsia-900/30">
            <th className="px-4 py-2"></th>
            {stayDurations.map(days => (
              <th key={days} className="px-4 py-2 text-center font-bold">{days}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mealTypes.map((meal, index) => (
            <tr key={meal} className={index % 2 === 0 ? "bg-fuchsia-900/10" : "bg-fuchsia-900/20"}>
              <td className="px-4 py-3 font-bold uppercase">{meal}</td>
              {stayDurations.map(days => (
                <td key={days} className="px-4 py-3 text-center">XX</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
