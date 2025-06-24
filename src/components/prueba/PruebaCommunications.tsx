
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Send, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AdminMessage {
  id: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  user_id: string;
  hotel_id?: string;
  profiles?: {
    first_name?: string;
    last_name?: string;
  };
}

export default function PruebaCommunications() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState({
    subject: "",
    message: "",
    user_id: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_messages')
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
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

  const sendMessage = async () => {
    if (!newMessage.subject || !newMessage.message || !newMessage.user_id) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('admin_messages')
        .insert([newMessage]);

      if (error) throw error;

      setNewMessage({ subject: "", message: "", user_id: "" });
      fetchMessages();
      toast({
        description: "Message sent successfully"
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('admin_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;

      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      toast({
        description: "Message deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive"
      });
    }
  };

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (message.profiles?.first_name && message.profiles.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (message.profiles?.last_name && message.profiles.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="bg-[#7a0486] border-purple-600">
          <CardContent className="p-6">
            <div className="text-center text-white">Loading communications...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Communications Management</h2>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Message
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-[#7a0486] border-purple-600">
        <CardContent className="p-4">
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
          />
        </CardContent>
      </Card>

      {/* New Message Form */}
      <Card className="bg-[#7a0486] border-purple-600">
        <CardHeader>
          <CardTitle className="text-white">Send New Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="User ID"
            value={newMessage.user_id}
            onChange={(e) => setNewMessage(prev => ({ ...prev, user_id: e.target.value }))}
            className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
          />
          <Input
            placeholder="Subject"
            value={newMessage.subject}
            onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
            className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
          />
          <Textarea
            placeholder="Message content"
            value={newMessage.message}
            onChange={(e) => setNewMessage(prev => ({ ...prev, message: e.target.value }))}
            className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
            rows={4}
          />
          <Button onClick={sendMessage} className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Send Message
          </Button>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card className="bg-[#7a0486] border-purple-600">
        <CardHeader>
          <CardTitle className="text-white">Messages ({filteredMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div key={message.id} className="border border-purple-600/30 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-white font-medium">{message.subject}</h4>
                    <p className="text-white/60 text-sm">
                      To: {message.profiles?.first_name} {message.profiles?.last_name}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      message.status === 'sent' ? 'bg-green-600' : 'bg-yellow-600'
                    } text-white`}>
                      {message.status}
                    </span>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="h-8 w-8 p-0 bg-red-600 hover:bg-red-700"
                      onClick={() => deleteMessage(message.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-white/80 text-sm">{message.message}</p>
                <p className="text-white/40 text-xs mt-2">
                  {new Date(message.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
