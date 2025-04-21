
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface RejectDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export default function RejectDialog({ open, onClose, onConfirm }: RejectDialogProps) {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    onConfirm(reason);
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Hotel Registration</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Enter rejection reason..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            variant="destructive" 
            onClick={handleSubmit}
            disabled={!reason.trim()}
          >
            Confirm Rejection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
