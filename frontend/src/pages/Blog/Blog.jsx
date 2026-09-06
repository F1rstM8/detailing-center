import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLocalizedField } from "../../helpers/getLocalizedField";
import "./Blog.scss";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState(null);

  useEffect(() => {
  
    fetch(`${import.meta.env.VITE_API_URL}/posts`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке блога:", error);
        setIsLoading(false);
      });
  }, []);

  const togglePost = (id) => {
    setExpandedPostId((prev) => (prev === id ? null : id));
  };

  const currentLang = i18n.language;

  return (
    <section className="page-content blog-page">
      <div className="blog-container">
        <h2 className="blog-page__title">
          {t("blog_page_title", "Блог о детейлинге")}
        </h2>

        {isLoading ? (
          <div className="blog-loader">
            {t("loading_posts", "Загрузка статей...")}
          </div>
        ) : (
          <div className="blog-page__list">
            {posts.map((post) => {
             
              const postTitle = getLocalizedField(post, "title", currentLang);
              const postExcerpt = getLocalizedField(post, "excerpt", currentLang);
              const postContent = getLocalizedField(post, "content", currentLang);

              const isExpanded = expandedPostId === post.id;

              return (
                <article key={post.id} className="blog-post">
                  <div className="blog-post__image-wrapper">
                    <img src={post.image} alt={postTitle} />
                  </div>
                  <div className="blog-post__info">
                    <time className="blog-post__date">{post.date}</time>

                    <h3>{postTitle}</h3>

                    <p className="blog-post__text">
                      {isExpanded ? postContent || postExcerpt : postExcerpt}
                    </p>

                    <button
                      className="blog-post__read-more"
                      onClick={() => togglePost(post.id)}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded
                        ? t("blog_hide", "Скрыть")
                        : t("blog_read_more", "Читать далее →")}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;