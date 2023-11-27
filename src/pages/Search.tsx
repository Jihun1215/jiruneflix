import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { SearchMoviePageState, SearchTvPageState } from 'state/atoms';

import { Spinner } from 'components';

import { useQuery } from 'react-query';
import { getSerchContent, getSerchtvContent } from 'utils/api';

import { GrLinkPrevious } from 'react-icons/gr';

import { SearchMovieContent, SearchTvContent } from 'components/Content';

export const Search = () => {
  const [selectedTab, setSelectedTab] = useState<string>('movie');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const onClickGoBack = () => {
    navigate(-1);
  };

  const onClickTab = (section: string) => {
    setSelectedTab(section);
    // navigate(`/search/${section}?q=${keyword}`);
  };

  const [moviePage] = useRecoilState(SearchMoviePageState);
  const [tvPage] = useRecoilState(SearchTvPageState);

  const { data: movielist, isLoading: movieLodaing } = useQuery(['getmovieSerch', query], () => getSerchContent(moviePage, query));
  const { data: tvlist, isLoading: tvLoading } = useQuery(['gettvSerch', query], () => getSerchtvContent(tvPage, query));

  console.log(movielist?.results);
  console.log(tvlist?.results);

  const Loading = movieLodaing || tvLoading;

  if (Loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <TitleAndGoback>
        <GoBack>
          <GrLinkPrevious onClick={onClickGoBack} />
        </GoBack>
        <SearchWord>
          <Query>{query}</Query>
          <P>의 관련된 검색 결과</P>
        </SearchWord>
      </TitleAndGoback>

      <Tabnav>
        <Tab isactive={selectedTab === 'movie'} onClick={() => onClickTab('movie')}>
          영화
        </Tab>
        <Tab isactive={selectedTab === 'tv'} onClick={() => onClickTab('tv')}>
          티비
        </Tab>
      </Tabnav>

      <SearchContentArea>
        {selectedTab === 'movie' ? <SearchMovieContent data={movielist} /> : <SearchTvContent data={tvlist} />}
      </SearchContentArea>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 120px 60px;
  height: 100vh;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
  @media (max-width: 1023px) {
    padding: 100px 40px;
  }
  @media (max-width: 479px) {
    padding: 80px 20px;
  }
`;

const TitleAndGoback = styled.div`
  width: 100%;
  height: 50px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.white};
  gap: 0 10px;
  text-align: center;
`;

const GoBack = styled.div`
  width: 10%;
  height: 100%;
  ${({ theme }) => theme.BoxCenter}
  svg {
    font-size: 30px;
    color: #fff;
    cursor: pointer;
  }
`;

const SearchWord = styled.div`
  width: 90%;
  height: 100%;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  padding-right: 10%;
  gap: 0 5px;
  justify-content: center;
`;

const Query = styled.h2`
  font-size: 24px;
  font-weight: 700;
  padding-left: 50px;
`;

const P = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray};
`;

const Tabnav = styled.nav`
  width: 100%;
  height: 50px;
  ${({ theme }) => theme.BoxCenter};
`;

const Tab = styled.p<{ isactive: boolean }>`
  width: 150px;
  height: 50px;
  ${({ theme }) => theme.BoxCenter};
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 3px;
  cursor: pointer;
  transition: 0.2s;
  color: ${(props) => (props.isactive ? '#E51013' : '#FFFFFF')};
  border-bottom: ${(props) => props.isactive && '3px solid #E51013'};
`;

const SearchContentArea = styled.div`
  width: 100%;
  padding-top: 50px;
`;

// const Contents = styled.div`
//   position: relative;
//   width: 100%;
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   column-gap: 20px;
//   row-gap: 40px;
//   color: ${({ theme }) => theme.colors.white};
//   @media (max-width: 479px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
// `;

// const Content = styled.div`
//   width: 200px;
//   height: 300px;
//   border: 1px solid red;
//   ${({ theme }) => theme.FlexCol};
//   align-items: center;
//   justify-content: center;
// `;

// const Poster = styled.img`
//   width: 100%;
//   height: 200px;
// `;

// const Info = styled.div`
//   width: 100%;
//   height: 100px;
//   ${({ theme }) => theme.FlexCol};
//   align-items: center;
//   padding-top: 5px;
//   gap: 0 10px;
// `;

// const Title = styled.h2`
//   height: 30px;
//   ${({ theme }) => theme.BoxCenter};
//   font-size: 16px;
//   font-weight: 700;
//   text-align: center;
// `;

// const Date = styled.p`
//   height: 20px;
//   ${({ theme }) => theme.BoxCenter};
//   font-size: 15px;
//   font-weight: 600;
//   span {
//     color: ${({ theme }) => theme.colors.greey};
//   }
// `;

// const Vote = styled.p`
//   height: 20px;
//   ${({ theme }) => theme.BoxCenter};
//   font-size: 15px;
//   font-weight: 600;
//   span {
//     color: ${({ theme }) => theme.colors.yellow};
//   }
// `;
