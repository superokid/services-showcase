import React from 'react';
import { useQuery } from 'react-query';
import axios from '../api/axiosConfig';

interface Props {}

const getRoom = async () => {
  const { data } = await axios(`/v1/canvas/room`, { responseType: 'blob' });
  return data;
};

const GameDisplay = (props: Props) => {
  const { data, isLoading } = useQuery('getRoom', () => getRoom(), {
    retry: false,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return null;
  }
  console.log(data);
  return (
    <div>
      <img src={URL.createObjectURL(data)} alt="room" />
      {/* {data} */}
    </div>
  );
};

export default GameDisplay;
