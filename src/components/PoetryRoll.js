import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import RollCard from './RollCard';


const PoetryRollTemplate = (props) => {
  
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
              slug={post.fields.slug}
            />
          </div>
        ))}
    </div>
  )
}

PoetryRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default function PoetryRoll() {
  return (
    <StaticQuery
      query={graphql`
        query PoetryRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "poetry-post" } } }
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
      render={(data, count) => <PoetryRollTemplate data={data} count={count} />}
    />
  );
}
