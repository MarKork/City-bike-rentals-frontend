import styled from '@emotion/styled'

export const Button = styled.button`
  margin-left: 5%;
  margin-right: 5%;
  width: 50px;
  height: 50px;
  border-style: none;
  background-color: white;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  margin-top: 5%;
  margin-left: 15%;
  margin-right: 15%;
  font-family: Roboto;
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 280px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

export const PageNum = styled.p`
  text-align: center;
`;
