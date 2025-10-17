"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
});

const SignInView = () => {
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
            },
            {
                onSuccess: () => {
                    setPending(false);
                    router.push("/");
                },
                onError: ({ error }) => {
                    setError(error.message);
                },
            }
        );
    };

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form
                            action="p-6 md:p-8"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center  gap-y-3 m-5">
                                    <h1 className="text-2xl font-bold">
                                        Welcome Back
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Login to your account
                                    </p>
                                    <div className="grid gap-3 w-full">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="abc@example.com"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Password
                                                    </FormLabel>

                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="abc@example.com"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {!!error && (
                                        <Alert className="bg-destructive/10 border-none">
                                            <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                            <AlertTitle>Error</AlertTitle>
                                        </Alert>
                                    )}
                                    <Button
                                        disabled={pending}
                                        type="submit"
                                        className="w-full"
                                    >
                                        Sign In
                                    </Button>
                                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t ">
                                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                                            Or continue with
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button
                                            disabled={pending}
                                            className="w-full gap-x-3"
                                            variant={"outline"}
                                            type="button"
                                        >
                                            <Image
                                                src={"/images/google-color.png"}
                                                alt={"Google"}
                                                width={20}
                                                height={20}
                                            />
                                            Github
                                        </Button>
                                        <Button
                                            disabled={pending}
                                            className="w-full gap-x-3"
                                            variant={"outline"}
                                            type="button"
                                        >
                                            <Image
                                                src={"/images/github.png"}
                                                alt={"Github"}
                                                width={20}
                                                height={20}
                                            />
                                            Github
                                        </Button>
                                    </div>
                                    <div className="text-center text-sm flex gap-2">
                                        Don&apos;t have an account?
                                        <Link
                                            href={"/sign-up"}
                                            className="text-sm text-blue-400  hover:text-blue-500 font-semibold  underline underline-offset-4"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Form>

                    <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center  justify-center">
                        <Image
                            src="/images/robot.png"
                            alt="Image"
                            width={92}
                            height={92}
                        />
                        <p className="text-2xl font-semibold text-white">
                            Agent AiMi
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
};

export default SignInView;
