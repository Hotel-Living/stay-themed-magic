
import React from 'react';
import { Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export function SocialShareButtons({ 
  url, 
  title, 
  description,
  variant = 'outline',
  size = 'sm'
}: SocialShareButtonsProps) {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Use current URL if not provided
  const shareUrl = url || window.location.href;
  const shareTitle = title || document.title;
  const shareDescription = description || '';
  
  // Social sharing URLs
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  
  const handleSocialShare = (platform: string, shareUrl: string) => {
    window.open(shareUrl, `Share on ${platform}`, 'width=600,height=400');
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: t("share.linkCopied"),
        description: t("share.linkCopiedDesc"),
      });
    }).catch(() => {
      toast({
        title: t("share.error"),
        description: t("share.copyError"),
        variant: "destructive",
      });
    });
  };
  
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant={variant} 
        size={size}
        onClick={() => handleSocialShare('Facebook', facebookShareUrl)}
        aria-label={t("share.facebook")}
      >
        <Facebook className="w-4 h-4" />
      </Button>
      
      <Button 
        variant={variant} 
        size={size}
        onClick={() => handleSocialShare('Twitter', twitterShareUrl)}
        aria-label={t("share.twitter")}
      >
        <Twitter className="w-4 h-4" />
      </Button>
      
      <Button 
        variant={variant} 
        size={size}
        onClick={() => handleSocialShare('LinkedIn', linkedinShareUrl)}
        aria-label={t("share.linkedin")}
      >
        <Linkedin className="w-4 h-4" />
      </Button>
      
      <Button 
        variant={variant} 
        size={size}
        onClick={copyToClipboard}
        aria-label={t("share.copyLink")}
      >
        <Link2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
