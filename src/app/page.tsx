"use client";

import { useContext } from "react";
import { UserContext } from "./providers/UserProvider";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, setToken, loading } = useContext(UserContext);

  console.log({ user, loading });

  if (loading) {
    return <>Loading....</>;
  }

  if (!user) {
    return redirect("/signin");
  }

  const handleLogout = () => {
    setToken(null);
  };
  return (
    <div>
      Welcome home page: {user?.fullname} <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
