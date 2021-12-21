export default [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Auth/components/Login"),
        meta: {
            onlyGuest: true,
        },
    },
    {
        path: "/register/:token",
        name: "register",
        component: () => import("@/views/Auth/components/Register"),
        meta: {
            isProtected: true,
            permissions: [
                "",
            ],
        },
    },
    {
        path: "/forgot",
        name: "forgot",
        component: () => import("@/views/Auth/components/Forgot"),
        meta: {
            onlyGuest: true,
        },
    },
    {
        path: "/reset/:token",
        name: "reset",
        component: () => import("@/views/Auth/components/Reset"),
        meta: {
            onlyGuest: true,
        },
    },
]
