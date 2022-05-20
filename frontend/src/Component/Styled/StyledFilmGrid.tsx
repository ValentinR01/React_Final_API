import styled from 'styled-components'

export const StyledFilmGrid= styled.div`
  & > div {
    margin: 0 10vw;
    width: 80vw;
    display: flex;
    flex-wrap: wrap;
    flex-gap: 10px;
    justify-content: space-between;
  }
  
  & > div > div  {
    display: block;
    max-width: 17vw;
    min-width: 150px;
    margin-bottom: 3vh;
  }

  & > div > div > a > img  {
    max-width: 20vw;
    min-width: 150px;
  }
    
`;