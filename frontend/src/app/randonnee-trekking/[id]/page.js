import PostPage from "@/containers/PostPage/PostPage";

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;

  const post = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`
  ).then((res) => res.json());

  return {
    title: `${post.title} - BJ-Treklife`,
    description: post.metaDescription,
  };
}

export default function Page({ params, searchParams }) {
  return (
    <div style={{ backgroundColor: "white" }}>
      <PostPage id={params.id} />
    </div>
  );
}
