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

export const SpinnerContainer = styled.div`
  text-align: center;
  margin-top: 20%
`;

export const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  
  & .path {
    stroke: #4dc3ff;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;