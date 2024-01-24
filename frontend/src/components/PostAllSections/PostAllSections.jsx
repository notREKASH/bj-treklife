import SubSection from "../SubSection/SubSection";
import "./PostAllSections.scss";

export default function PostAllSections({ post }) {
  return (
    <div className="allSections">
      {post.sections?.map((section, sectionIndex) => (
        <div key={`section${sectionIndex}`}>
          {section.subSections.map((subSection, subSectionIndex) => (
            <div key={`subSection${subSectionIndex}`}>
              {subSectionIndex <= 5 && (
                <SubSection
                  title={subSectionIndex === 0 ? `${section.title}` : ""}
                  content={subSection?.content}
                  imageUrl={subSection?.imageUrl}
                  altImage={subSection?.altImage}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
