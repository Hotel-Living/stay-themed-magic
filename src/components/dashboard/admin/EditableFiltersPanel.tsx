
import React, { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, Download, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { useFilters } from "@/hooks/useFilters";
import { FilterTabs } from "./filters/FilterTabs";
import { FilterTabContent } from "./filters/FilterTabContent";
import { AddFilterDialog } from "./filters/AddFilterDialog";
import { DeleteConfirmDialog } from "./filters/DeleteConfirmDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function EditableFiltersPanel() {
  const [activeTab, setActiveTab] = useState("countries");
  const [editingItem, setEditingItem] = useState<{ id: string, value: string } | null>(null);
  const [newItemDialogOpen, setNewItemDialogOpen] = useState(false);
  const [newItemValue, setNewItemValue] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  
  // JotForm sync state
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [lastSyncLog, setLastSyncLog] = useState<any>(null);
  const [syncLogs, setSyncLogs] = useState<any[]>([]);
  const [showSyncLogs, setShowSyncLogs] = useState(false);
  
  const { toast } = useToast();
  
  const { 
    filters, 
    loading, 
    addFilter, 
    updateFilter, 
    deleteFilter 
  } = useFilters();

  // Load sync logs on component mount
  useEffect(() => {
    loadSyncLogs();
  }, []);

  const loadSyncLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('jotform_sync_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      setSyncLogs(data || []);
      if (data && data.length > 0) {
        setLastSyncLog(data[0]);
      }
    } catch (error) {
      console.error('Error loading sync logs:', error);
    }
  };

  const handleJotFormSync = async () => {
    if (syncInProgress) return;
    
    setSyncInProgress(true);
    
    try {
      toast({
        title: "JotForm Sync Started",
        description: "Synchronizing filter options from JotForm...",
      });

      const { data, error } = await supabase.functions.invoke('jotform-sync', {
        body: { manual: true }
      });

      if (error) throw error;

      toast({
        title: "Sync Completed Successfully",
        description: `Processed ${data.stats?.itemsProcessed || 0} items, added ${data.stats?.itemsAdded || 0} new options.`,
      });

      // Reload sync logs and refresh filters
      await loadSyncLogs();
      
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: "Sync Failed",
        description: error.message || "Failed to synchronize with JotForm",
        variant: "destructive"
      });
    } finally {
      setSyncInProgress(false);
    }
  };

  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const formatSyncTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;
    
    const success = await updateFilter(activeTab, editingItem.id, editingItem.value);
    if (success) {
      setEditingItem(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleStartEdit = (id: string, value: string) => {
    setEditingItem({ id, value });
  };

  const handleAddNew = async () => {
    if (!newItemValue.trim()) return;
    
    const success = await addFilter(activeTab, newItemValue);
    if (success) {
      setNewItemValue("");
      setNewItemDialogOpen(false);
    }
  };

  const confirmDelete = (id: string) => {
    setItemToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    
    const success = await deleteFilter(activeTab, itemToDelete);
    if (success) {
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Filter Management</h2>
        </div>

        {/* JotForm Sync Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              JotForm Synchronization
            </CardTitle>
            <CardDescription>
              Sync filter options directly from JotForm to keep data centralized and up-to-date
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  onClick={handleJotFormSync}
                  disabled={syncInProgress}
                  className="flex items-center gap-2"
                >
                  {syncInProgress ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {syncInProgress ? 'Syncing...' : 'Sync Now'}
                </Button>
                
                {lastSyncLog && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {getSyncStatusIcon(lastSyncLog.status)}
                    <span>Last sync: {formatSyncTime(lastSyncLog.created_at)}</span>
                    <Badge variant={lastSyncLog.status === 'completed' ? 'success' : lastSyncLog.status === 'failed' ? 'destructive' : 'secondary'}>
                      {lastSyncLog.status}
                    </Badge>
                  </div>
                )}
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowSyncLogs(!showSyncLogs)}
                className="flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                {showSyncLogs ? 'Hide' : 'Show'} Logs
              </Button>
            </div>

            {lastSyncLog && lastSyncLog.status === 'completed' && (
              <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{lastSyncLog.items_processed || 0}</div>
                  <div className="text-xs text-muted-foreground">Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{lastSyncLog.items_added || 0}</div>
                  <div className="text-xs text-muted-foreground">Added</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{lastSyncLog.items_updated || 0}</div>
                  <div className="text-xs text-muted-foreground">Updated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{lastSyncLog.items_deactivated || 0}</div>
                  <div className="text-xs text-muted-foreground">Deactivated</div>
                </div>
              </div>
            )}

            {showSyncLogs && (
              <div className="space-y-2">
                <Separator />
                <h4 className="font-medium">Recent Sync History</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {syncLogs.length > 0 ? (
                    syncLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                        <div className="flex items-center gap-3">
                          {getSyncStatusIcon(log.status)}
                          <div>
                            <div className="text-sm font-medium">
                              {formatSyncTime(log.created_at)}
                            </div>
                            {log.error_message && (
                              <div className="text-xs text-red-600">{log.error_message}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {log.status === 'completed' && (
                            <>
                              <span>+{log.items_added || 0}</span>
                              <span>~{log.items_updated || 0}</span>
                              <span>-{log.items_deactivated || 0}</span>
                            </>
                          )}
                          <Badge variant={log.status === 'completed' ? 'success' : log.status === 'failed' ? 'destructive' : 'secondary'}>
                            {log.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No sync history available</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Separator />

        <div className="rounded-xl p-6 bg-[#7a0486]">
          <Tabs defaultValue="countries" value={activeTab} onValueChange={setActiveTab}>
            <FilterTabs 
              activeTab={activeTab} 
              onTabChange={handleTabChange} 
              onAddNew={() => setNewItemDialogOpen(true)} 
            />
            
            <FilterTabContent
              category="countries"
              filters={filters}
              loading={loading}
              editingItem={editingItem}
              onStartEdit={handleStartEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              onConfirmDelete={confirmDelete}
              setEditingItem={setEditingItem}
            />
            
            <FilterTabContent
              category="months"
              filters={filters}
              loading={loading}
              editingItem={editingItem}
              onStartEdit={handleStartEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              onConfirmDelete={confirmDelete}
              setEditingItem={setEditingItem}
            />
            
            <FilterTabContent
              category="price"
              filters={filters}
              loading={loading}
              editingItem={editingItem}
              onStartEdit={handleStartEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              onConfirmDelete={confirmDelete}
              setEditingItem={setEditingItem}
            />
            
            <FilterTabContent
              category="stars"
              filters={filters}
              loading={loading}
              editingItem={editingItem}
              onStartEdit={handleStartEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              onConfirmDelete={confirmDelete}
              setEditingItem={setEditingItem}
            />
            
            <FilterTabContent
              category="property"
              filters={filters}
              loading={loading}
              editingItem={editingItem}
              onStartEdit={handleStartEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              onConfirmDelete={confirmDelete}
              setEditingItem={setEditingItem}
            />
          </Tabs>
        </div>

        {/* Add New Item Dialog */}
        <Dialog open={newItemDialogOpen} onOpenChange={setNewItemDialogOpen}>
          <AddFilterDialog
            newItemValue={newItemValue}
            activeTab={activeTab}
            setNewItemValue={setNewItemValue}
            handleAddNew={handleAddNew}
            closeDialog={() => setNewItemDialogOpen(false)}
          />
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <DeleteConfirmDialog
            handleDelete={handleDelete}
            closeDialog={() => setDeleteConfirmOpen(false)}
          />
        </Dialog>
      </div>
    </AdminDashboardLayout>
  );
}
