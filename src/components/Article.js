import React from 'react';
import './Article.css';

const Article = props => {
  return (
    <div className="Article">
      <div className="articleTitle">{props.title}</div>
      <div className="articleDate">{props.date}</div>
    </div>
  )
};

export default Article;