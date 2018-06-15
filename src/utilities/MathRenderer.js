import renderMathInElement from 'katex/dist/contrib/auto-render'
import mdui from 'mdui'
import 'katex/contrib/copy-tex/copy-tex.css'
function renderMath () {
  let $$ = mdui.JQ
  let all = $$('.tgt')
  renderMathInElement(all[all.length - 1], {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ]
  })
}
function renderAllMath () {
  let $$ = mdui.JQ
  let all = $$('.tgt')
  for (let i = 0; i < all.length; ++i) {
    renderMathInElement(all[i], {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ]
    })
  }
}
export { renderAllMath, renderMath }
