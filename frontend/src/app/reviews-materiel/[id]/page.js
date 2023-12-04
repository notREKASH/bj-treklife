import ReviewPage from "@/containers/ReviewPage/ReviewPage";

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;

  const post = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/productsReviews/${id}`
  ).then((res) => res.json());

  return {
    title: `${post.title} - BJ-Treklife`,
    description: post.metaDescription,
  };
}

export default function Page({ params, searchParams }) {
  return (
    <div style={{ backgroundColor: "white" }}>
      <ReviewPage id={params.id} />
    </div>
  );
}
