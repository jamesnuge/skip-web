import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components'

export const SplitColumn = styled(Col)`
    padding-left: 0rem;
`;

export const SplitContainer = styled.div`
    padding-top: 0.5rem;
`;

export const TimeColumn = styled(Col)`
    border-right: 1px var(--bs-border-color-translucent) solid;
`

export const TimeRow = styled(Row)`
    padding-left: 1rem;
    &:first-of-type {
        padding-top: 1rem
    }
    &:last-of-type {
        margin-bottom: 1rem
    }
`