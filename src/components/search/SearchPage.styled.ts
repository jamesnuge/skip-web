import { Col, Container, ListGroup, ListGroupItem, Row, Stack } from 'react-bootstrap';
import styled from 'styled-components';

export const Heading = styled.h2`
    text-align: left;
`

export const HeadingContainer = styled(Container)`
    padding-bottom: 0.5rem;
    padding-left: 2rem;
`

export const PageContainer = styled(Container)`
    padding-top: 0.5rem;
`;

export const QueryContainer = styled(Stack)`
    border-bottom: 1px solid lightgrey;
    padding: 0.5rem;
`;

export const FilterContainer = styled(Stack)`
    border-bottom: 1px solid lightgrey;
    padding: 0.5rem;
`;

export const FilterItem = styled.span``;

export const QueryItem = styled.span`
`;

export const ResultContainer = styled(Container)`
    padding-top: 1rem;
    height: 100vh
`;

export const Divider = styled.div`
    border-left: 1px solid lightgrey;
    height: 50px;
`

export const QueryResultHeader = styled.div`
    text-align: left;
    padding-bottom: 0.5rem;
`;

export const QueryResultItem = styled(ListGroup.Item)`
    // text-align: left;
`