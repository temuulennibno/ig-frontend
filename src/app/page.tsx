"use client";

import { useContext, useEffect, useState } from "react";
import { User, UserContext } from "./providers/UserProvider";
import { redirect } from "next/navigation";
import { Navbar } from "./components/Navbar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type Post = {
  _id: string;
  imageUrl: string;
  description: string;
  createdAt: string;
  createdBy: User;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user, loading } = useContext(UserContext);

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
            <div className="flex justify-between">
              <div className="font-bold">{post.createdBy.username}</div>
              {/* MM -> 05 */}
              {/* M -> 5 */}
              {/* <div className="font-bold">{dayjs(post.createdAt).format("YYYY/MM/D hh:mm")}</div> */}
              <div className="font-bold">{dayjs(post.createdAt).fromNow()}</div>
            </div>
            <img src={post.imageUrl} alt="" />
            {post.description}
          </div>
        ))}
      </div>
    </div>
  );
}
