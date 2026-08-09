import React, { useState } from "react";
import "./Blog.scss";
import posts from "../../data/blog.json";

const Blog = () => {
  // Стейт для хранения ID открытой статьи
  const [expandedId, setExpandedId] = useState(null);

  // Функция для открытия/закрытия статьи
  const togglePost = (id) => {
    // Если кликнули на уже открытую статью, закрываем её (null)
    // Иначе записываем её ID, чтобы открыть
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="blog" className="page-content blog-page">
      <h1 className="blog-page__title">Блог о детейлинге</h1>

      <div className="blog-page__list">
        {posts.map((post) => {
          const isOpen = expandedId === post.id;

          return (
            <article key={post.id} className={`blog-post ${isOpen ? "open" : ""}`}>
              {/* Выводим картинку из JSON */}
              <div className="blog-post__image-wrapper">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>

              <div className="blog-post__info">
                <div className="blog-post__date">{post.date}</div>
                <h2>{post.title}</h2>
                
                {/* Если статья открыта - показываем content, если закрыта - excerpt */}
                <p className="blog-post__text">
                  {isOpen ? post.content : post.excerpt}
                </p>
                
                <button 
                  className="blog-post__read-more"
                  onClick={() => togglePost(post.id)}
                >
                  {isOpen ? "Скрыть статью ←" : "Читать далее →"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Blog;