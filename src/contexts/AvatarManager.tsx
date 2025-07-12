import React, { createContext, useContext, useState, useCallback } from 'react';

interface Avatar {
  id: string;
  gif: string;
  position: 'bottom-left' | 'bottom-right' | 'content';
  isActive: boolean;
  chatHistory: { from: 'user' | 'avatar'; text: string }[];
}

interface AvatarManagerContextType {
  activeAvatar: Avatar | null;
  setActiveAvatar: (avatar: Avatar | null) => void;
  moveAvatarToActivePosition: (avatarId: string, gif: string) => void;
  dismissActiveAvatar: () => void;
  getChatHistory: (avatarId: string) => { from: 'user' | 'avatar'; text: string }[];
  updateChatHistory: (avatarId: string, messages: { from: 'user' | 'avatar'; text: string }[]) => void;
}

const AvatarManagerContext = createContext<AvatarManagerContextType | undefined>(undefined);

export function AvatarManagerProvider({ children }: { children: React.ReactNode }) {
  const [activeAvatar, setActiveAvatar] = useState<Avatar | null>(null);
  const [chatHistories, setChatHistories] = useState<Record<string, { from: 'user' | 'avatar'; text: string }[]>>({});

  const moveAvatarToActivePosition = useCallback((avatarId: string, gif: string) => {
    setActiveAvatar({
      id: avatarId,
      gif,
      position: 'bottom-right',
      isActive: true,
      chatHistory: chatHistories[avatarId] || [{ from: 'avatar', text: getInitialMessage() }]
    });
    localStorage.setItem('activeAvatar', avatarId);
  }, [chatHistories]);

  const dismissActiveAvatar = useCallback(() => {
    setActiveAvatar(null);
    localStorage.removeItem('activeAvatar');
  }, []);

  const getChatHistory = useCallback((avatarId: string) => {
    return chatHistories[avatarId] || [{ from: 'avatar', text: getInitialMessage() }];
  }, [chatHistories]);

  const updateChatHistory = useCallback((avatarId: string, messages: { from: 'user' | 'avatar'; text: string }[]) => {
    setChatHistories(prev => ({
      ...prev,
      [avatarId]: messages
    }));
  }, []);

  const getInitialMessage = () => {
    const lang = navigator.language;
    if (lang.startsWith("en")) return "What would you like to talk about?";
    if (lang.startsWith("pt")) return "Sobre o que gostaria de conversar?"; 
    if (lang.startsWith("ro")) return "Despre ce ai vrea să vorbim?";
    return "¿Sobre qué quieres que hablemos?";
  };

  return (
    <AvatarManagerContext.Provider value={{
      activeAvatar,
      setActiveAvatar,
      moveAvatarToActivePosition,
      dismissActiveAvatar,
      getChatHistory,
      updateChatHistory
    }}>
      {children}
    </AvatarManagerContext.Provider>
  );
}

export function useAvatarManager() {
  const context = useContext(AvatarManagerContext);
  if (context === undefined) {
    throw new Error('useAvatarManager must be used within an AvatarManagerProvider');
  }
  return context;
}