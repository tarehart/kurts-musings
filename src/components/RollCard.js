import React, { useState } from 'react'
import { Link } from 'gatsby'
import FullWidthImage from './FullWidthImage';
import pdf from "../img/PDF_icon.svg";
import mp3 from "../img/download-mp3-icon.svg";
import vid from "../img/youtube.svg";

const ReadButton = (props) => {
  const { document, hasBody, slug } = props;

  if (document && hasBody) {
    return (
      <div className="field has-addons" style={{display: 'inline-flex'}}>
        <div className="control">
          <Link className="button" to={slug}>
            Read
          </Link>
        </div>
        <div className="control">
          <Link className="button" to={document.publicURL}>
            <span className="icon is-small subdue-saturation">
              <img src={pdf} alt="pdf" />
            </span>
          </Link>
        </div>
      </div>
    );
  }
  if (document) {
    return (
      <Link className="button" to={document.publicURL}>
        <span>Read PDF</span>
      </Link>
    );
  }
  return (
    <Link className="button" to={slug}>
      Read →
    </Link>
  );
}

const RollCard = (props) => {
    const { image, title, description, numPages, numWords, document, audio, video, excerpt, slug } = props;

    const [showAudio, setShowAudio] = useState(false);

    const hasBody = !!excerpt;
    const readLink = hasBody ? slug : document ? document.publicURL : slug;
  
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
          <p className="post-description">
            {description}
            {' '}
            {numPages ? <>{numPages} pages.</> : null}
            {(!numPages && numWords) ? <>{numWords} words.</> : null}
          </p>
          <div>
            <ReadButton document={document} hasBody={hasBody} slug={slug} />
            { audio && (
              <div className="field has-addons" style={{display: 'inline-flex', marginLeft: '0.75rem'}}>
                <div className="control">
                  <button className="button" onClick={() => { setShowAudio(!showAudio) }}>
                    <span>Listen</span>
                  </button>
                </div>
                <div className="control">
                  <Link className="button" to={audio.publicURL} download={audio.base}>
                  <span className="icon turn-blue">
                    <img src={mp3} alt="mp3" />
                  </span>
                  </Link>
                </div>
              </div>
            )}
            { video && (
              <div className="field" style={{display: 'inline-flex', marginLeft: '0.75rem'}}>
                <div className="control">
                  <Link className="button" to={video} target="_blank">
                    Watch
                    <span className="icon" style={{ marginLeft: '.75rem', marginRight: '0' }}>
                      <img src={vid} alt="video" />
                    </span>
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
      </article>
    );
  }

  export default RollCard;
