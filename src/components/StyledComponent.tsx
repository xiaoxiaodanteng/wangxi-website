import React, { ReactNode } from 'react'
import styled from '@emotion/styled'

export const Row = ({children}: { children: ReactNode })  => {
  return (
    <div>{ children }</div>
  )
}

export const ShadowBox = styled(Row)`
  box-shadow: 10px 10px #ccc;
  min-height: 50rem;
  border-radius: .5rem;
`