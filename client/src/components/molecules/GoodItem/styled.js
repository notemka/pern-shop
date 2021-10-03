import styled from 'styled-components';

export const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Photo = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  margin: 0;

  svg {
    max-width: 100%;
    min-width: 100%;
    height: 100%;
    padding: 40px;
    color: var(--white-color);
    background: var(--image-color);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Description = styled.div`
  position: relative;
  padding: 20px 15px;
`;

export const Text = styled.div`
  position: relative;
  margin: 0 0 15px;
  white-space: pre-line;
  word-break: break-all;

  strong + span {
    margin-left: 10px;
  }
`;

export const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  transform: translateY(-50%);
`;
