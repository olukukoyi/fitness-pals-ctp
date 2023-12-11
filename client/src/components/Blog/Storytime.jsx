import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";

function Storytime() {
  const [feed, setFeed] = useState();

  const fetchFeed = async () => {
    const res = await fetch("http://localhost:8001/posts/story-time");
    const { storytimes } = await res.json();
    setFeed(storytimes);
    console.log(storytimes);
    if (storytimes !== undefined) setFeed(storytimes.reverse());
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

      {/* STORY TIME POSTS */}
      <div className="flex flex-col items-center w-full mt-4">
        <div>
          <h1 className=" text-center font-bold text-3xl underline mb-2">
            Story Time{" "}
          </h1>
          {/* <h2 className="text-2xl">
              This feed is for all storys of you gym enthusiasts that kept you
              pushing!
            </h2> */}
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

export default Storytime;
