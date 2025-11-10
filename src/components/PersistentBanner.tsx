import React from "react";

interface PersistentBannerProps {
  message: string;
  position?: "top" | "bottom";
  className?: string;
}

export const PersistentBanner: React.FC<PersistentBannerProps> = ({ message, position = "top", className }) => {
  if (!message) return null;
  return (
    <div
      className={
        `sticky z-20 ${position === 'top' ? 'top-2' : 'bottom-2'} ` +
        "mx-auto max-w-3xl w-full px-3"
      }
      aria-live="polite"
      role="status"
    >
      <div className={`rounded-xl bg-accent/30 text-accent-foreground backdrop-blur border border-accent/40 shadow-md px-4 py-3 text-center animate-fade-in ${className ?? ''}`}>
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default PersistentBanner;
