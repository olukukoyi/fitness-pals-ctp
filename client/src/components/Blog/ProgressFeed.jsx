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
    <div className="">
      <div className="flex justify-evenly w-full">
        <div>
          <h1 className="font-bold text-[50px] underline">Progress Feed </h1>{" "}
          {feed?.map(item => {
            return <PostCard key={item.id} item={item} />;
          })}
        </div>

        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          open modal
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Create Post:</h3>
            {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
            <CreatePost />
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default ProgressFeed;
