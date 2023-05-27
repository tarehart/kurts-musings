import React from 'react'
import PropTypes from 'prop-types'
import { PoetryPostTemplate } from '../../templates/poetry-post'
import RollCard from '../../components/RollCard'

const PoetryPostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags']);
  const body = entry.getIn(['data', 'body']);
  const hasBody = !!body;
  const data = entry.getIn(['data']).toJS()
  const numWords = body ? body.trim().split(/\s+/).length - 2 : 0;
  return (
    <div>
      <RollCard
        image={data.featuredimage} 
        title={data.title} 
        description={data.description}
        document={data.document}
        audio={data.audio}
        numWords={numWords}
      />

      {hasBody && (
        <>
          <hr />
          <PoetryPostTemplate
            content={widgetFor('body')}
            description={data.description}
            tags={tags && tags.toJS()}
            title={data.title}
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
