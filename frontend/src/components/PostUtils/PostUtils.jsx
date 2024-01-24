import "./PostUtils.scss";

export default function PostUtils({ post }) {
  const descriptionUtils = [
    { name: "Localisation", value: post.details?.location },
    { name: "Activité", value: post.details?.activityType },
    { name: "Durée", value: post.details?.duration + " heures" },
    { name: "Distance", value: post.details?.distance + " km" },
    {
      name: "Dénivelé",
      value: `${post.details?.elevationGain} D+ et ${post.details?.elevationLoss} D-`,
    },
    { name: "Difficulté", value: `${post.details?.difficulty}/10` },
  ];

  return (
    <div className="utils">
      {descriptionUtils.map((descriptionUtil, descriptionIndex) => (
        <div key={`description${descriptionIndex}`}>
          <p>
            {descriptionUtil.name}:<span>{descriptionUtil.value}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
