import { rootLayout } from "@/router/router";
import { Route } from "@tanstack/router";
import { Colors } from "./Colors";
import { ColorsLayout } from "./ColorsLayout";

//Colors route layout
const ColorsRouteLayout = new Route({
    getParentRoute: () => rootLayout,
    path: "/Colors",
    component: ColorsLayout,
});

//Colors default route
const ColorsIndexRoute = new Route({
    getParentRoute: () => ColorsRouteLayout,
    path: "/",
    component: Colors,
});


export const colorsRoute = ColorsRouteLayout.addChildren([
    ColorsIndexRoute,
])

