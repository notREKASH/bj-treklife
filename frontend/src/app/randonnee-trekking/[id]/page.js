import PostPage from "@/containers/PostPage/PostPage";

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;

  const post = await fetch(`http://localhost:5000/posts/${id}`).then((res) =>
    res.json()
  );

  return {
    title: post.title,
  };
}

export default function Page({ params, searchParams }) {
  return (
    <>
      <PostPage id={params.id} />
    </>
  );
}
