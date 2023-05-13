enum Colors {
  transparent = 'transparent',
  red = '#FF404B',
  yellow = '#FFCD6C',
  green = '#117D56',
  error = '#FF3458',
  purple = '#B36EF1',

  backgroundGray = '#FAFAFB',
  backgroundScreen = '#F3F6F8',

  white = '#FFFFFF',
  black = '#000000',
  disabled = '#8c9097',

  bg10 = '#242430',
  bg20 = '#30303B',
  bg30 = '#484852',
  bg50 = '#A4A4A7',
  bg70 = '#C4C4C4',
  bg90 = '#FAFAFA',
  bg100 = '#FFFFFF',
  bg110 = '#EFEFEF',
  bg120 = '#E5E7EA',

  primary = '#843421',
  primary80 = '#82402f',
  primary60 = '#75473b',
  primary40 = '#7a5f59',
  primary20 = '#786c69',
  primary10 = '#858585',

  green100 = '#117D56',
  green70 = '#6FD39D',
  green40 = '#ADE6C7',
  green10 = '#EAF9F1',

  yellow100 = '#FFC227',
  yellow70 = '#FFD568',
  yellow40 = '#FFE7A8',
  yellow10 = '#FFF9E9',

  red100 = '#FF404B',
  red70 = '#FF404B',
  red40 = '#FFB3B7',
  red10 = '#FFECED',

  blue100 = '#274AFF',
  blue70 = '#6880FF',
  blue40 = '#A9B7FF',
  blue10 = '#E9EDFF',

  black100 = '#000E2A',
  black70 = '#4D566A',
  black40 = '#999FAA',
  black10 = '#E6E7EA',

  // font colours
  neutral = '#111826',
  neutral80 = '#1C2333',
  neutral70 = '#4D5566',
  neutral60 = '#666E80',
  neutral50 = '#828999',
  neutral40 = '#A1A6B3',
  neutral30 = '#BEC2CC',
  neutral20 = '#DADDE5',
  neutral10 = '#EBEDF2',
}

enum Fonts {
  // Add font definitions here for all weights
  system = 'System',
  dancingScript400 = 'DancingScript-Regular',
  dancingScript500 = 'DancingScript-Medium',
  dancingScript600 = 'DancingScript-SemiBold',
  dancingScript700 = 'DancingScript-Bold',
  poppins300 = 'Poppins-Light',
  poppins400 = 'Poppins-Regular',
  poppins500 = 'Poppins-Medium',
  poppins600 = 'Poppins-SemiBold',
  poppins700 = 'Poppins-Bold',
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
