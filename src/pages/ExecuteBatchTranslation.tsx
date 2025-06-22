
import React, { useEffect, useState } from "react";
import { useBatchTranslation } from "@/hooks/useBatchTranslation";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Play, AlertTriangle } from "lucide-react";

export default function ExecuteBatchTranslation() {
  const navigate = useNavigate();
  const { loading, progress, startBatchTranslation, getTranslationStats } = useBatchTranslation();
  const [stats, setStats] = useState({ totalHotels: 0, translatedHotels: 0, pendingTranslations: 0 });
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    loadStats();
    // Auto-execute batch translation
    executeBatchTranslation();
  }, []);

  const loadStats = async () => {
    const translationStats = await getTranslationStats();
    setStats(translationStats);
  };

  const executeBatchTranslation = async () => {
    setIsExecuting(true);
    try {
      console.log('Starting batch translation process...');
      await startBatchTranslation(50); // Process 50 hotels at a time
      await loadStats(); // Reload stats after completion
      console.log('Batch translation completed successfully');
    } catch (error) {
      console.error('Batch translation failed:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const completionPercentage = stats.totalHotels > 0 
    ? Math.round((stats.translatedHotels / stats.totalHotels) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Batch Translation Execution</h1>
          <p className="text-white/60">Translating all existing hotels to Spanish, Portuguese, and Romanian</p>
        </div>

        {/* Translation Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
        <Card className="bg-purple-900/20 border-purple-800/30 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Translation Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white">Overall Completion</span>
                <span className="text-white font-semibold">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="w-full" />
              
              <div className="text-center">
                {(loading || isExecuting) ? (
                  <div className="flex items-center justify-center gap-2 text-blue-400">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                    <span>Processing translations...</span>
                  </div>
                ) : progress ? (
                  <div className="text-green-400 flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Batch translation completed</span>
                  </div>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Results */}
        {progress && (
          <Card className="bg-purple-900/20 border-purple-800/30 mb-6">
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

        <div className="flex gap-4">
          <Button 
            onClick={executeBatchTranslation}
            disabled={loading || isExecuting}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {(loading || isExecuting) ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Translation Again
              </>
            )}
          </Button>

          <Button 
            onClick={() => navigate('/hotel/308dcb7b-dd1b-4aa7-8102-a292efe07690')}
            variant="outline"
            className="text-white border-purple-600"
          >
            Go Back to Hotel
          </Button>
        </div>
      </div>
    </div>
  );
}
