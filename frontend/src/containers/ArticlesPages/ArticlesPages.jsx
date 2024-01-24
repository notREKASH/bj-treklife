"use client";

import PostCard from "@/components/PostCard/PostCard";
import "./ArticlesPages.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  setCurrentRandonneeTrekkingPage,
} from "@/app/redux/actions/posts.action";
import Newsletter from "@/components/Newsletter/Newsletter";
import SocialMediaPanel from "@/components/SocialMediaPanel/SocialMediaPanel";
import PaginationComponent from "@/components/Paginate/Paginate";
import { useEffect } from "react";
import FilterPanelMobile from "@/components/FilterPanelMobile/FilterPanelMobile";
import FilterPanelDesktopPost from "@/components/FilterPanelDesktopPost/FilterPanelDesktopPost";

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

export default function ArticlesRandonneeTrek() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (!posts.length) {
      dispatch(getPosts());
      dispatch(setCurrentRandonneeTrekkingPage(1));
    }
  }, [dispatch, posts]);

  return (
    <>
      <div className="articles-layout">
        <div className="articles-layout__background">
          <h2>Retrouvez toutes mes sorties</h2>
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
            <FilterPanelDesktopPost
              filterButtons={filterButtons}
              pageName={"randonneeTrekking"}
            />
            <div className="newsletterPanel">
              <Newsletter />
            </div>
            <div className="socialMediaRando">
              <SocialMediaPanel />
            </div>
          </div>
        </div>
        <div className="articles-layout--rightPanel">
          <FilterPanelMobile
            filterButtons={filterButtons}
            pageName={"randonneeTrekking"}
          />
        </div>
        <div className="articles-layout--pagination">
          <PaginationComponent contentType="randonneeTrekking" />
        </div>
      </div>
    </>
  );
}
