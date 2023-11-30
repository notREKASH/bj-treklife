import ReviewPage from "@/containers/ReviewPage/ReviewPage";

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;

  const post = await fetch(`http://localhost:5000/productsReviews/${id}`).then(
    (res) => res.json()
  );

  return {
    title: post.title,
  };
}

export default function Page({ params, searchParams }) {
  return (
    <>
      <ReviewPage id={params.id} />
    </>
  );
}
