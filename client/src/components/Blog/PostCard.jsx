/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function PostCard({ item }) {
  const { title, body, User } = item;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title"> {title} </h2>
        <p>{body}</p>
        <div className=" flex items-center justify-end w-full">
          <p>Author :</p>
          <Link to={`/user/${User.userId}`}>{User.name}</Link>
        </div>

        <div className="card-actions justify-end">
          <button className="btn btn-primary">IDK</button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
