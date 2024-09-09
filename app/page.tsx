"use client";

import LandingPage from "./landing-page";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser, useAuth } from "@clerk/nextjs";

export default function Home() {
  const storeUser = useMutation(api.users.store);
  const { user } = useUser();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && user) {
      storeUser({ email: user.primaryEmailAddress?.emailAddress || "" });
    }
  }, [user, storeUser, isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <LandingPage />;
}