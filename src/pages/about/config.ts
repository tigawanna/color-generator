import { rootLayout } from "@/router/router";
import { Route } from "@tanstack/router";
import { About } from "./AboutIndex";
import { Aboutlayout } from "./Aboutlayout";

const aboutLayout = new Route({
    getParentRoute: () => rootLayout,
    path: "/about",
    component: Aboutlayout,
});


const aboutIndexRoute = new Route({
    getParentRoute: () => aboutLayout,
    path: "/",
    component: About,
});

// about layout

export const aboutRoute = aboutLayout.addChildren([
    aboutIndexRoute,
])
