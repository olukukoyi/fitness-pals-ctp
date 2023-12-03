import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import BlogNav from "./BlogNav";

function Advancedfeed() {
  const [feed, setFeed] = useState();

  const fetchFeed = async () => {
    const res = await fetch("http://localhost:8001/posts/advanced");
    const { advancedPosts } = await res.json();
    setFeed(advancedPosts);
    // console.log(advancedPosts);
    if (advancedPosts !== undefined) setFeed(advancedPosts.reverse());
    return advancedPosts;
  };

  useEffect(() => {
    fetchFeed();
    console.log(feed);
  }, []);

  return (
    <div className=" w-full h-screen flex items-center justify-center flex-col space-y-5">
      <div className="flex justify-evenly w-full">
        <div className=" w-[25%] h-screen">
          <BlogNav />
        </div>
        <div>
          <h1 className="font-bold text-[50px] underline">Advanced Feed </h1>{" "}
          {feed?.map(item => {
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

export default Advancedfeed;
