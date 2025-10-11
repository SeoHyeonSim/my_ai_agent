"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
    const { data: session } = authClient.useSession();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = () => {
        authClient.signUp.email(
            {
                email,
                name,
                password,
            },
            {
                onError: () => {
                    window.alert("Something went wrong");
                },
                onSuccess: () => {
                    window.alert("Success!");
                },
            }
        );
    };

    const onLogin = () => {
        authClient.signIn.email(
            {
                email,
                password,
            },
            {
                onError: () => {
                    window.alert("Something went wrong");
                },
                onSuccess: () => {
                    window.alert("Success!");
                },
            }
        );
    };

    if (session) {
        return (
            <div className="flex flex-col p-4 gap-y-4">
                <p>Welcome back, {session.user.name}!</p>
                <Button onClick={() => authClient.signOut}>Sign out</Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-10">
            {/* Sign in */}
            <div className="p-4 flex flex-col gap-y-4">
                <Input
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <Input
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Input
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <Button onClick={onSubmit}>Sign In</Button>
            </div>

            {/* Log in  */}
            <div className="p-4 flex flex-col gap-y-4">
                <Input
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <Input
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Input
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <Button onClick={onLogin}>Login</Button>
            </div>
        </div>
    );
}
