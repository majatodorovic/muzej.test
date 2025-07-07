"use client";

import SvgWithImage from "@/components/svg/Paths/SvgWithImage";

const CenterForMarkAnimals = ({ posts }) => {
  const firstTwoPosts = posts.slice(0, 2);

  return (
    <div data-aos="fade-up" className="sectionPaddingB sectionPaddingX">
      <div className="flex flex-col lg:gap-20">
        {firstTwoPosts.map((post, index) => (
          <div
            key={post.id || index}
            className={`flex flex-col justify-between gap-8 md:flex-row ${
              index === 1 ? "md:flex-row-reverse md:text-right" : ""
            }`}
          >
            <div className="w-1/2">
              <div
                className={`w-full max-w-full flex-1 sm:text-lg 2xl:w-4/5 ${
                  index === 1 ? "md:ml-auto" : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: post.basic_data.description,
                }}
              />
            </div>
            <div className="w-1/2">
              <SvgWithImage
                image={post.images.thumb_image}
                alt={post.basic_data.name}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CenterForMarkAnimals;
