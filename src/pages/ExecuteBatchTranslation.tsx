
import React, { useEffect, useState } from "react";
import { useBatchTranslation } from "@/hooks/useBatchTranslation";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Play, AlertTriangle, RefreshCw } from "lucide-react";

export default function ExecuteBatchTranslation() {
  const navigate = useNavigate();
  const { t } = useTranslation('batchTranslation');
  const { loading, progress, startBatchTranslation, getTranslationStats } = useBatchTranslation();
  const [stats, setStats] = useState({ totalHotels: 0, translatedHotels: 0, pendingTranslations: 0 });
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
    // Removed auto-execution - users now have to manually trigger it
  }, []);

  const loadStats = async () => {
    try {
      const translationStats = await getTranslationStats();
      setStats(translationStats);
      setLastError(null);
    } catch (error) {
      console.error('Failed to load stats:', error);
      setLastError('Failed to load translation statistics');
    }
  };

  const executeBatchTranslation = async () => {
    setIsExecuting(true);
    setLastError(null);
    try {
      console.log('Starting batch translation process...');
      // Reduced batch size to prevent rate limiting
      await startBatchTranslation(10); // Process 10 hotels at a time instead of 50
      await loadStats(); // Reload stats after completion
      console.log('Batch translation completed successfully');
    } catch (error) {
      console.error('Batch translation failed:', error);
      setLastError(error.message || 'Batch translation failed. Please check if OpenAI API key is configured and try again.');
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
          <h1 className="text-3xl font-bold text-white mb-2">{t('title')}</h1>
          <p className="text-white/60">{t('description')}</p>
        </div>

        {/* Error Display */}
        {lastError && (
          <Card className="bg-red-900/20 border-red-800/30 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Error:</span>
              </div>
              <p className="text-red-300 mt-2">{lastError}</p>
            </CardContent>
          </Card>
        )}

        {/* Translation Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-purple-900/20 border-purple-800/30">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">{t('stats.totalHotels')}</h3>
                <p className="text-2xl font-bold text-blue-400">{stats.totalHotels}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-900/20 border-purple-800/30">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">{t('stats.translated')}</h3>
                <p className="text-2xl font-bold text-green-400">{stats.translatedHotels}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-900/20 border-purple-800/30">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">{t('stats.pending')}</h3>
                <p className="text-2xl font-bold text-yellow-400">{stats.pendingTranslations}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card className="bg-purple-900/20 border-purple-800/30 mb-6">
          <CardHeader>
            <CardTitle className="text-white">{t('progress.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white">{t('progress.overallCompletion')}</span>
                <span className="text-white font-semibold">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="w-full" />
              
              <div className="text-center">
                {(loading || isExecuting) ? (
                  <div className="flex items-center justify-center gap-2 text-blue-400">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                    <span>{t('progress.processing')}</span>
                  </div>
                ) : progress ? (
                  <div className="text-green-400 flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{t('progress.completed')}</span>
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
              <CardTitle className="text-white">{t('results.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white">{t('results.processed')}</span>
                  <span className="text-green-400">{progress.processed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">{t('results.errors')}</span>
                  <span className="text-red-400">{progress.errors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">{t('results.totalFound')}</span>
                  <span className="text-blue-400">{progress.total}</span>
                </div>
                {progress.hasMore && (
                  <div className="flex items-center gap-2 text-yellow-400 mt-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{t('results.moreAvailable')}</span>
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
                {t('buttons.processing')}
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {t('buttons.runAgain')}
              </>
            )}
          </Button>

          <Button 
            onClick={loadStats}
            disabled={loading || isExecuting}
            variant="outline"
            className="text-white border-purple-600 hover:bg-purple-600/20"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Stats
          </Button>

          <Button 
            onClick={() => navigate('/hotel/308dcb7b-dd1b-4aa7-8102-a292efe07690')}
            variant="outline"
            className="text-white border-purple-600"
          >
            {t('buttons.goBack')}
          </Button>
        </div>
      </div>
    </div>
  );
}
