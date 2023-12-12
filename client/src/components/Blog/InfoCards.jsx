function InfoCards() {
  return (
    <div className="">
      <div className="divider"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-8 pr-8">
        {/* Div 1 */}
        <div className="bg-blue-200 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2 dark:text-black">
            Fitness Tips
          </h2>
          <p className="dark:text-black">
            Discover beginner - expert tips to enhance your workout routine.
          </p>
        </div>

        {/* Div 2 */}
        <div className="bg-green-200 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2 dark:text-black">
            Nutrition Insights
          </h2>
          <p className="dark:text-black">
            Learn about the importance of nutrition for your fitness journey
            from others in the community.
          </p>
        </div>

        {/* Div 3 */}
        <div className="bg-purple-200 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2 dark:text-black">
            Community Stories
          </h2>
          <p className="dark:text-black">
            Read inspiring stories from our fitness community members.
          </p>
        </div>
      </div>
      <div className="divider"></div>
      {/* Call to Action */}
      <div className="mt-6 mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Ready to Start Your Journey?
        </h2>
        <p className="text-gray-600">
          Join our community and embark on a healthier lifestyle today!
        </p>

        <div className="mt-8 text-center">
          <img
            src="/fitnesspals_Logo.png"
            alt="FitnessPals Logo"
            className="w-40 h-40 mx-auto rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default InfoCards;
