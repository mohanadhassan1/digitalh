import React from 'react'

interface IEmptyComponentProps {
  text: string
}

const EmptyComponent = ({
  text = 'There is no data yet'
}: IEmptyComponentProps) => {
  return (
    <div>{text}</div>
  )
}

export default EmptyComponent