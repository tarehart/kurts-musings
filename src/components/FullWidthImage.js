import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";


function ImagePart(props) {

  const {
    height = 400,
    img,
    imgPosition = "center",
  } = props;


  const gatsbyImage = img && img.childImageSharp ? img.childImageSharp.gatsbyImageData : 
    img.layout ? img : null;

  if (gatsbyImage) {
    return (
      <GatsbyImage
        image={gatsbyImage}
        objectFit={"cover"}
        objectPosition={imgPosition}
        style={{
          gridArea: "1/1",
          // You can set a maximum height for the image, if you wish.
          height: height,
        }}
        layout="fullWidth"
        // You can optionally force an aspect ratio for the generated image
        aspectratio={3 / 1}
        // This is a presentational image, so the alt should be an empty string
        alt=""
        formats={["auto", "webp", "avif"]}
      />
    );
  }

  if (img) {
    return (
      <img
        src={img}
        objectFit={"cover"}
        objectPosition={imgPosition}
        style={{
          gridArea: "1/1",
          // You can set a maximum height for the image, if you wish.
          height: height,
          width: "100%",
        }}
        // This is a presentational image, so the alt should be an empty string
        alt=""
      />
    );
  }
}


export default function FullWidthImage(props) {
  const {
    title,
    subheading,
    children,
  } = props;

  return (
    <React.Fragment>
      <div
        className="margin-top-0"
        style={{
          display: "grid",
          alignItems: "center",
        }}
      >
        <ImagePart {...props} />
        {(title || subheading) && (
          <div
            style={{
              // By using the same grid area for both, they are stacked on top of each other
              gridArea: "1/1",
              position: "relative",
              // This centers the other elements inside the hero component
              placeItems: "center",
              display: "grid",
            }}
          >
            {/* Any content here will be centered in the component */}
            {title && (
              <h1
                className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen site-title"
                style={{
                  lineHeight: "1",
                  padding: "0.25em",
                }}
              >
                {title}
              </h1>
            )}
            {subheading && (
              <h3
                className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen site-title"
                style={{
                  lineHeight: "1",
                  padding: "10px",
                  marginTop: "0.5rem",
                }}
              >
                {subheading}
              </h3>
            )}
          </div>
        )}
        {(children) && (
          <div
            style={{
              // By using the same grid area for both, they are stacked on top of each other
              gridArea: "1/1",
              position: "relative",
              // This centers the other elements inside the hero component
              placeItems: "center",
              display: "grid",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

FullWidthImage.propTypes = {
  img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  height: PropTypes.number,
  subheading: PropTypes.string,
};
