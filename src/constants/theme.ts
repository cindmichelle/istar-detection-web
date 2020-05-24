const BLUE = '#57ABD2';
const LIGHT_BLUE = '#8CC6E0';
const LIGHTER_BLUE = '#b8dcec';
const DARK_GRAY = '#0d0d0d';
const GRAY = '#7F7F7F';
const LIGHT_GRAY = '#97999B';
const PALE_GRAY = '#F2F2F2';
const BLACK = '#000000';
const LIGHT_BLACK = '#0C0C0C';
const WHITE = '#FFFFFF';
const RED = '#FF0D0D';

const theme = {
  colors: {
    text: {
      primary: BLUE,
      default: LIGHT_BLACK,
      link: BLUE,
      error: RED,
      light: WHITE,
    },
    button: {
      primary: BLUE,
      secondary: LIGHT_BLUE,
      disabled: LIGHT_GRAY,
    },
    border: { primary: BLUE, error: RED },
    misc: {
      background: WHITE,
      shadow: BLACK,
      loadingIndicator: BLUE,
    },
  },
  fonts: {
    sizes: {
      default: 12,
      medium: 16,
      small: 10,
      xLarge: 20,
      header: 32,
    },
  },
};

const { colors, fonts } = theme;

export { theme, colors, fonts };
