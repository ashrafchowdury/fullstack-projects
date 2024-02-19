import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="lg:w-[900px] mx-auto border-x min-h-screen max-h-max">
      {children}
    </main>
  );
};

export default AppLayout;
