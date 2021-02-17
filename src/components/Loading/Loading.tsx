import React from 'react'
import { LoadingContainer, Load } from './styles'

const Loading = () => {
    return (
        <LoadingContainer>
            <Load data-testid="loading-component" />
        </LoadingContainer>
    )
}

export default Loading
