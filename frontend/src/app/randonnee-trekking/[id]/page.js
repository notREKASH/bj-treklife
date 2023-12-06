import PostPage from "@/containers/PostPage/PostPage";

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;

  const post = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`
  ).then((res) => res.json());

  return {
    title: `${post.title} - BJ-Treklife`,
    description: post.metaDescription,

    openGraph: {
      title: `${post.title} - BJ-Treklife`,
      description: post.metaDescription,
      type: "website",
      locale: "fr_FR",
      url: `https://bj-treklife.fr/articles/${post.id}`,
      site_name: "BJ-Treklife",
      images: [
        {
          url: `https://bj-treklife.fr/${post.coverImageUrl}`,
          width: 1200,
          height: 630,
          alt: `${post.altImageCover}`,
        },
      ],
    },
  };
}

export default function Page({ params, searchParams }) {
  return (
    <div style={{ backgroundColor: "white" }}>
      <PostPage id={params.id} />
    </div>
  );
}
