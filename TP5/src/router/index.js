import { createRouter, createWebHistory } from "vue-router";
import AddJob from "@/views/AddJob.vue";
import EditJob from "@/views/EditJob.vue";
import HomePage from "@/views/HomePage.vue";
import JobDetail from "@/views/JobDetail.vue";
const routes=[
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/editJob/:id',
        name: 'EditJob',
        component: EditJob,
        props:true,
    },
    {
        path: '/add',
        name : 'AddJob',
        component: AddJob
    },
    {
        path: '/detail/:id',
        name: 'JobDetail',
        component: JobDetail,
        props:true,
    }

]

const router=createRouter(
    {
        history: createWebHistory(),
        routes
    }
)
export default router