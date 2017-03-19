import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { brown700, yellow900 } from 'material-ui/styles/colors';

const primary1Color = yellow900;
const accent1Color = brown700;

const myBaseTheme = getMuiTheme(lightBaseTheme);

const palette = {
  ...myBaseTheme.baseTheme.palette,
  primary1Color,
  accent1Color,
};

const theme = getMuiTheme({
  ...lightBaseTheme,
  palette,
});

console.log('muiTheme', theme);
export default theme;
