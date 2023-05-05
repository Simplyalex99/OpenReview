import { useReducer, useEffect } from 'react';
import axios from 'axios';

type RequestTypeProps = {
  MAKE_REQUEST: string;
  FINISHED_REQUEST: string;
  ERROR: string;
};

export const ACTIONS: RequestTypeProps = {
  MAKE_REQUEST: 'make-request',
  FINISHED_REQUEST: 'finished-request',
  ERROR: 'error',
};

type ActionProps = {
  type: string;
  payload: {
    data?: {};
    error?: string;
  };
};

interface StateProps {
  data?: object;
  error?: string;
  loading: boolean;
}

const reducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { data: [], loading: true };

    case ACTIONS.FINISHED_REQUEST:
      return { ...state, loading: false, data: action.payload.data };

    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }
};

export const useFetchData = (
  baseURL: string,
  endpoint: string,
  token?: string
) => {
  const [state, dispatch] = useReducer(reducer, { loading: false, data: {} });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const url = baseURL + endpoint;
    dispatch({
      type: ACTIONS.MAKE_REQUEST,
      payload: { data: [], error: undefined },
    });
    axios
      .get(url, {
        cancelToken: cancelToken.token,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: ACTIONS.FINISHED_REQUEST,
          payload: { data: res.data, error: undefined },
        });
      })

      .catch((error) => {
        if (axios.isCancel(error)) return;
        console.log(`error: ${error}`);
        dispatch({ type: ACTIONS.ERROR, payload: { data: [], error } });
      });

    return () => {
      cancelToken.cancel();
    };
  }, [endpoint]);

  return state;
};

export default useFetchData;
