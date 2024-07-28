declare module 'ziggy-js' {
    interface ZiggyRoute {
        uri: string;
        methods: string[];
        domain?: null | string;
    }

    interface Ziggy {
        namedRoutes: Record<string, ZiggyRoute>;
        baseUrl: string;
        baseProtocol: string;
        baseDomain: string;
        basePort?: null | number;
        defaultParameters: [];
    }

    export function route(
        name: string,
        params?: Record<string, any>,
        absolute?: boolean,
        customZiggy?: Ziggy
    ): string;
    export function current(name?: string): boolean;
}

// import { AxiosInstance } from 'axios';
// import { route as ziggyRoute } from 'ziggy-js';

// declare global {
//     interface Window {
//         axios: AxiosInstance;
//     }

//     var route: typeof ziggyRoute;
// }
