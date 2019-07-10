import React from 'react';
import Fade from 'react-reveal/Fade';
import './LoadingArticle.css';

const Article = props => {
  return (
    <Fade left distance={'15px'}>
      <div className="LoadingArticle">
        <div className="loadingTitle" style={{ width: props.width }}>{props.title}</div>
        <div className="loadingDate">{props.date}</div>
      </div>
    </Fade>
  )
};

export default Article;