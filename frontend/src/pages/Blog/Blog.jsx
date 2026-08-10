import React, { useState, useEffect } from "react";
import "./Blog.scss"; // Проверьте, правильный ли у вас путь к стилям

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Стучимся на сервер за статьями
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

  return (
    <main className="page-content blog-page">
      <div className="blog-container">
        <h2 className="blog-page__title">Блог о детейлинге</h2>
        
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa" }}>
            Загрузка статей...
          </div>
        ) : (
          <div className="blog-page__list">
            {posts.map((post) => (
              <article key={post.id} className="blog-post">
                <div className="blog-post__image-wrapper">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-post__info">
                  <span className="blog-post__date">{post.date}</span>
                  <h2>{post.title}</h2>
                  <p className="blog-post__text">{post.excerpt}</p>
                  <button className="blog-post__read-more">Читать далее →</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Blog;