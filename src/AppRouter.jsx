import React from 'react';
import { fromJS } from 'immutable';
import { Router, Route, IndexRoute } from 'react-router';
import App from './containers/App';
import InnerApp from './containers/InnerApp';
import LoginPage from './components/LoginPage';
import IndexPage from './containers/IndexPage';
import MapPage from './containers/MapPage';
import ProfilePage from './containers/ProfilePage';
import { init } from './ducks/profile';

export const menuItems = fromJS([
  { label: 'mapOverview', link: '/overview', icon: 'map' },
  { label: 'logOut', action: 'logout', icon: 'exit_to_app' },
]);

const routeGuards = {};

routeGuards.initApp = store =>
  (nextState, replace, done) => {
    store.dispatch(init(nextState, replace, done));
  };

export default class AppRouter extends React.Component {
  static propTypes = {
    store: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
    history: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
  };

  constructor(props, c) {
    super(props, c);
    const { store } = props;
    this.initApp = routeGuards.initApp(store);
  }

  render() {
    const { history } = this.props;
    return (
      <Router history={history}>
        <Route path="/" component={App}>
          <Route component={InnerApp} onEnter={this.initApp}>
            <IndexRoute component={IndexPage} />
            <Route path="profile" component={ProfilePage} />
          </Route>
          <Route path="overview" component={MapPage} />
          <Route path="login" component={LoginPage} />
        </Route>
      </Router>
    );
  }
}
