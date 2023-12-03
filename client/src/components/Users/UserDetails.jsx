import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserDetails() {
  const [userDetails, setUserDetails] = useState();
  let { id } = useParams();
  console.log(id);

  const fetchUserDetails = async () => {
    const res = await fetch(`http://localhost:8001/user/${id}`);
    const data = await res.json();

    if (data !== undefined) setUserDetails(data.user);
  };
  useEffect(() => {
    fetchUserDetails();
    console.log("detals: ", userDetails);
  }, []);
  return (
    <div className="flex items-center justify-center w-full flex-col space-y-10 ">
      <h1 className="bold text-3xl">Hello </h1>
      <h1 className="bold text-3xl">
        This is <span className="underline">{userDetails?.name}</span> Page{" "}
      </h1>
      <div className="flex space-x-10">
        <div className="underline bold">Post:</div>
        {userDetails?.Posts?.map(item => {
          return (
            <div className="border p-5" key={item.id}>
              {" "}
              {item.title}{" "}
            </div>
          );
        })}{" "}
      </div>
      <div className="flex space-x-10">
        <div className="underline bold">Dairy:</div>
        {userDetails?.Dairy?.map(item => {
          return (
            <div className="border p-5" key={item.id}>
              {item.name}
            </div>
          );
        })}{" "}
      </div>
      <div className="flex space-x-10">
        <div className="underline bold">Measurements:</div>
        {userDetails?.Measurements && <div>{userDetails.Measurements}</div>}
      </div>
    </div>
  );
}

export default UserDetails;
