const BLUE = '#57ABD2';
const LIGHT_BLUE = '#8CC6E0';
const LIGHTER_BLUE = '#b8dcec';
const DARK_GRAY = '#0d0d0d';
const GRAY = '#7F7F7F';
const LIGHT_GRAY = '#EAEAEA';
const PALE_GRAY = '#F2F2F2';
const BLACK = '#000000';
const LIGHT_BLACK = '#0C0C0C';
const WHITE = '#FFFFFF';
const RED = '#FF0D0D';

const theme = {
  colors: {
    text: {
      link: BLUE,
      error: RED,
    },
    border: { primary: BLUE, error: RED },
  },
  fonts: {
    sizes: {
      default: 12,
      small: 10,
    },
  },
};

const { colors, fonts } = theme;

export { theme, colors, fonts };
