import SearchHero from "./SearchHero";

const Hero = () => {
  return (
    <div className="relative h-[600px] w-full">
        <img src="/wallpaper.webp" alt="background" className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center text-left">
            <div>
                <h1 className="text-white font-bold text-[40px]">
                    Unsplash
                </h1>
                <h3 className="text-white text-[18px] mt-2">
                    The internet’s source for visuals.<br />
                    Powered by creators everywhere.
                </h3>
                <SearchHero />
            </div>
        </div>
    </div>
  );
};


export default Hero