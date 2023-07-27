import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getData(id) {
  const url = await fetch(`https://api.themoviedb.org/3/movie/${id}`,{
    headers: {
      accept: "application/json",
      Authorization:process.env.THEMOVIEDATABASE_API
    },
  });

  return url.json();
};

const MovieBanner = async ({ params ,children}) => {
  const data = await getData(params.id);

  return (
    <div className="min-h-screen p-10">
      <div className="h-[40vh] relative">
        <Image
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          alt="Image of a movie "
          className="object-cover w-full rounded-lg"
          fill
        />
      </div>
      <h1 className="text-center text-4xl font-bold pt-5">{data.title}</h1>

      <div className="flex gap-x-10 mt-10">
        <div className="w-1/2 font-medium bg-gray-100">
          <div className="flex flex-col p-5">
          <h1>
            <span className="underline ">Homepage:</span>{" "}
            <Link href={data.homepage} target="_blank">Link</Link>
          </h1>

          <h1>
            <span className="underline">Orignal Language:</span>{" "}
            {data.original_language}
          </h1>
          
          <p><span className="underline">Overview:</span> {data.overview}</p>

          <p><span className="underline">Release Date:</span> {data.release_date}</p>
          </div>
        </div>
        <div className="w-1/2">
            {children}
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;
