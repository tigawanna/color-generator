import { Outlet, Link } from "@tanstack/router";

interface ColorsLayoutProps {}

export function ColorsLayout({}: ColorsLayoutProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Outlet />
    </div>
  );
}