/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function PostCard({ item }) {
  const { title, body, User } = item;
  return (
    <div className="space-y-4">
      {/* this div right under previously had w-96 as the width instead of w-screen. which one is better? */}
      <div className="card card-bordered bg-accent w-96 shadow-xl text-black">
        <div className="card-body card-normal p-4">
          <h2 className="card-title text-2xl font-bold mb-2"> {title} </h2>
          <div className="divider divider-neutral mb-4"></div>
          <p className="text-lg">{body}</p>
          <div className="flex items-center justify-end mt-4">
            <p className="text-sm text-gray-500">Author :</p>
            <Link to={`/user/${User.userId}`} className="ml-2 text-blue-500">
              {User.name}
            </Link>
          </div>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">IDK</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
