import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/lib/languages/haskell.js'
import 'highlight.js/styles/ocean.css'

export default function renderMarkdown (text) {
  return marked(text, {
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    },
    gfm: true,
    tables: true,
    sanitize: true
  })
}
