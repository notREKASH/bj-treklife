import "./PostConclusion.scss";
import ReactMarkdown from "react-markdown";

export default function PostConclusion({ post }) {
  return (
    <div className="conclusion">
      <div className="conclusion--text">
        <h3>Conclusion</h3>
        <ReactMarkdown components={{ p: "p" }}>
          {post?.conclusion}
        </ReactMarkdown>
      </div>
    </div>
  );
}
