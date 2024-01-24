import "./PostSectionIntro.scss";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import ImageFullscreen from "@/components/ImageFullscreen/ImageFullscreen";

export default function PostSectionIntro({ post }) {
  return (
    <div className="introduction">
      <div className="introduction--text">
        <h3>Introduction</h3>
        <ReactMarkdown components={{ p: "p" }}>
          {post.introduction?.content}
        </ReactMarkdown>
      </div>
      <div className="introduction--image">
        {post.introduction?.imageUrl && (
          <Image
            className="introduction--image--img"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUzZpfDwADuQG3zGD5JgAAAABJRU5ErkJggg=="
            src={post.introduction?.imageUrl}
            alt={post.introduction?.altImage}
            width={1920}
            height={1080}
            quality={90}
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
        )}
        {post.introduction?.imageUrl && (
          <Image
            className="backgroundImage"
            src={post.introduction?.imageUrl}
            alt={post.title}
            width={1920}
            height={1080}
            quality={1}
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
        )}
        {post.introduction?.imageUrl && (
          <ImageFullscreen
            src={post.introduction?.imageUrl}
            alt={post.introduction?.altImage}
          />
        )}
      </div>
    </div>
  );
}
