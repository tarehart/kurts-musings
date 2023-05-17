import React, { useState } from 'react'
import { Link } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage';
import FullWidthImage from './FullWidthImage';

const RollCard = (props) => {
    const { image, title, description, numPages, numWords, date, document, audio, excerpt, slug } = props;

    const [showAudio, setShowAudio] = useState(false);

    const readLink = excerpt ? slug : document ? document.publicURL : slug;
  
    return (
      <article
        className="blog-list-item tile is-child box notification"
      >
        <header>
          {image && (
            <Link
            className="title has-text-primary is-size-4"
            to={readLink}
            >
              <div>
                <FullWidthImage
                  img={image}
                  height={200}
                >
                  <h3 className='has-text-white-ter shadowed-text' style={{textAlign: 'center'}}>{title}</h3>
                </FullWidthImage>
              </div>
            </Link>
          ) }
          
        </header>
        <div className="post-meta">
          <span></span>
          <span className="subtitle is-size-5 is-block">
            {date}
          </span>
          <p>
            {description}
            {' '}
            {numPages && <>{numPages} pages.</>}
            {!numPages && numWords && <>{numWords} words.</>}
          </p>
          <div>
            { !excerpt && (
              <Link className="button" style={{ marginRight: '0.75rem' }} to={readLink}>
                Read →
              </Link>
            )}
            { audio && (
              <div className="field has-addons" style={{display: 'inline-flex'}}>
                <div className="control">
                  <button className="button" onClick={() => { setShowAudio(!showAudio) }}>
                    <span>Listen 🎧</span>
                  </button>
                </div>
                <div className="control">
                  <Link className="button" to={audio.publicURL} download={audio.base}>
                    <span>⇩</span>
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
