
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OccupancyChartProps {
  data: Array<{ name: string; rate: number }>;
}

export function OccupancyChart({ data }: OccupancyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Occupancy Rate</CardTitle>
        <CardDescription>Monthly occupancy percentage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, 'Occupancy Rate']} />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#f97316" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
