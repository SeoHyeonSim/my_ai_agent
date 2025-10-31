import { auth } from "@/lib/auth";
import {
    AgentsView,
    AgentsViewError,
    AgentsViewLoading,
} from "@/modules/agents/ui/views/agents-view";
import AgnetsListHeader from "@/modules/agents/ui/components/agents-list-header";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    const queryCilent = getQueryClient();
    void queryCilent.prefetchQuery(trpc.agents.getMany.queryOptions());

    return (
        <>
            <HydrationBoundary state={dehydrate(queryCilent)}>
                <Suspense fallback={<AgentsViewLoading />}>
                    <AgnetsListHeader />
                    <ErrorBoundary fallback={<AgentsViewError />}>
                        <AgentsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    );
};

export default Page;
