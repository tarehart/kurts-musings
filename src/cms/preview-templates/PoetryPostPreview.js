import React from 'react'
import PropTypes from 'prop-types'
import { PoetryPostTemplate } from '../../templates/poetry-post'
import RollCard from '../../components/RollCard'

const PoetryPostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])  
  const hasBody = !!entry.getIn(['data', 'body']);
  const data = entry.getIn(['data']).toJS()
  return (
    <div>
      <RollCard
        image={data.featuredimage} 
        title={data.title} 
        description={data.description}
        date={data.data}
        document={data.document}
        audio={data.audio}
      />

      {hasBody && (
        <>
          <hr />
          <PoetryPostTemplate
            content={widgetFor('body')}
            description={entry.getIn(['data', 'description'])}
            tags={tags && tags.toJS()}
            title={entry.getIn(['data', 'title'])}
          />
        </>
      )}
      
    </div>
  )
}

PoetryPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default PoetryPostPreview
