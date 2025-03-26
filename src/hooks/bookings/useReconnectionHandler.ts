
import { useState, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface ReconnectionConfig {
  onReconnect: () => void;
}

export function useReconnectionHandler({ onReconnect }: ReconnectionConfig) {
  const [isReconnecting, setIsReconnecting] = useState(false);
  const { toast } = useToast();
  
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttemptsRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 2000;

  const handleSubscriptionError = useCallback(() => {
    setIsReconnecting(true);
    
    // Clear any existing timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    // Check if we've exceeded our reconnection attempts
    if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
      setIsReconnecting(false);
      const error = new Error("Failed to establish a real-time connection after multiple attempts.");
      toast({
        title: "Connection Error",
        description: "Failed to maintain real-time connection. Please refresh the page.",
        variant: "destructive",
      });
      return;
    }
    
    // Set a timeout to attempt reconnection
    reconnectTimeoutRef.current = setTimeout(() => {
      reconnectAttemptsRef.current += 1;
      onReconnect();
    }, RECONNECT_DELAY);
  }, [onReconnect, toast]);

  const reconnect = useCallback(() => {
    if (isReconnecting) return; // Already reconnecting
    
    setIsReconnecting(true);
    reconnectAttemptsRef.current = 0;
    onReconnect();
  }, [isReconnecting, onReconnect]);

  const resetReconnection = useCallback(() => {
    setIsReconnecting(false);
    reconnectAttemptsRef.current = 0;
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = undefined;
    }
  }, []);

  const cleanupReconnection = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = undefined;
    }
  }, []);

  return {
    isReconnecting,
    handleSubscriptionError,
    reconnect,
    resetReconnection,
    cleanupReconnection
  };
}
