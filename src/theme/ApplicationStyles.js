// // @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '.';
import utils from '../utils';

const image = (width, height, resizeMode = 'contain') => {
  return {
    width: Metrics.ratio(width),
    height: Metrics.ratio(height),
    resizeMode,
  };
};

const centerAligned = () => {
  return {
    alignItems: 'center',
    justifyContent: 'center',
  };
};

const radius = (width, height, rad) => {
  return {
    width: Metrics.ratio(width),
    height: Metrics.ratio(height),
    borderRadius: Metrics.ratio(rad),
  };
};

export default {
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Metrics.baseMargin * 1.25,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    // paddingTop:20
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  flex: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },

  /* FONTS */

  /* ***************** Font Medium ********************* */
  m10Secondary: {
    fontFamily: Fonts.type.medium,
    fontSize: Metrics.generatedFontSize(10),
    color: Colors.text.secondary,
  },
  m13Primary: {
    fontFamily: Fonts.type.medium,
    fontSize: Metrics.generatedFontSize(13),
    color: Colors.text.primary,
  },
  m13Secondary: {
    fontFamily: Fonts.type.medium,
    fontSize: Metrics.generatedFontSize(13),
    color: Colors.text.secondary,
  },
  m14Quaternary: {
    fontFamily: Fonts.type.medium,
    fontSize: Metrics.generatedFontSize(14),
    color: Colors.text.quaternary,
  },
  m15Primary: {
    fontFamily: Fonts.type.medium,
    fontSize: Metrics.generatedFontSize(15),
    color: Colors.text.primary,
  },
  m17Primary: {
    fontFamily: Fonts.type.medium,
    fontSize: Metrics.generatedFontSize(17),
    color: Colors.text.primary,
  },
  m17Secondary: {
    fontFamily: Fonts.type.medium,
    fontSize: Metrics.generatedFontSize(17),
    color: Colors.text.secondary,
  },
  m17Senary: {
    fontFamily: Fonts.type.medium,
    fontSize: Metrics.generatedFontSize(17),
    color: Colors.text.senary,
  },
  m20Secondary: {
    fontFamily: Fonts.type.medium,
    fontSize: Metrics.generatedFontSize(20),
    color: Colors.text.secondary,
  },
  m20Tertiary: {
    fontFamily: Fonts.type.medium,
    fontSize: Metrics.generatedFontSize(20),
    color: Colors.text.tertiary,
  },

  /* ***************** Font Bold ********************* */

  b13Primary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(13),
    color: Colors.text.primary,
  },
  b14Secondary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(14),
    color: Colors.text.secondary,
  },
  b14Quaternary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(14),
    color: Colors.text.quaternary,
  },
  b15Primary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(15),
    color: Colors.text.primary,
  },
  b15Secondary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(15),
    color: Colors.text.secondary,
  },
  b17Primary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(17),
    color: Colors.text.primary,
  },
  b17Secondary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(17),
    color: Colors.text.secondary,
  },
  b17Senary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(17),
    color: Colors.text.senary,
  },
  b17Disable: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(17),
    color: Colors.disable,
  },
  b18Secondary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(18),
    color: Colors.text.secondary,
  },
  b20Primary: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.large,
    color: Colors.text.primary,
  },
  b20Secondary: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.large,
    color: Colors.text.secondary,
  },
  b22Primary: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.mLarge,
    color: Colors.text.primary,
  },
  b22Secondary: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.mLarge,
    color: Colors.text.secondary,
  },
  b25Primary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(25),
    color: Colors.text.primary,
  },

  b25Secondary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(25),
    color: Colors.text.secondary,
  },

  b28Secondary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(28),
    color: Colors.text.secondary,
  },

  b30Secondary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(30),
    color: Colors.text.secondary,
  },

  b40Octonary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(40),
    color: Colors.text.octonary,
  },
 
  b30Octonary: {
    fontFamily: Fonts.type.bold,
    fontSize: Metrics.generatedFontSize(30),
    color: Colors.text.octonary,
  },

  /* ***************** Font Semi bold ********************* */

  sb14Secondary: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Metrics.generatedFontSize(14),
    color: Colors.text.secondary,
  },
  sb17Secondary: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Metrics.generatedFontSize(17),
    color: Colors.text.secondary,
  },
  sb17Septenary: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Metrics.generatedFontSize(17),
    color: Colors.text.septenary,
  },
  sb17Tertiary: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Metrics.generatedFontSize(17),
    color: Colors.text.tertiary,
  },
  sb25Secondary: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Metrics.generatedFontSize(25),
    color: Colors.text.secondary,
  },

  /* ***************** Font Regular ********************* */

  re12Primary: {
    fontFamily: Fonts.type.base,
    fontSize: Metrics.generatedFontSize(12),
    color: Colors.text.primary,
  },
  re13Secondary: {
    fontFamily: Fonts.type.base,
    fontSize: Metrics.generatedFontSize(13),
    color: Colors.text.secondary,
  },
  re14Secondary: {
    fontFamily: Fonts.type.base,
    fontSize: Metrics.generatedFontSize(14),
    color: Colors.text.secondary,
  },
  re14Quaternary: {
    fontFamily: Fonts.type.base,
    fontSize: Metrics.generatedFontSize(14),
    color: Colors.text.quaternary,
  },
  re15Primary: {
    fontFamily: Fonts.type.base,
    fontSize: Metrics.generatedFontSize(15),
    color: Colors.text.primary,
  },
  re15Secondary: {
    fontFamily: Fonts.type.base,
    fontSize: Metrics.generatedFontSize(15),
    color: Colors.text.secondary,
  },
  re15Quinary: {
    fontFamily: Fonts.type.base,
    fontSize: Metrics.generatedFontSize(15),
    color: Colors.text.quinary,
  },
  re15Error: {
    fontFamily: Fonts.type.base,
    fontSize: Metrics.generatedFontSize(15),
    color: Colors.text.error,
  },
  re16Secondary: {
    fontFamily: Fonts.type.base,
    fontSize: Metrics.generatedFontSize(16),
    color: Colors.text.secondary,
  },
  re17Primary: {
    fontFamily: Fonts.type.base,
    fontSize: Metrics.generatedFontSize(17),
    color: Colors.text.primary,
  },
  re17Secondary: {
    fontFamily: Fonts.type.base,
    fontSize: Metrics.generatedFontSize(17),
    color: Colors.text.secondary,
  },

  re18Secondary: {
    fontFamily: Fonts.type.base,
    fontSize: Metrics.generatedFontSize(18),
    color: Colors.text.secondary,
  },

  re20Secondary: {
    fontFamily: Fonts.type.base,
    fontSize: Metrics.generatedFontSize(20),
    color: Colors.text.secondary,
  },

  re22Secondary: {
    fontFamily: Fonts.type.base,
    fontSize: Metrics.generatedFontSize(22),
    color: Colors.text.secondary,
  },

  /* ***************** Light Italic ********************* */

  li12Secondary: {
    fontFamily: Fonts.type.lightItalic,
    fontSize: Metrics.generatedFontSize(12),
    color: Colors.text.secondary,
  },

  /* ******************* Styles ************************ */
  shadow1: {
    shadowColor: utils.isPlatformAndroid() ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.22)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 24,
    shadowOpacity: 1,
    elevation: 15,
  },

  emptyListContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image,
  centerAligned,
  radius,
};
