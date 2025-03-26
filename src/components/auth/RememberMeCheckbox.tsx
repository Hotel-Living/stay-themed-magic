
import React from "react";

interface RememberMeCheckboxProps {
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
}

export const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({
  rememberMe,
  setRememberMe
}) => {
  return (
    <div className="flex items-center">
      <input
        id="remember"
        type="checkbox"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
        className="w-4 h-4 bg-secondary/50 border border-border rounded focus:ring-fuchsia-500 focus:border-fuchsia-500"
        aria-label="Remember me"
      />
      <label htmlFor="remember" className="ml-2 text-sm text-muted-foreground">
        Remember me
      </label>
    </div>
  );
};
