import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Home = () => {
  const [media, setMedia] = useState([]);
  const [currentMedia, setCurrentMedia] = useState(0);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(
          "https://bestinbd.com/projects/web/task/api/get-req-data/sections?type=slug&value=test&get_section=yes&image=yes&post=yes&file=yes&gallery=yes"
        );
        const data = await response.json();
        const mediaUrls = data.data.sections.flatMap((section) =>
          section.posts.list.flatMap((post) => {
            if (post.images && post.images.length > 0) {
              return post.images.map((image) => image.full_path);
            } else {
              return [];
            }
          })
        );
        setMedia(mediaUrls);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchMedia();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMedia((prevMedia) =>
        prevMedia === media.length - 1 ? 0 : prevMedia + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [media]);

  const handleNext = () => {
    setCurrentMedia((prevMedia) =>
      prevMedia === media.length - 1 ? 0 : prevMedia + 1
    );
  };

  const handlePrev = () => {
    setCurrentMedia((prevMedia) =>
      prevMedia === 0 ? media.length - 1 : prevMedia - 1
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Navbar />
      {media.length > 0 ? (
        <div className="absolute top-0 left-0 w-full h-full relative">
          {media.map((item, index) => {
            const isVideo = item.endsWith(".mp4");
            return isVideo ? (
              <video
                key={index}
                autoPlay
                loop
                muted
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  currentMedia === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <source src={item} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                key={index}
                src={item}
                alt={`Slide ${index}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  currentMedia === index ? "opacity-100" : "opacity-0"
                }`}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-white text-2xl">Loading Media...</p>
        </div>
      )}

      {/* Left Side Text */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center bg-gradient-to-r from-black via-transparent to-transparent">
        <div className="ml-10">
          <h1 className="text-white text-5xl font-bold mb-4">
            History is expertise <br />
            Reputation for <br />
            Excellence
          </h1>

          {/* Slider Navigation Buttons */}
          <div className="flex space-x-4 items-center text-white mt-28">
            {/* Left Arrow Button */}
            <button
              onClick={handlePrev}
              className="bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={handleNext}
              className="bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
