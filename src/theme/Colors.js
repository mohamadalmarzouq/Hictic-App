import {Platform} from 'react-native';

const white = '#FFFFFF';
const black = '#000000';
const primary = '#FFFFFF';
const secondary = 'rgba(255, 131, 84,1)';

const transparent = 'rgba(0,0,0,0)';

const themeColors = {
  vrLine: '#d31429',
  hrLine: '#2585c8',
  buttonColor1: '#f44a5f',
  buttonColor2: '#527bbb',
  buttonColor3: '#f99e4c',
};

const accent = '#FE8153';

const background = {
  primary: '#ffffff',
  secondary: '#100142',
  tertiary: '#f5f5f5',
  quaternary: '#FFC100',
  quinary: '#9089A7',
  senary: '#FFD657',
  septenary: secondary,
  octonary: '#ECECEC',
  nonary: '#03a4ae',
  denary: '#ff1200',
};

const text = {
  primary: '#fff',
  secondary: '#100142',
  tertiary: '#CCCCCC',
  quaternary: '#7F7F7F',
  quinary: '#9089A7',
  senary: '#FFC100',
  septenary: '#f05744',
  octonary: '#3ac9c4',
  nonary: '',
  denary: '',
  error: '#ff480a',
  selectionColor: Platform.select({
    android: 'rgba(255, 131, 84,0.2)',
    ios: 'rgba(255, 131, 84,1)',
  }),
};

const gradients = {
  primaryBg: ['rgba(255, 131, 84,1)', 'rgba(239, 85, 67,1)'],
  primaryBgBorder: ['rgba(255, 176, 104,1)', 'rgba(214, 69, 64,1)'],
  googleBg: ['rgb(194, 57, 42)', 'rgb(194, 57, 42)'],
  googleBgBorder: ['rgb(221, 81, 69)', 'rgb(213, 73, 57)'],
  appleBg: ['rgb(0, 0, 0)', 'rgb(30, 30, 30)'], // Deep black to soft dark gray
  appleBgBorder: ['rgb(60, 60, 60)', 'rgb(90, 90, 90)'], // Slightly lighter border gradient
  instagramBg: ['rgb(197, 54, 164)', 'rgb(197, 54, 164)'],
  instagramBgBorder: ['rgb(216, 98, 189)', 'rgb(217, 89, 187)'],
  white: ['#fff', '#fff'],
  disableBg: ['rgba(216, 216, 216,1)', 'rgba(216, 216, 216,1)'],
  disableBgBorder: ['rgba(230, 230, 230,1)', 'rgba(202, 200, 200,1)'],
  secondaryBg: ['#100142', '#100142'],
  secondaryBorder: ['#100142', '#100142'],
  transparent: ['#00000000', '#00000000'],
};

const navbar = {
  background: background.primary,
  background2: background.quaternary,
  text: text.primary,
  iconTintPrimary: '#ffffff',
  iconTintSecondary: '#100142',
};

const borders = {
  primary: '#eaeaea',
};

// message bar colors
const error = '#ff480a';
const errorText = '#ffffff';
const success = '#00C685';
const successText = '#ffffff';
const disable = 'rgba(216, 216, 216,1)';

const toggle = {
  ios_bg: '#C0C0C0',
  track_true: '#FE8153',
  ios_track_false: '#DDDDDD',
  android_track_false: '#C0C0C0',
  android_thumb: '#ffffff',
};

campaignColor = [
  'rgba(255,193,0,1)',
  'rgba(58,201,196,1)',
  'rgba(243,66,78,1)',
  'rgba(198,70,253,1)',
  'rgba(251,131,105,1)',
];
campaignShadowColor = [
  'rgba(255,193,0,0.5)',
  'rgba(58,201,196,0.5)',
  'rgba(243,66,78,0.5)',
  'rgba(198,70,253,0.5)',
  'rgba(251,131,105,0.5)',
];

const separator = 'rgba(236, 236, 236,1)';

export default {
  white,
  black,
  primary,
  secondary,

  transparent,
  themeColors,
  background,
  navbar,
  text,
  borders,
  gradients,
  accent,

  // message bar
  error,
  errorText,
  success,
  successText,
  disable,

  toggle,
  separator,
  campaignColor,
  campaignShadowColor,
};
