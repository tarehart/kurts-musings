import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import RollCard from './RollCard'


const EssayRollTemplate = (props) => {

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
              excerpt={post.excerpt}
              slug={post.fields.slug}
            />
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
                    base
                  }
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
      render={(data, count) => <EssayRollTemplate data={data} count={count} />}
    />
  );
}
