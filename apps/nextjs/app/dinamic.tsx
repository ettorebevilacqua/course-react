"use client"
import { useState, useEffect } from "react";

export const Dynamic = ({ children }: { children: React.ReactNode }) => {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => { setHasMounted(true); }, []);
    return !hasMounted ? null : <>{children}</>
};

export const Dynamic2 = ({ children }:
    { children: React.ReactNode }) => <>{children}</>