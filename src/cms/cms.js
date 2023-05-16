import CMS from 'netlify-cms-app'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import EssayPostPreview from './preview-templates/EssayPostPreview'
import StoryPostPreview from './preview-templates/StoryPostPreview'
import PoetryPostPreview from './preview-templates/PoetryPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('essays', EssayPostPreview)
CMS.registerPreviewTemplate('stories', StoryPostPreview)
CMS.registerPreviewTemplate('poetry', PoetryPostPreview)
