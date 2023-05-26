import { rootLayout } from "@/router/router";
import { Route } from "@tanstack/router";
import { Profile } from "./Profile";
import { ProfileLayout } from "./ProfileLayout";
import { ProfileUser } from "./ProfileUser";

const profileLayout = new Route({
    getParentRoute: () => rootLayout,
    path: "profile",
    component: ProfileLayout,
});
const profileIndexRoute = new Route({
    getParentRoute: () => profileLayout,
    path: "/",
    component: Profile,
});
const userRoute = new Route({
    getParentRoute: () => profileLayout,
    path: "$id",
    component: ProfileUser,
});
// profile route

export const profileRoute = profileLayout.addChildren([
    profileIndexRoute,
    userRoute,
])
