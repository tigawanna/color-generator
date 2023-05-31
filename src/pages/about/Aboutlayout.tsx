import { Outlet } from "@tanstack/router";

interface AboutlayoutProps {}

export function Aboutlayout({}: AboutlayoutProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Outlet />
    </div>
  );
}
