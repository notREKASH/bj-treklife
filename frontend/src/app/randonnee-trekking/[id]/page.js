import PostPage from "@/containers/PostPage/PostPage";
const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;

  const post = await fetch(`${URL_API}/api/posts/${id}`).then((res) =>
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
