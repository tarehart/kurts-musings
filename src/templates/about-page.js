import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from "../components/Content";
import { getImage } from "gatsby-plugin-image";

// eslint-disable-next-line
export const AboutPageTemplate = ({ title, content, contentComponent, featuredimage }) => {
  const PageContent = contentComponent || Content;
  const image = getImage(featuredimage) || featuredimage;

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <div style={{float: 'left', marginRight: '1rem', marginBottom: '1rem' }}>
                <PreviewCompatibleImage
                  imageInfo={{
                    image,
                    alt: 'Portrait of Kurt Arehart',
                    childImageSharp: featuredimage.childImageSharp,
                  }}
                />
              </div>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        featuredimage={post.frontmatter.featuredimage}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        featuredimage {
          childImageSharp {
            gatsbyImageData(
              width: 400
              quality: 100
              layout: CONSTRAINED
            )

          }
        }
      }
    }
  }
`;
