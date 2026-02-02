import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center px-4">
      <div className="w-full max-w-md bg-white shadow-sm rounded-2xl overflow-hidden mt-8 md:mt-16">
        {children}
      </div>
    </div>
  );
}
