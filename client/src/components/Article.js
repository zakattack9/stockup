import React from 'react';
import Fade from 'react-reveal/Fade';
import './Article.css';

const Article = props => {
  return (
    <Fade bottom distance={'10px'} delay={props.delay} appear={true} when={props.show} mountOnEnter={props.mount}>
      <div className="Article">
        <a href={props.link} target="_blank">
          <div className="articleTitle">{props.title}</div>
          <div className="articleDate">{props.date}</div>
        </a>
      </div>
    </Fade>
  )
};

export default Article;