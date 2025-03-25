
import React from 'react';
import { Star, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardReview } from '../types';

interface ReviewsTableViewProps {
  reviews: DashboardReview[];
  openResponseDialog: (review: DashboardReview) => void;
}

export function ReviewsTableView({ reviews, openResponseDialog }: ReviewsTableViewProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Guest</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  {!review.notified && (
                    <AlertTriangle className="w-3 h-3 mr-1 text-amber-400" />
                  )}
                  {review.name}
                </div>
              </TableCell>
              <TableCell>{review.property}</TableCell>
              <TableCell>
                <div className="flex">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </TableCell>
              <TableCell>{review.date}</TableCell>
              <TableCell>
                {review.isResponded ? (
                  <span className="text-xs text-green-400">Responded</span>
                ) : (
                  <span className="text-xs text-amber-400">Pending</span>
                )}
              </TableCell>
              <TableCell>
                {review.isResponded ? (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-fuchsia-300 hover:text-foreground"
                    onClick={() => openResponseDialog(review)}
                  >
                    View Response
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => openResponseDialog(review)}
                  >
                    Respond
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6">
              <p className="text-foreground/70">No reviews match your filter</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
