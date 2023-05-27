import React from 'react'
import PropTypes from 'prop-types'
import { StoryPostTemplate } from '../../templates/story-post'
import RollCard from '../../components/RollCard'

const StoryPostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])  
  const hasBody = !!entry.getIn(['data', 'body']);
  const data = entry.getIn(['data']).toJS();

  return (
    <div>
      <RollCard
        image={data.featuredimage} 
        title={data.title} 
        description={data.description}
        numPages={data.numPages}
        document={data.document}
        audio={data.audio}
        excerpt={data.body?.substring(0, 400)}
      />

      {hasBody && (
        <>
          <hr />
          <StoryPostTemplate
            content={widgetFor('body')}
            description={entry.getIn(['data', 'description'])}
            tags={tags && tags.toJS()}
            title={entry.getIn(['data', 'title'])}
            author={data.author}
            year={data.date.getFullYear().toString()}
          />
        </>
      )}
      
    </div>
  )
}

StoryPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default StoryPostPreview
