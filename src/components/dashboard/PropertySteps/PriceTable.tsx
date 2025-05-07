
import React from "react";
interface PriceTableProps {
  roomType: string;
  mealTypes: string[];
  stayDurations: number[];
}
export default function PriceTable({
  roomType,
  mealTypes,
  stayDurations
}: PriceTableProps) {
  return <div className="mb-6 overflow-x-auto">
      <div className="bg-fuchsia-800/40 p-3 rounded-t-lg">
        <h3 className="text-base font-medium text-center">{roomType}</h3>
        <p className="text-xs text-center mt-1">(Rates per person)</p>
      </div>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-fuchsia-900/50">
            <th className="p-2 text-left text-xs"></th>
            {stayDurations.map(duration => <th key={duration} className="p-2 text-center text-xs bg-[#5d0083]">{duration} DAYS</th>)}
          </tr>
        </thead>
        <tbody>
          {mealTypes.map((mealType, index) => <tr key={mealType} className={index % 2 === 0 ? "bg-fuchsia-900/20" : "bg-fuchsia-900/30"}>
              <td className="p-2 text-xs font-medium bg-[#5d0083]">{mealType}</td>
              {stayDurations.map(duration => <td key={`${mealType}-${duration}`} className="p-2 text-center text-xs">
                  <input type="number" placeholder="0.00" required className="w-16 border border-fuchsia-800/30 rounded-lg p-1 text-center bg-[#5d0083]" />
                </td>)}
            </tr>)}
        </tbody>
      </table>
    </div>;
}
