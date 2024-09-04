import * as Headless from '@headlessui/react'
import React from 'react'

export const Link = React.forwardRef(function Link(props, ref) {
  return (
    <Headless.DataInteractive>
       {/* eslint-disable-next-line react/jsx-no-undef */}
      {/* <NextLink {...props} ref={ref} /> */}
    </Headless.DataInteractive>
  )
})
