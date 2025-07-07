import SvgButtonOne from "@/components/svg/Paths/SvgButtonOne";
import Image from "next/image";
import Link from "next/link";

const PostThumb = ({ post }) => {
  return (
    <div className="relative flex h-[350px] flex-col justify-between rounded-lg bg-lightGreen pb-6 pt-[200px] max-md:h-[330px] max-md:pt-[180px] 3xl:h-[420px] 3xl:pt-[250px]">
      <Image
        alt={post.basic_data.title}
        src={post.gallery[0] ?? "/images/placeholder.svg"}
        width={250}
        height={250}
        className="clipPathImage absolute left-1/2 top-0 h-[200px] w-[200px] -translate-x-1/2 -translate-y-[50px] object-cover max-md:h-[180px] max-md:w-[180px] 3xl:h-[250px] 3xl:w-[250px]"
      />
      <div className="fontForum line-clamp-2 px-8 text-center text-2xl text-white 3xl:text-3xl">
        {post.basic_data.title}
      </div>
      <Link href={`/zbirke/${post.slug}`} className="relative">
        <SvgButtonOne className="mx-auto h-[52px] w-[250px]" />
        <div className="buttonText">Saznaj više</div>
      </Link>
    </div>
  );
};

const NewPosts = ({ posts }) => {
  const slicedPosts = posts.slice(0, 4);

  return (
    <div
      data-aos="fade-up"
      className="sectionPaddingY sectionPaddingX flex w-full flex-col items-center justify-center bg-secondary"
    >
      <h2 className="fontSpectral titleH2 mb-5 !leading-tight">
        Najznačajnije Prirodnjačke <br /> Zbirke u Srbiji
      </h2>
      <div className="text-center text-base xl:w-[650px] xl:text-lg">
        Zbirke sadrže predmete u rasponu od 4.5 milijarde godina starosti, od
        meteorita iz vremena nastanka Sunčevog sistema, stotine miliona godina
        stare fosile, pa do primeraka Pančićeve omorike i srpske romonde.
      </div>
      <div className="mt-[100px] grid w-full grid-cols-2 items-center gap-20 px-5 max-lg:grid-cols-1 sm:px-14 lg:gap-4 2xl:grid-cols-3">
        <div className="max-2xl:hidden">
          {slicedPosts[0] && <PostThumb post={slicedPosts[0]} />}
        </div>
        <div className="flex flex-col gap-20 lg:mb-[200px] 2xl:hidden">
          {slicedPosts[0] && <PostThumb post={slicedPosts[0]} />}
          {slicedPosts[3] && <PostThumb post={slicedPosts[3]} />}
        </div>
        <div className="flex flex-col gap-20">
          {slicedPosts[1] && <PostThumb post={slicedPosts[1]} />}
          {slicedPosts[2] && <PostThumb post={slicedPosts[2]} />}
        </div>
        <div className="max-2xl:hidden">
          {slicedPosts[3] && <PostThumb post={slicedPosts[3]} />}
        </div>
      </div>
      <Link href="/zbirke" className="relative mt-14">
        <SvgButtonOne className="mx-auto h-[52px] w-[250px]" />
        <div className="buttonText">Pogledaj sve</div>
      </Link>
    </div>
  );
};
export default NewPosts;
