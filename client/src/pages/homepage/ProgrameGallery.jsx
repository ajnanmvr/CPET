import React from "react";

function shuffleArray(array) {
  // Create a copy of the array
  const shuffledArray = [...array];

  // Shuffle the copy
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

function ProgramGallery() {
  const images = shuffleArray([
    "/images/1.jpeg",
    "/images/2.jpeg",
    "/images/3.jpeg",
    "/images/9.jpeg",
    "/images/5.jpeg",
    "/images/6.jpeg",
  ]);

  return (
    <section className="overflow-hidden text-neutral-700 mt-5">
      <div className="container px-5 py-2 lg:px-32 lg:pt-12">
        <h1 className="text-center text-xl font-bold text-teal-500 hover:text-teal-800 transition cursor-pointer py-1 rounded-[30px]">
          Our Gallery
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          {images.map((image, index) => (
            <div key={index} className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src={image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramGallery;
