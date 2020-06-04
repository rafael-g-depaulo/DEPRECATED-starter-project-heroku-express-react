import React, { Suspense } from 'react'

import Loading from 'Components/Loading'

export const AsyncComponent = ({
  children,
  component,
  ...props
}) => {
  return (
    <Suspense fallback={<Loading />} {...props}>
      { component ?? children ?? <div></div> }
    </Suspense>
  )
}

export default AsyncComponent
