import { rootLayout } from "@/router/router";
import { Route } from "@tanstack/router";
import { IndexRoute } from "./Index";

export const indexRoute = new Route({
    getParentRoute: () => rootLayout,
    path: "/",
    component: IndexRoute,
});

