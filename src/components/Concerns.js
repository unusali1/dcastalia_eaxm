import React, { useEffect, useState } from 'react';

const Card = ({ header, footer, backgroundImage }) => {
    return (
        <div className="relative w-64 h-60 overflow-hidden group bg-gray-200">
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>


            <div className="relative z-10 flex flex-col h-full bg-white  hover:text-white bg-opacity-60 group-hover:bg-opacity-0 transition-all duration-300 ease-in-out">
                <div className="flex-1 flex mt-4 ml-4">
                    {
                        header.map((h, index) => (
                            <h1 className="   hover:text-white text-xl font-bold">{h}</h1>
                        ))
                    }
                </div>
                <div className="flex-none flex ml-4 hover:text-white">
                    {
                        footer.map((f, index) => (
                            <p className="">{f}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

const Concerns = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [media, setMedia] = useState([]);
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([])

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await fetch(
                    "https://bestinbd.com/projects/web/task/api/get-req-data/sections?type=slug&value=test&get_section=yes&image=yes&post=yes&file=yes&gallery=yes"
                );
                const data = await response.json();
                const posts = data.data.sections.flatMap((section) =>
                    section.posts.list
                );
                const mediaUrls = posts.flatMap((post) => {
                    console.log('Processing post:', post);
                    if (post.data && post.data.length > 0) {
                        return post.images.map((image) => image.full_path);
                    }
                    if (post.images && post.images.length > 0) {
                        return post.images.map((image) => image.full_path);
                    } else {
                        return [];
                    }
                });
                setMedia(mediaUrls);

                const titlels = posts.flatMap((post) => {
                    console.log('Processing post:', post);
                    if (post.data && post.data.length > 0) {
                        return post.data.map((t) => t.title);
                    } else {
                        return [];
                    }
                });
                setTitle(titlels);

                const descriptions = posts.flatMap((post) => {
                    console.log('Processing post:', post);
                    if (post.data && post.data.length > 0) {
                        return post.data.map((d) => d.subtitle);
                    } else {
                        return [];
                    }
                });
                setDescription(descriptions);
            } catch (error) {
                console.error("Error fetching media:", error);
            }
        };

        fetchMedia();
    }, []);


    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? Math.ceil(title.length / 4) - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === Math.ceil(title.length / 4) - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="flex flex-col  p-6">
            <h1 className="text-3xl font-bold mb-6 mt-24">Our Concerns</h1>
            <div className="relative flex items-center w-full">
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
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

                <div className="flex overflow-hidden w-full">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {media.map((card, index) => (
                            <div key={index} >
                                <Card
                                    header={title}
                                    footer={description}
                                    backgroundImage={card}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
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
    );
};

export default Concerns;
