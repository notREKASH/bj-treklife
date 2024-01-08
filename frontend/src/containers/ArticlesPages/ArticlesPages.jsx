"use client";

import PostCard from "@/components/PostCard/PostCard";
import "./ArticlesPages.scss";
import Newsletter from "@/components/Newsletter/Newsletter";
import SocialMediaPanel from "@/components/SocialMediaPanel/SocialMediaPanel";
import PaginationComponent from "@/components/Paginate/Paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRandonneeTrekkingFilterName } from "@/app/redux/actions/filter.actions";

const filterButtons = [
  {
    name: "Tous",
    filter: "Tous",
  },
  {
    name: "Randonnée",
    filter: "randonnée",
  },
  {
    name: "Trekking",
    filter: "trekking",
  },
];

export default function ArticlesRandonneeTrek({ posts, filterName }) {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const [currentFilter, setCurrentFilter] = useState(null);

  const customSelect = useRef(null);

  const handleClickFilter = (filter) => {
    setCurrentFilter(filter);
    handleFilter(filter);
    updateFilter(filter);
  };

  const updateFilter = (filter) => {
    dispatch(setRandonneeTrekkingFilterName(filter));
  };

  const handleShowMenu = () => {
    customSelect.current.classList.toggle("active");
  };

  const handleFilter = (filter) => {
    if (filter === "Tous") {
      push("/randonnee-trekking");
    } else {
      push(`/randonnee-trekking/categorie/${filter}`);
    }
  };

  return (
    <>
      <div className="articles-layout">
        <div className="articles-layout__background">
          {currentFilter ? (
            <h2>Retrouvez toutes mes sorties {currentFilter}</h2>
          ) : (
            <h2>Retrouvez toutes mes sorties</h2>
          )}
        </div>
        <div className="articles">
          <div className="articles--container">
            {posts &&
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  postTitle={post.title}
                  postContent={post.introduction?.content}
                  postImage={post.coverImageUrl}
                  postCategory={post.details?.activityType}
                  postUrl="randonnee-trekking"
                  postId={post._id}
                  contentType="randonneeTrekking"
                />
              ))}
          </div>
          <div className="articles__filterPanel">
            <div className="articles__filterPanel--desktop">
              <h3>Filtrer par catégorie</h3>
              <ul className="articles__filterPanel--desktop__ul">
                {filterButtons.map((button, index) => (
                  <li key={button.name}>
                    <button onClick={() => handleFilter(button.filter)}>
                      {button.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="newsletterPanel">
              <Newsletter />
            </div>
            <div className="socialMediaRando">
              <SocialMediaPanel />
            </div>
          </div>
        </div>
        <div className="articles-layout--rightPanel">
          <div className="filterPanel--mobile">
            <div className="dropdownMenu">
              <FontAwesomeIcon icon={faFilter} className="filter-ico" />
              <div className="dropdownMenu__custom-select" ref={customSelect}>
                <button
                  className="dropdownMenu__custom-select__select-button"
                  onClick={handleShowMenu}>
                  <span>{filterName ? `${filterName}` : "tous"}</span>
                  <span className="dropdownMenu__custom-select__select-button--arrow"></span>
                </button>
                <ul className="dropdownMenu__custom-select--select-dropdown">
                  {filterButtons.map(({ name, filter }) => (
                    <li
                      key={name}
                      className={filter === currentFilter ? "selected" : ""}
                      onClick={() => handleClickFilter(filter)}>
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="articles-layout--pagination">
          <PaginationComponent contentType="randonneeTrekking" />
        </div>
      </div>
    </>
  );
}
