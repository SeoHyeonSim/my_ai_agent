import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { ClientGreeting } from "./client-greeting";

export default async function Home() {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.hello.queryOptions({
            /** input */
        })
    );
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div>...</div>
            {/** ... */}
            <ClientGreeting />
        </HydrationBoundary>
    );
}
