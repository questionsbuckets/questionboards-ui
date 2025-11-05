import React from "react";

function AuthWrappert({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-screen bg-foreground items-center justify-center px-4"
      style={{
        backgroundImage: "url('/auth-bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
}

export default AuthWrappert;
