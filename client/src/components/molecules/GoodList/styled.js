import styled, { css } from 'styled-components';

const List = styled.ul(
  ({ theme: { breakpoints } }) => css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px 30px;
    margin: 30px 0;

    @media (max-width: ${breakpoints.lg}) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: ${breakpoints.md}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${breakpoints.sm}) {
      grid-template-columns: 1fr;
      justify-content: center;
    }

    & > li {
      background: var(--second-color);
      box-shadow: 0px 1px 4px 1px var(--shadow-color);
    }
  `,
);

export default List;
