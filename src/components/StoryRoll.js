import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import RollCard from './RollCard';


const StoryRollTemplate = (props) => {
  
  const { edges: posts } = props.data.allMarkdownRemark;

  return (
    <div className="columns is-multiline">
      {posts &&
        posts.map(({ node: post }) => (
          <div className="is-parent column is-6" key={post.id}>
            <RollCard
              image={post.frontmatter.featuredimage} 
              title={post.frontmatter.title} 
              description={post.frontmatter.description}
              numPages={post.frontmatter.numPages}
              date={post.frontmatter.data}
              document={post.frontmatter.document}
              audio={post.frontmatter.audio}
              video={post.frontmatter.video}
              excerpt={post.excerpt}
              slug={post.fields.slug}
            />
          </div>
        ))}
    </div>
  )
}

StoryRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default function StoryRoll() {
  return (
    <StaticQuery
      query={graphql`
        query StoryRollQuery {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___displayOrder] }
            filter: { frontmatter: { templateKey: { eq: "story-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 250)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  description
                  numPages
                  document {
                    publicURL
                  }
                  audio {
                    publicURL
                    base
                  }
                  video
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  featuredpost
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 600
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
      render={(data, count) => <StoryRollTemplate data={data} count={count} />}
    />
  );
}
