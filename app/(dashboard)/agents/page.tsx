import {
    AgentsView,
    AgentsViewError,
    AgentsViewLoading,
} from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
    const queryCilent = getQueryClient();
    void queryCilent.prefetchQuery(trpc.agents.getMany.queryOptions());

    return (
        <HydrationBoundary state={dehydrate(queryCilent)}>
            <Suspense fallback={<AgentsViewLoading />}>
                <ErrorBoundary fallback={<AgentsViewError />}>
                    <AgentsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
};

export default Page;
