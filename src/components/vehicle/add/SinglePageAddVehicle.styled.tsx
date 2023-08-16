import { Col } from 'react-bootstrap';
import { styled } from 'styled-components';

export const FlexContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const LeftCol = styled(Col)`
    display: flex;
    justify-content: flex-start;
`;

export const RightCol = styled(Col)`
    display: flex;
    justify-content: flex-end;
    `;