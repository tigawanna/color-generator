import { lazy } from 'react';

export const TanStackRouterDevtools =
    import.meta.env.VITE_ENV!== 'development'
        ? () => null // Render nothing in production
        : lazy(() =>
            // Lazy load in development
            import('@tanstack/router-devtools').then((res) => ({
                default: res.TanStackRouterDevtools,
                // For Embedded Mode
                // default: res.TanStackRouterDevtoolsPanel
            })),
        )
