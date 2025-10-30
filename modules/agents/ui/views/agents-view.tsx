"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    return (
        <div>
            <ResponsiveDialog
                title="Responsive test"
                description="Hello"
                open={false}
                onOpenChange={() => {}}
            >
                <Button>Some Action</Button>
            </ResponsiveDialog>

            {JSON.stringify(data, null, 2)}
        </div>
    );
};

export const AgentsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="This may take a while..."
        />
    );
};

export const AgentsViewError = () => {
    return (
        <ErrorState
            title="Agents Loading Error"
            description="There was an error loading your agents. Please try again."
        />
    );
};
