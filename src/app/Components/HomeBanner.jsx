const HomeBanner = () => {
  return (
    <>
      <div
        className="bg-cover bg-center h-screen flex items-center justify-start px-4 md:px-8 lg:px-16 xl:px-24"
        style={{
          backgroundImage: "url('/homebanner.jpg')",
        }}
      >
        <div className="text-white text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 lg:mb-8 max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            Raining Offers For Hot Summer!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6 lg:mb-8">
            25% Off On All Products
          </p>
          <div className="flex flex-col md:flex-row">
            <button className="btn bg-white text-black hover:bg-black hover:text-white border-none rounded-none px-6 mr-0 md:mr-5 mb-4 md:mb-0">
              SHOP NOW
            </button>
            <button className="btn btn-outline hover:bg-white hover:text-black text-white rounded-none px-6">
              FIND MORE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
