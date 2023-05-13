enum Colors {
  transparent = 'transparent',
  white = '#FFFFFF',
  black = '#000000',
  lightGrey = '#B7B7B7',
  error = '#FF0000',
}

enum Fonts {
  // Add font definitions here for all weights
  system = 'System',
}

enum Spacing {
  horizontalDefault = 20,
  verticalDefault = 25,
}

type Theme = {
  colors: typeof Colors;
  fonts: typeof Fonts;
  spacing: typeof Spacing;
};

const theme: Theme = {
  colors: Colors,
  fonts: Fonts,
  spacing: Spacing,
};

export default theme;
