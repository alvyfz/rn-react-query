import {useMutation, useQuery} from 'react-query';
import axiosMainClient from './axiosMainClient';

/**
 * @param {string} service
 */
export function Networks(service) {
  return {
    /**
     * @param {string} endpoint Endpoint to be queried
     * @param {array} dependencies Array of dependency variables. Triggers the query everytime the dependencies change.
     * @param {import("react-query").UseQueryOptions} options
     * @param {import("axios").AxiosRequestConfig} axiosConfigs
     */
    query(
      endpoint: string,
      dependencies: [],
      options = {},
      axiosConfigs = {},
      method = 'get',
      axiosConfigsPostMethod = {},
    ) {
      const queries = useQuery(
        dependencies,
        async () => {
          const res = await axiosMainClient(service)[method](
            endpoint,
            method === 'get'
              ? {
                  ...axiosConfigs,
                }
              : axiosConfigs,
            {
              ...axiosConfigsPostMethod,
            },
          );
          return res.data;
        },
        {
          onError: err => console.log(err),
          ...options,
        },
      );

      return queries;
    },

    /**
     * @param {("post"|"put"|"delete")} method
     * @param {import("react-query").UseQueryOptions} options
     * @param {import("axios").AxiosRequestConfig} outerAxiosConfigs
     */
    mutation(method, options = {}, outerAxiosConfigs = {}) {
      const mutation = useMutation(
        async ({endpoint, data, axiosConfigs = {}}) => {
          const res = await axiosMainClient(service).request({
            method,
            url: endpoint,
            data,
            ...outerAxiosConfigs,
            ...axiosConfigs,
          });
          return res;
        },
        {
          onError: err => console.log(err),
          ...options,
        },
      );

      return mutation;
    },
  };
}
