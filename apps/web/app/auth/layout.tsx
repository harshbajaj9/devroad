import React from "react";

const page = ({ children }: { children: React.ReactNode }) => {
  return (
    // <nav className="bg-red-100">Navbar</nav>
    <div className="h-full flex items-center justify-center bg-sky-500">
      {children}
    </div>
  );
};

export default page;
