import React from "react";
import "./Blog.scss";

// Импортируем данные статей из JSON
import posts from "../../data/blog.json";

const Blog = () => {
  return (
    <section id="blog" className="page-content blog-page">
      <h1 className="blog-page__title">Блог о детейлинге</h1>

      <div className="blog-page__list">
        {posts.map((post) => (
          <article key={post.id} className="blog-post">
            <div className="blog-post__date">{post.date}</div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <button className="blog-post__read-more">Читать далее →</button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
