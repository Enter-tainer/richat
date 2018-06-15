import renderMathInElement from 'katex/dist/contrib/auto-render'
import mdui from 'mdui'
import 'katex/contrib/copy-tex/copy-tex.css'
export default function renderMath () {
  let $$ = mdui.JQ
  let all = $$('.tgt')
  renderMathInElement(all[all.length - 1], {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ]
  })
}
