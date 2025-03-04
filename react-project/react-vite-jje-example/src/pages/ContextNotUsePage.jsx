import React from 'react'

const ContextNotUsePage = ({ value }) => {
  return <GrandParent value={value} />
}

function GrandParent({ value }) {
  return <Parent value={value} />
}

function Parent({ value }) {
  return <Child value={value} />
}

function Child({ value }) {
  return <div>Received: {value}</div>
}

export default ContextNotUsePage
