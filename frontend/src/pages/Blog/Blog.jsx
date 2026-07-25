import React from 'react';
import './Blog.scss';

// Временные данные для статей
const mockPosts = [
  { 
    id: 1, 
    date: '15.07.2026', 
    title: 'Как подготовить кузов автомобиля к зиме?', 
    excerpt: 'Зима — суровое время для лакокрасочного покрытия. Рассказываем, почему керамика защищает лучше воска в условиях реагентов и перепадов температур.' 
  },
  { 
    id: 2, 
    date: '28.06.2026', 
    title: 'Мифы о полировке: можно ли протереть лак до дыр?', 
    excerpt: 'Развеиваем самые популярные заблуждения о восстановительной полировке. Как часто стоит делать эту процедуру и как измеряется толщина лака.' 
  },
  { 
    id: 3, 
    date: '10.06.2026', 
    title: 'Химчистка салона: разбор каждого этапа', 
    excerpt: 'Подробно показываем процесс профессиональной химчистки: от сухой уборки торнадором до обработки пластика и кожи защитными консервантами.' 
  }
];

const Blog = () => {
  return (
    <main className="page-content blog-page">
      <h1 className="blog-page__title">Блог о детейлинге</h1>
      
      <div className="blog-page__list">
        {mockPosts.map((post) => (
          <article key={post.id} className="blog-post">
            <div className="blog-post__date">{post.date}</div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <button className="blog-post__read-more">Читать далее →</button>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Blog;