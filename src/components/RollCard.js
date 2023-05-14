import React, { useState } from 'react'
import { Link } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage';

const RollCard = (props) => {
    const { image, title, description, numPages, date, document, audio, excerpt, slug } = props;

    const [showAudio, setShowAudio] = useState(false);
  
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
          <div className="post-meta">
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
            <div>
              { !excerpt && (
                <Link className="button" style={{ marginRight: '0.75rem' }} to={document.publicURL}>
                  Read Document →
                </Link>
              )}
              { audio && (
                <div class="field has-addons" style={{display: 'inline-flex'}}>
                  <div class="control">
                    <button className="button" onClick={() => { setShowAudio(!showAudio) }}>
                      <span>Listen 🎧</span>
                    </button>
                  </div>
                  <div class="control">
                    <Link className="button" to={audio.publicURL} download={audio.base}>
                      <span>⭳</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            { audio && (
              <audio controls style={{width: '100%', marginTop: '1rem'}} hidden={!showAudio}>
                <source src={audio.publicURL} />
              </audio>
              )}
          </div>
        </header>
        { excerpt && (
          <p style={{ marginTop: '1rem' }}>
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