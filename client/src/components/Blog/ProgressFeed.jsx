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
    <div className="flex flex-col items-center p-8">
      {/* MODAL BUTTON */}
      <button
        className="btn btn-nuetral"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Create new post
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

      {/* PROGRESS POSTS */}
      <div className="flex flex-col items-center w-full mt-4">
        <div>
          <h1 className=" text-center font-bold text-3xl underline mb-2">
            Progress Feed{" "}
          </h1>
          <div className="space-y-4">
            {/*style around each post card?*/}
            {feed?.map(item => {
              return <PostCard key={item.id} item={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressFeed;
