import { Container } from "react-bootstrap";
import { PageContainer, QueryContainer, QueryItem, ResultContainer } from "./SearchPage.styled";

export const SearchPage = () => {
    return <>
        <h2>Search Page</h2>
        <PageContainer>
            <QueryContainer>
                <QueryItem>Time: <input></input></QueryItem>
                <QueryItem>Humidity: <input></input></QueryItem>
                <QueryItem>Temperature: <input></input></QueryItem>
            </QueryContainer>
            <ResultContainer />
        </PageContainer>
    </>;
}

