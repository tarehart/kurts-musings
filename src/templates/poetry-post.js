import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const PoetryPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  year,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section poetry">
      <div style={{flexGrow: 1}}></div>
      <div className="container content">
        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
          {title}
        </h1>
        { year && <h4>{year}</h4> }
        <PostContent content={content} />
        {tags && tags.length ? (
          <div style={{ marginTop: `4rem` }}>
            <h4>Tags</h4>
            <ul className="taglist">
              {tags.map((tag) => (
                <li key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div style={{flexGrow: 2}}></div>
      {/* SASS seems to be removing unused styles that it can't see in the PostContent, so trick it. */}
      <div style={{display: 'none'}}>
        <code></code>
        <pre></pre>
      </div>
    </section>
  );
};

PoetryPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  helmet: PropTypes.object,
};

const PoetryPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <PoetryPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Story">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        year={post.frontmatter.year}
      />
    </Layout>
  );
};

PoetryPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default PoetryPost;

export const pageQuery = graphql`
  query PoetryPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        year
        description
        tags
      }
    }
  }
`;
