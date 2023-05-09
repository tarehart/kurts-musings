import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'


const EssayRollTemplate = (props) => {
  
  const { edges: posts } = props.data.allMarkdownRemark;

  return (
    <div className="columns is-multiline">
      {posts &&
        posts.map(({ node: post }) => (
          <div className="is-parent column is-6" key={post.id}>
            <article
              className={`blog-list-item tile is-child box notification ${
                post.frontmatter.featuredpost ? 'is-featured' : ''
              }`}
            >
              <header>
                {post?.frontmatter?.featuredimage && (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        width:
                          post.frontmatter.featuredimage.childImageSharp
                            .gatsbyImageData.width,
                        height:
                          post.frontmatter.featuredimage.childImageSharp
                            .gatsbyImageData.height,
                      }}
                    />
                  </div>
                ) }
                <p className="post-meta">
                  <Link
                    className="title has-text-primary is-size-4"
                    to={post.excerpt ? post.fields.slug : post.frontmatter.document.publicURL}
                    >
                    {post.frontmatter.title}
                  </Link>
                  <span></span>
                  <span className="subtitle is-size-5 is-block">
                    {post.frontmatter.date}
                  </span>
                  <p>
                    {post.frontmatter.description}
                    {' '}
                    {post.frontmatter.numPages} pages.
                  </p>
                  { !post.excerpt && (
                    <Link className="button" style={{ marginRight: '0.75rem' }} to={post.frontmatter.document.publicURL}>
                      Read Document →
                    </Link>
                  )}
                  { post.frontmatter.audio && (
                    <Link className="button" to={post.frontmatter.audio.publicURL}>
                      Listen 🎧
                    </Link>
                  )}
                </p>
              </header>
              { post.excerpt && (
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button" to={post.fields.slug}>
                    Keep Reading →
                  </Link>
                </p>
                )
              }
            </article>
          </div>
        ))}
    </div>
  )
}

EssayRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default function EssayRoll() {
  return (
    <StaticQuery
      query={graphql`
        query EssayRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "essay-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  featuredpost
                  description
                  numPages
                  document {
                    publicURL
                  }
                  audio {
                    publicURL
                  }
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 120
                        quality: 100
                        layout: CONSTRAINED
                      )

                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <EssayRollTemplate data={data} count={count} />}
    />
  );
}
