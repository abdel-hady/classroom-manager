"use client"

import { useRouter } from "next/navigation";
import Classess from "./classess/page";
import { useEffect } from "react";

export default function Home() {

    const router = useRouter();

    useEffect(() => {
        router.push('/classess');
    }, []);
    return (
        <>
            <Classess />
        </>
    );
}
