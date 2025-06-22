
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Languages, Play, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { useBatchTranslation } from '@/hooks/useBatchTranslation';

export default function BatchTranslationPanel() {
  const { loading, progress, startBatchTranslation, getTranslationStats } = useBatchTranslation();
  const [stats, setStats] = useState({ totalHotels: 0, translatedHotels: 0, pendingTranslations: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const translationStats = await getTranslationStats();
    setStats(translationStats);
  };

  const handleStartBatch = async () => {
    try {
      await startBatchTranslation(20);
      // Reload stats after batch completion
      await loadStats();
    } catch (error) {
      console.error('Batch translation failed:', error);
    }
  };

  const completionPercentage = stats.totalHotels > 0 
    ? Math.round((stats.translatedHotels / stats.totalHotels) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Batch Translation</h2>
          <p className="text-white/60">Translate all existing hotels to Spanish, Portuguese, and Romanian</p>
        </div>
      </div>

      {/* Translation Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">Total Hotels</h3>
              <p className="text-2xl font-bold text-blue-400">{stats.totalHotels}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">Translated</h3>
              <p className="text-2xl font-bold text-green-400">{stats.translatedHotels}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">Pending</h3>
              <p className="text-2xl font-bold text-yellow-400">{stats.pendingTranslations}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Languages className="w-5 h-5" />
            Translation Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white">Overall Completion</span>
              <span className="text-white font-semibold">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="w-full" />
            
            <div className="flex gap-2 mt-4">
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Spanish (ES)
              </Badge>
              <Badge className="bg-blue-600 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Portuguese (PT)
              </Badge>
              <Badge className="bg-red-600 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Romanian (RO)
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Batch Translation Controls */}
      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">Batch Translation Control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-200">
                <p className="font-medium">Batch Translation Process:</p>
                <ul className="mt-1 space-y-1 text-blue-300">
                  <li>• Processes up to 20 hotels per batch</li>
                  <li>• Translates to Spanish, Portuguese, and Romanian</li>
                  <li>• Skips hotels that already have translations</li>
                  <li>• Non-blocking process that won't affect live operations</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleStartBatch}
                disabled={loading || stats.pendingTranslations === 0}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Batch Translation
                  </>
                )}
              </Button>

              <Button 
                onClick={loadStats}
                variant="outline"
                className="text-white border-purple-600"
              >
                Refresh Stats
              </Button>
            </div>

            {stats.pendingTranslations === 0 && (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>All hotels have been translated!</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress Results */}
      {progress && (
        <Card className="bg-purple-900/20 border-purple-800/30">
          <CardHeader>
            <CardTitle className="text-white">Latest Batch Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white">Processed:</span>
                <span className="text-green-400">{progress.processed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Errors:</span>
                <span className="text-red-400">{progress.errors}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Total Found:</span>
                <span className="text-blue-400">{progress.total}</span>
              </div>
              {progress.hasMore && (
                <div className="flex items-center gap-2 text-yellow-400 mt-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>More hotels available for translation</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
