<template>
    <div>
        <AppAlert />
        <Login />
    </div>
</template>

<script>
import Login from "@/views/Auth/components/Login"

export default {
    name: "Auth",
    components: {
        Login,
        AppAlert: () => import("@/components/AppAlert"),
    },
}
</script>

<style scoped>

</style>
