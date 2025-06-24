
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Eye, Reply, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Message {
  id: string;
  subject?: string;
  message: string;
  status: string;
  created_at: string;
  hotel_name?: string;
  user_name?: string;
}

export default function PruebaCommunications() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedHotel, setSelectedHotel] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_messages')
        .select(`
          id,
          subject,
          message,
          status,
          created_at,
          hotel:hotels(name),
          user:profiles(first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const messagesWithNames = data?.map(message => ({
        ...message,
        hotel_name: message.hotel?.name || 'General',
        user_name: message.user 
          ? `${message.user.first_name || ''} ${message.user.last_name || ''}`.trim()
          : 'Admin'
      })) || [];

      setMessages(messagesWithNames);
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
    if (!newMessage.trim()) return;

    try {
      const { error } = await supabase
        .from('admin_messages')
        .insert([{
          message: newMessage,
          subject: "Admin Communication",
          status: "sent",
          hotel_id: selectedHotel || null
        }]);

      if (error) throw error;

      setNewMessage("");
      setSelectedHotel("");
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

  const updateMessageStatus = async (messageId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('admin_messages')
        .update({ status: newStatus })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(prev => prev.map(message => 
        message.id === messageId ? { ...message, status: newStatus } : message
      ));

      toast({
        description: `Message marked as ${newStatus}`
      });
    } catch (error) {
      console.error('Error updating message status:', error);
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive"
      });
    }
  };

  const filteredMessages = messages.filter(message =>
    message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.hotel_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-yellow-500",
      sent: "bg-green-500",
      read: "bg-blue-500",
      replied: "bg-purple-500"
    };
    return statusColors[status as keyof typeof statusColors] || "bg-gray-500";
  };

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
        <h2 className="text-2xl font-bold text-white">Hotel Communications</h2>
      </div>

      {/* Send New Message */}
      <Card className="bg-[#7a0486] border-purple-600">
        <CardHeader>
          <CardTitle className="text-white">Send New Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={selectedHotel} onValueChange={setSelectedHotel}>
              <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                <SelectValue placeholder="Select hotel (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Hotels</SelectItem>
                <SelectItem value="hotel1">Sample Hotel 1</SelectItem>
                <SelectItem value="hotel2">Sample Hotel 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
            rows={4}
          />
          <Button onClick={sendMessage} className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Send Message
          </Button>
        </CardContent>
      </Card>

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

      {/* Messages Table */}
      <Card className="bg-[#7a0486] border-purple-600">
        <CardHeader>
          <CardTitle className="text-white">Messages ({filteredMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-600">
                  <th className="text-left p-3 text-white">Subject</th>
                  <th className="text-left p-3 text-white">Hotel</th>
                  <th className="text-left p-3 text-white">Message</th>
                  <th className="text-left p-3 text-white">Status</th>
                  <th className="text-left p-3 text-white">Date</th>
                  <th className="text-left p-3 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((message) => (
                  <tr key={message.id} className="border-b border-purple-600/30 hover:bg-purple-800/20">
                    <td className="p-3 text-white font-medium">
                      {message.subject || 'No Subject'}
                    </td>
                    <td className="p-3 text-white/80">{message.hotel_name}</td>
                    <td className="p-3 text-white/80 max-w-xs truncate">
                      {message.message}
                    </td>
                    <td className="p-3">
                      <Badge className={`${getStatusBadge(message.status)} text-white`}>
                        {message.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-white/80">
                      {new Date(message.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Reply className="w-4 h-4" />
                        </Button>
                        <Select onValueChange={(value) => updateMessageStatus(message.id, value)}>
                          <SelectTrigger className="h-8 w-20 bg-purple-800/50 border-purple-600 text-white text-xs">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="read">Read</SelectItem>
                            <SelectItem value="replied">Replied</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
