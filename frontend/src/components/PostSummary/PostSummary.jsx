import "./PostSummary.scss";

export default function PostSummary({ post }) {
  return (
    <div className="summary">
      {post.sections?.map((section, summaryIndex) => (
        <div key={`summary${summaryIndex}`}>
          <h3>{section.title}</h3>
        </div>
      ))}
    </div>
  );
}
