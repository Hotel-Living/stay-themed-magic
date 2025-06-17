
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Reply } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function FernandoCommunications() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      // This would fetch from a hotel_messages table when available
      // For now, we'll show a placeholder structure
      setMessages([]);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardContent className="p-6">
          <div className="text-center text-white/60">Loading messages...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Hotel Communications</h2>
          <p className="text-white/60">Receive and reply to messages from hotel partners</p>
        </div>
      </div>

      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Messages from Hotels
          </CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-white/40" />
              <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
              <p>Hotel partners can send messages from their dashboard.</p>
              <p className="text-sm mt-2">Messages will appear here when received.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="p-4 bg-purple-800/20 rounded-lg border border-purple-700/30">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-semibold">{message.subject}</h4>
                      <p className="text-white/60 text-sm">From: {message.hotel_name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={message.is_read ? "bg-gray-600" : "bg-blue-600"}>
                        {message.is_read ? "Read" : "New"}
                      </Badge>
                      <span className="text-white/40 text-xs">
                        {new Date(message.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-4">{message.content}</p>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Reply className="w-3 h-3 mr-1" />
                      Reply
                    </Button>
                    {!message.is_read && (
                      <Button size="sm" variant="outline" className="text-white border-purple-600">
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">Communication Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-800/20 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Incoming Messages</h4>
              <p className="text-white/60 text-sm mb-3">
                Hotels can send messages directly from their dashboard to communicate with admin.
              </p>
              <Button size="sm" variant="outline" className="text-white border-purple-600">
                View All Messages
              </Button>
            </div>
            
            <div className="p-4 bg-purple-800/20 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Broadcast Messages</h4>
              <p className="text-white/60 text-sm mb-3">
                Send announcements or updates to all hotel partners at once.
              </p>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Send Broadcast
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
