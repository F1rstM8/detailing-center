import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Blog.scss"; 

const Blog = () => {
  // Достаем не только t, но и i18n, чтобы знать текущий язык
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/posts")
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
    if (expandedPostId === id) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(id);
    }
  };

  // Узнаем текущий язык ('ru' или 'pl')
  const currentLang = i18n.language;

  return (
    <main className="page-content blog-page">
      <div className="blog-container">
        <h2 className="blog-page__title">{t("blog_page_title", "Блог о детейлинге")}</h2>
        
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa" }}>
            {t("loading_posts", "Загрузка статей...")}
          </div>
        ) : (
          <div className="blog-page__list">
            {posts.map((post) => {
              // Динамически выбираем контент на основе текущего языка
              const postTitle = currentLang === 'pl' && post.title_pl ? post.title_pl : post.title_ru;
              const postExcerpt = currentLang === 'pl' && post.excerpt_pl ? post.excerpt_pl : post.excerpt_ru;
              const postContent = currentLang === 'pl' && post.content_pl ? post.content_pl : post.content_ru;

              return (
                <article key={post.id} className="blog-post">
                  <div className="blog-post__image-wrapper">
                    <img src={post.image} alt={postTitle} />
                  </div>
                  <div className="blog-post__info">
                    <span className="blog-post__date">{post.date}</span>
                    
                    {/* Выводим правильный заголовок */}
                    <h2>{postTitle}</h2>
                    
                    {/* Выводим правильный текст (полный или краткий) */}
                    <p className="blog-post__text">
                      {expandedPostId === post.id 
                        ? (postContent || postExcerpt) 
                        : postExcerpt}
                    </p>
                    
                    <button 
                      className="blog-post__read-more"
                      onClick={() => togglePost(post.id)}
                    >
                      {expandedPostId === post.id 
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
    </main>
  );
};

export default Blog;