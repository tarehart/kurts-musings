import React from 'react'
import PropTypes from 'prop-types'
import { EssayPostTemplate } from '../../templates/essay-post'
import RollCard from '../../components/RollCard'

const EssayPostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])
  const hasBody = !!entry.getIn(['data', 'body']);
  const data = entry.getIn(['data']).toJS()
  return (
    <div>
      <RollCard
        image={data.featuredimage} 
        title={data.title} 
        description={data.description}
        numPages={data.numPages}
        document={data.document}
        audio={data.audio}
        video={data.video}
        excerpt={data.body?.substring(0, 400)}
      />

      {hasBody && (
        <>
          <hr />
          <EssayPostTemplate
            content={widgetFor('body')}
            description={entry.getIn(['data', 'description'])}
            tags={tags && tags.toJS()}
            title={entry.getIn(['data', 'title'])}
            author={data.author}
            year={data.year}
          />
        </>
      )}
      
    </div>
  )
}

EssayPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default EssayPostPreview
