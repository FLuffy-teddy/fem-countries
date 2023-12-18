import type { InferGetStaticPropsType, GetStaticProps } from "next";

// type Posts = {
//   href: string;
//   flag: string;
//   name: string;
//   fullName: string;
//   population: number;
//   region: string;
//   subregion: string;
//   capital: string;
//   currencies: string;
//   language: string;
// };

// posts will be populated at build time by getStaticProps()
export default function Test({ posts }: any) {
  console.log({ posts });
  return (
    <>
      <h1>Test</h1>
    </>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("https://restcountries.com/v3.1/all");
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}
