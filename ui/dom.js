/** https://github.com/jxnblk/func */
const kebab = str => str.replace(/([A-Z])/g, g => '-' + g.toLowerCase())
const parseValue = prop => val => typeof val === 'number' ? addPx(prop)(val) : val
const skips = [ 'lineHeight', 'fontWeight', 'opacity', 'zIndex' ]
const addPx = prop => val => skips.includes(prop) ? val : val + 'px'

const filterNull = obj => key => obj[key] !== null
const createDec = style => key => `${kebab(key)}:${parseValue(key)(style[key])}`

const styleToString = style => Object.keys(style).filter(filterNull(style)).map(createDec(style)).join(';')
const isStyleObject = props => key => (key === 'style' && typeof props[key] === 'object')

const createStyle = props => key => isStyleObject(props)(key) ? styleToString(props[key]) : props[key]
const reduceProps = props => (a, key) => Object.assign(a, { [key]: createStyle(props)(key) })
const transformProps = props => Object.keys(props).reduce(reduceProps(props), {})

const applyProps = el => props => {
  props = transformProps(props)
  Object.keys(props).forEach(key => el.setAttribute(key, props[key]))
  return appendChildren(el)
}

const appendChildren = el => (...children) => children
  .map(c => c instanceof Element ? c : document.createTextNode(c))
  .reduce((a, c) => {
    a.appendChild(c)
    return a
  }, el)

const isProps = arg => (!(arg instanceof Element) && typeof arg === 'object')
const applyPropsOrChildren = tag => (...args) => isProps(args[0])
  ? applyProps(document.createElement(tag))(args[0])
  : appendChildren(document.createElement(tag))(...args)

/* exportables */
const tag = tag => applyPropsOrChildren(tag)
const h1  = tag('h1');
const div = tag('div');

export { tag, h1, div };
