import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

export const PageContainer = styled(Container)`
    border: 1px yellow solid
`;

export const QueryContainer = styled(Row)`
    border: 1px red solid
`;

export const QueryItem = styled(Col)`
    border: 1px black solid
`;

export const ResultContainer = styled.div`
    border: 1px red solid;
    height: 100vh
`;