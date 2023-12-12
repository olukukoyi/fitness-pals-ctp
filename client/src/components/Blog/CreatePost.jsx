import Cookies from "js-cookie";
import { useRef } from "react";
import PropTypes from "prop-types";

function CreatePost({ topic }) {
  const titleInput = useRef("");
  const contentInput = useRef("");

  const handleSubmit = async e => {
    e.preventDefault();
    const title = titleInput.current.value;
    const body = contentInput.current.value;
    const ownerId = Cookies.get("userid");
    const form = { title, topic, body, ownerId };

    if (title === "" || body === "") {
      return;
    }

    const res = await fetch("http://localhost:8001/posts/add-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // You might need additional headers (e.g., authentication tokens) based on the API requirements
      },
      credentials: "include",
      body: JSON.stringify(form),
    });
    const data = res.json();
    console.log(data);
    window.location.reload();
  };
  return (
    <form className="flex flex-col space-y-5">
      <input
        type="text"
        ref={titleInput}
        placeholder="Title"
        className="input input-bordered w-full max-w-xs"
      />
      <textarea
        ref={contentInput}
        className="textarea textarea-bordered"
        placeholder="Content"
      ></textarea>
      <button
        className="btn btn-primary"
        onClick={e => {
          handleSubmit(e);
        }}
      >
        Go!
      </button>
    </form>
  );
}

CreatePost.propTypes = {
  topic: PropTypes.string.isRequired,
};

export default CreatePost;
