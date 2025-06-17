
import React from "react";
import AdminDashboardLayout from "../AdminDashboardLayout";
import { ExportActivitiesButton } from "./ExportActivitiesButton";

export default function ActivitiesPanel() {
  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Activities Management</h1>
            <p className="text-white/70">Manage hotel activities and export data</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <ExportActivitiesButton />
          </div>
        </div>

        <div className="rounded-xl p-6 bg-[#7a0486]">
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold mb-4 text-white">Activities Export</h3>
            <p className="text-white/70 mb-4">
              Use the Export Activities button above to download the complete activities database structure including:
            </p>
            <ul className="text-white/70 text-left max-w-md mx-auto space-y-2">
              <li>• All Activity IDs</li>
              <li>• English names</li>
              <li>• Parent-child relationships</li>
              <li>• Hierarchical structure (levels 1-3)</li>
              <li>• Sort order and categories</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
