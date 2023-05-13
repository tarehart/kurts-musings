import React from 'react'
import { Link } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage';

const RollCard = (props) => {
    const { image, title, description, numPages, date, document, audio, excerpt, slug } = props;
  
    return (
      <article
        className="blog-list-item tile is-child box notification"
      >
        <header>
          {image && (
            <div className="featured-thumbnail">
              <PreviewCompatibleImage
                imageInfo={{
                  image,
                  alt: `featured image thumbnail for post ${title}`,
                }}
              />
            </div>
          ) }
          <p className="post-meta">
            <Link
              className="title has-text-primary is-size-4"
              to={excerpt ? slug : document.publicURL}
              >
              {title}
            </Link>
            <span></span>
            <span className="subtitle is-size-5 is-block">
              {date}
            </span>
            <p>
              {description}
              {' '}
              {numPages} pages.
            </p>
            { !excerpt && (
              <Link className="button" style={{ marginRight: '0.75rem' }} to={document.publicURL}>
                Read Document →
              </Link>
            )}
            { audio && (
              <Link className="button" to={audio.publicURL} download={audio.base}>
                Listen 🎧
              </Link>
            )}
          </p>
        </header>
        { excerpt && (
          <p>
            {excerpt}
            <br />
            <br />
            <Link className="button" to={slug}>
              Keep Reading →
            </Link>
          </p>
          )
        }
      </article>
    );
  }

  export default RollCard;