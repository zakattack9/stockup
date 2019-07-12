import React from 'react';
import Fade from 'react-reveal/Fade';
import './Article.css';

const Article = props => {
  return (
    <Fade bottom distance={'10px'} delay={props.delay} when={props.show} appear={props.fade}>
      <div className="Article">
        <a href={props.link} target="_blank" rel="noopener noreferrer">
          <div className="articleTitle">{props.title}</div>
          <div className="articleDate">{props.site} • {props.date}</div>
        </a>
      </div>
    </Fade>
  )
};

export default Article;