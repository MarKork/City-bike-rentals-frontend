import styled from '@emotion/styled'
import {Link} from "react-router-dom";

export const NavbarLink = styled(Link)`
  font-family: Roboto;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-right:10px;
  text-decoration:none;
  font-size: 18px;
`;

export const NavbarContainer= styled.nav`
  font-family: Roboto;
  width: auto;
  height:50px;
  padding-left:25%;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding-left:2%;
  }
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const Button = styled.button`
  font-family: Roboto;
  margin-left: 5%;
  margin-right: 5%;
  width: 50px;
  height: 50px;
  border-style: none;
  background-color: white;
`;

export const Table = styled.table`
  background-color: white;
`;

export const TBody = styled.tbody`
  background-color: white;
`;

export const Tr = styled.tr`
  background-color: white;
  padding: 10px 10px 10px 0;
`;

export const Td = styled.td`
  background-color: white;
  padding: 0px 50px 0px 0px;
  @media (max-width: 768px) {
    padding: 0px 5px 0px 0px;
  }
`;

export const Th = styled.th`
  text-align:left;
  background-color: white;
  padding: 10px 10px 10px 0;
  @media (max-width: 768px) {
    padding: 1px 1px 1px 0;
  }
`;

export const StationLink = styled(Link)`
  font-family: Roboto;
  text-decoration:none;
  color: black;
`;

export const H1 = styled.h1`
  font-family: Roboto;
  font-size: 20;
  margin-left: 25%;
  @media (max-width: 768px) {
    margin-left: 2%;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 35%;
`;

export const Container = styled.div`
  margin-top: 1%;
  margin-left: 25%;
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
  margin-top: 15%;
  margin-right: 55%
`;

export const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  
  & .path {
    stroke: #361f9c;
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