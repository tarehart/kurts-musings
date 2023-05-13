import * as React from "react";
import PropTypes from "prop-types";
import { getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import FullWidthImage from "./FullWidthImage";

const FeatureGrid = ({ gridItems }) => (
  <div className="columns is-multiline">
    {gridItems.map((item) => {
      const imageData = getImage(item.image) || item.image;
      console.log("ImageData", imageData);
      return (
        <div key={item.text} className="column is-4">
          <section>
            <Link to={item.page}>
              <div className="has-text-centered">
                <div
                  style={{
                    display: "inline-block",
                    width: '100%',
                  }}
                >
                  <FullWidthImage img={imageData} subheading={item.text} height={200} />
                </div>
              </div>
            </Link>
          </section>
        </div>
      );
    })}
  </div>
);

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
    })
  ),
};

export default FeatureGrid;
