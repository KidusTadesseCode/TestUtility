import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;

export const NavigationWrapper = styled.div`
  padding: ${({ addpadding }) =>
    addpadding === "true" && "0rem 0rem 4.43rem 0rem"};
`;

export const OutletRapper = styled.div`
  /* margin: 4rem 2rem; */
  margin: 6rem 0;
  /* width: 100%; */
  min-height: 100vh;
  background: none;
  box-sizing: border-box;
  /* background: linear-gradient(135deg, #6a11cb, #2575fc); */
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: flex-start; */
  /* font-family: "Arial", sans-serif; */
`;
