
import { MessageSquare } from "lucide-react";

export function ReviewEmptyState() {
  return (
    <div className="text-center py-8 border-t border-fuchsia-900/20">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fuchsia-900/20 flex items-center justify-center">
        <MessageSquare className="w-8 h-8 text-fuchsia-400" />
      </div>
      <p className="text-foreground/60 italic">
        No reviews yet. Be the first to share your experience!
      </p>
    </div>
  );
}
