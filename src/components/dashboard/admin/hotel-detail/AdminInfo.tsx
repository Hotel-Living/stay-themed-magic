
import React from "react";
import { Clock } from "lucide-react";

interface AdminInfoProps {
  hotel: any;
}

export function AdminInfo({ hotel }: AdminInfoProps) {
  return (
    <div className="rounded-xl p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
        <Clock className="w-5 h-5 text-purple-400" />
        Administrative Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">Hotel ID</p>
          <p className="font-medium font-mono text-xs">{hotel.id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Owner ID</p>
          <p className="font-medium font-mono text-xs">{hotel.owner_id || "Not assigned"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Created At</p>
          <p className="font-medium">{new Date(hotel.created_at).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Last Updated</p>
          <p className="font-medium">{new Date(hotel.updated_at).toLocaleString()}</p>
        </div>
        {hotel.rejection_reason && (
          <div className="md:col-span-2">
            <p className="text-sm text-gray-400">Rejection Reason</p>
            <p className="font-medium text-red-400">{hotel.rejection_reason}</p>
          </div>
        )}
      </div>
    </div>
  );
}
