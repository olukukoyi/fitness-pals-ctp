/* eslint-disable react/no-unescaped-entities */
import Card from "./Card";
import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.jpg";
import pic3 from "../assets/pic3.jpg";

import Cookies from "js-cookie";

function Home() {
  function getStarted() {
    const userid = Cookies.get("userid");
    if (userid === undefined) {
      return;
    } else {
      window.location += "diary";
    }
  }

  return (
    // Need to add a hero picture for the Home Page
    <div className="Home">
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Fitness Pals</h1>
            <p className="py-6">
              The only app you'll need, for all your gym essential needs
            </p>
            <label
              htmlFor="my_modal_5"
              className="btn btn-primary"
              onClick={getStarted}
            >
              Get Started
            </label>
          </div>
        </div>
      </div>
      {/* Need to add photos for each card */}
      <div className="flex flex-row flex-wrap justify-evenly py-10">
        <Card
          image={pic1}
          title="Measurements Page"
          description="Check your BMI & also check your current calorie intake and calorie goals!"
          linkTo="/measure"
        />
        <Card
          image={pic2}
          title="Diary"
          description="Check your personalized notes on your progress and calorie intake!"
          linkTo="/diary"
        />
        <Card
          image={pic3}
          title="Blog"
          description="Chat and discuss gym related topics with other Gym goers!"
          linkTo="/blog"
        />
      </div>
      {/* Need footer, will wait to see what group thinks */}
    </div>
  );
}

export default Home;
