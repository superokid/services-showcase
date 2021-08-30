import React from 'react';
import { useQuery } from 'react-query';
import axios from '../api/axiosConfig';

interface Props {}

const getRoom = async () => {
  const { data } = await axios(`/v1/canvas/room`, { responseType: 'blob' });
  return data;
};

const GameDisplay = (props: Props) => {
  const { data, isLoading, error } = useQuery('getRoom', () => getRoom(), {
    retry: false,
    refetchOnWindowFocus: false,
  });
  if (isLoading || error) {
    return null;
  }
  return (
    <div>
      <img src={URL.createObjectURL(data)} alt="room" />
    </div>
  );
};

export default GameDisplay;
