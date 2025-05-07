
import { ReactNode } from "react";
import { Link } from "react-router-dom";
interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerLinks: {
    text: string;
    linkText: string;
    linkUrl: string;
  }[];
}
export function AuthCard({
  title,
  subtitle,
  children,
  footerLinks
}: AuthCardProps) {
  return <div style={{
    background: 'linear-gradient(-45deg, #5d0083, #5d0083)',
    backgroundSize: '200% 200%',
    animation: 'text-shine 2s linear infinite'
  }} className="glass-card rounded-2xl overflow-hidden">
      <div className="p-6 backdrop-blur-sm bg-[#5d0083]">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-1">{title}</h1>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>
        
        {children}
        
        <div className="mt-3 text-center">
          {footerLinks.map((link, index) => <p key={index} className="text-xs text-muted-foreground mt-2">
              {link.text}{" "}
              <Link to={link.linkUrl} className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                {link.linkText}
              </Link>
            </p>)}
        </div>
      </div>
    </div>;
}
