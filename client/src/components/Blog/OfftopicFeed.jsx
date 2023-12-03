import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";

function OfftopicFeed() {
  const [feed, setFeed] = useState();

  const fetchFeed = async () => {
    const res = await fetch("http://localhost:8001/posts/off-topic");
    const { getOffTopicPosts } = await res.json();
    setFeed(getOffTopicPosts);
    console.log(getOffTopicPosts);
    if (getOffTopicPosts !== undefined) setFeed(getOffTopicPosts.reverse());
  };

  useEffect(() => {
    fetchFeed();
    console.log("feed: ", feed);
  }, []);
  return (
    <div className=" w-full flex items-center justify-center flex-col space-y-5">
      <div className="flex justify-evenly w-full">
        <div>
          <h1 className="font-bold text-[50px] underline">Off Topic feed </h1>{" "}
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

export default OfftopicFeed;
