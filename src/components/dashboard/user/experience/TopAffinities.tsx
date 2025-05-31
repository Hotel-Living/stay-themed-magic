
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { ThemeTag } from "@/components/ThemeTag";
import { useTopAffinities } from "./hooks/useTopAffinities";

export const TopAffinities: React.FC = () => {
  const { topAffinities, loading } = useTopAffinities();

  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Top Affinities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading your affinities...</div>
        </CardContent>
      </Card>
    );
  }

  if (topAffinities.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Top Affinities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-foreground/60">
            Add affinities to your profile to see your preferences here.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Top Affinities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {topAffinities.map((affinity) => (
            <ThemeTag 
              key={affinity.theme_id}
              theme={affinity.themes}
              size="md"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
