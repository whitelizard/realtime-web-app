import React from 'react';
import Paper from 'material-ui/Paper';
import LoginForm from '../containers/LoginForm';

const paperStyle = {
  width: 304,
  padding: 10,
  margin: '30px auto',
};

export default class LoginPage extends React.PureComponent {
  render() {
    return (
      <div style={{ marginBottom: 20 }}>
        <Paper style={paperStyle} zDepth={0}>
          <LoginForm />
        </Paper>
      </div>
    );
  }
}
