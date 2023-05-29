import { rootLayout } from "@/router/router";
import { Route } from "@tanstack/router";
import { Colors } from "./ColorList";
import { ColorsLayout } from "./ColorsLayout";

//Colors route layout
const ColorsRouteLayout = new Route({
    getParentRoute: () => rootLayout,
    path: "/colors",
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

