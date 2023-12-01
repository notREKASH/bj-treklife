import ReviewPage from "@/containers/ReviewPage/ReviewPage";
const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;

  const post = await fetch(`${URL_API}/api/productsReviews/${id}`).then((res) =>
    res.json()
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
