"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./providers/UserProvider";
import { redirect } from "next/navigation";
import { Navbar } from "./components/Navbar";

type Post = {
  _id: string;
  imageUrl: string;
  description: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user, setToken, loading } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5500/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  if (loading) {
    return <>Loading....</>;
  }

  if (!user) {
    return redirect("/signin");
  }

  return (
    <div>
      <Navbar />

      <div className="w-[600px] flex flex-col gap-4 mx-auto">
        {posts.map((post) => (
          <div key={post._id} className="mb-4 border-b py-4">
            <img src={post.imageUrl} alt="" />
            {post.description}
          </div>
        ))}
      </div>
    </div>
  );
}
