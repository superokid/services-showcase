import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios from '../api/axiosConfig';
import './Leaderboard.css';

interface Props {}

interface Leaderboard {
  rank: number;
  score: number;
  user_id: number;
  guild_id: number;
}

const getLeaderboardApi = async (page = 0) => {
  const { data } = await axios(`/v1/leaderboard?offset=${page}`);
  return data;
};

const LeaderboardPage = (props: Props) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);

  const { isLoading, data } = useQuery(['getLeaderboard', page], () => getLeaderboardApi(), {
    retry: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 15000,
  });

  React.useEffect(() => {
    queryClient.prefetchQuery(['getLeaderboard', page + 1], () => getLeaderboardApi(page + 1));
  }, [page, queryClient]);

  return (
    <div>
      <button onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={page === 0}>
        Previous Page
      </button>
      <span>{` ${page + 1} `}</span>
      <button
        onClick={() => {
          setPage((old) => old + 1);
        }}
      >
        Next Page
      </button>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="leaderboard__list">
          {(data?.data || []).map((item: Leaderboard) => {
            return (
              <div className="leaderboard__list__item" key={item.rank}>
                <div>Rank {item.rank}</div>
                <div>Score {item.score}</div>
                <div>User_id {item.user_id}</div>
                <div>Guild_id {item.guild_id}</div>
              </div>
            );
          })}
          {JSON.stringify(data)}
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
