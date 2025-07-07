
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ImageIcon, FileText, Clock, Plus, Camera, Tags, Flag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import FernandoBatchImages from "./FernandoBatchImages";
import FernandoBatchTextCompletion from "./FernandoBatchTextCompletion";
import FernandoBatchPendingFields from "./FernandoBatchPendingFields";
import FernandoBatchHotelCreation from "./FernandoBatchHotelCreation";
import FernandoBatchRoomImages from "./FernandoBatchRoomImages";
import FernandoBatchThemeAssignment from "./FernandoBatchThemeAssignment";
import FernandoBatchUSDemo from "./FernandoBatchUSDemo";

const batchTabs = [{
  id: "batch-images",
  name: "Batch Images",
  icon: ImageIcon,
  path: "/panel-fernando/batches/batch-images",
  description: "Batch image operations"
}, {
  id: "batch-text-completion",
  name: "Batch Text Completion",
  icon: FileText,
  path: "/panel-fernando/batches/batch-text",
  description: "Batch text completion"
}, {
  id: "batch-pending-fields",
  name: "Batch Pending Fields",
  icon: Clock,
  path: "/panel-fernando/batches/batch-pending",
  description: "Process pending fields"
}, {
  id: "batch-hotel-creation",
  name: "Batch Hotel Creation",
  icon: Plus,
  path: "/panel-fernando/batches/batch-create-hotels",
  description: "Create hotels in batches"
}, {
  id: "batch-room-images",
  name: "Batch Room Images",
  icon: Camera,
  path: "/panel-fernando/batches/batch-room-images",
  description: "Batch room image operations"
}, {
  id: "batch-theme-assignment",
  name: "Batch Theme Assignment",
  icon: Tags,
  path: "/panel-fernando/batches/batch-theme-assignment",
  description: "Assign themes to hotels in batches"
}, {
  id: "batch-us-demo",
  name: "US Demo Hotels",
  icon: Flag,
  path: "/panel-fernando/batches/batch-us-demo",
  description: "Generate 60 US demo hotels with specific combinations"
}];

export default function FernandoBatches() {
  const location = useLocation();
  
  // If we're at the base batches route, show the overview
  if (location.pathname === "/panel-fernando/batches") {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Batch Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-6">
              Select a batch operation from the options below to manage various automated processes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {batchTabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <Link 
                    key={tab.id} 
                    to={tab.path}
                    className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-purple-600" />
                      <h3 className="font-medium text-gray-900">{tab.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{tab.description}</p>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Otherwise, render the nested routes
  return (
    <Routes>
      <Route path="/batch-images" element={<FernandoBatchImages />} />
      <Route path="/batch-text" element={<FernandoBatchTextCompletion />} />
      <Route path="/batch-pending" element={<FernandoBatchPendingFields />} />
      <Route path="/batch-create-hotels" element={<FernandoBatchHotelCreation />} />
      <Route path="/batch-room-images" element={<FernandoBatchRoomImages />} />
      <Route path="/batch-theme-assignment" element={<FernandoBatchThemeAssignment />} />
      <Route path="/batch-us-demo" element={<FernandoBatchUSDemo />} />
      <Route path="*" element={<Navigate to="/panel-fernando/batches" replace />} />
    </Routes>
  );
}
