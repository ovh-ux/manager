import axiosDatasouce from './axios';

const connector = axiosDatasouce();

export default connector;
export const { v6, aapi } = connector;
