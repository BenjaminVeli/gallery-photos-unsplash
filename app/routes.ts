import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/photos/:name', 'routes/PhotoName.tsx')
] satisfies RouteConfig;
