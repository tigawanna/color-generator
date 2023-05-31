import { Outlet, Link } from "@tanstack/router";

interface ColorsLayoutProps {}

export function ColorsLayout({}: ColorsLayoutProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Outlet />
    </div>
  );
}
