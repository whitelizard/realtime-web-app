import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import conf from './app-config';

const appHistory = useRouterHistory(createHistory)({
  basename: conf.basename,
});

export default appHistory;
