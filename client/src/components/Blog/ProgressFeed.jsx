import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";

function ProgressFeed() {
  const [feed, setFeed] = useState();

  const fetchFeed = async () => {
    const res = await fetch("http://localhost:8001/posts/progress");
    const { progressPosts } = await res.json();
    setFeed(progressPosts);
    console.log(progressPosts);
    if (progressPosts !== undefined) setFeed(progressPosts.reverse());
  };

  useEffect(() => {
    fetchFeed();
    console.log("feed: ", feed);
  }, []);
  return (
    <div className=" w-full h-screen flex items-center justify-center flex-col space-y-5">
      <div className="flex justify-evenly w-full">
        <div>
          <h1 className="font-bold text-[50px] underline">Progress Feed </h1>{" "}
          {feed?.map((item) => {
            return <PostCard key={item.id} item={item} />;
          })}
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-[50px] underline"> add new post</h1>
          <CreatePost />
        </div>
      </div>
    </div>
  );
}

export default ProgressFeed;
