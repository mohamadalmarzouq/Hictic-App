// @flow
import {StyleSheet} from 'react-native';
import { Colors } from '../../theme';

export const HEADER_MIN_HEIGHT = 80;
export const HEADER_MAX_HEIGHT = 400;
export const SCROLL_CONTENT_MARGIN = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT * 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.background.quaternary
  },
  header: {
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    position: 'absolute',
  },
  collapsedHeader: {
    flex: 1,
    marginTop: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    top: 0,
    left: 0,
    right: 0,
    width: null,
    position: 'absolute',
  },
  vendorImage: {
    bottom: 0,
    left: 0,
    width: 65,
    height: 65,
    marginBottom: 90,
    borderRadius: 32.5,
    marginLeft: 16,
    position: 'absolute',
  },
  fixedHeader: {
    top: 0,
    left: 0,
    zIndex: 1,
    position: 'absolute',
  },
  stickyHeader: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    position: 'absolute',
  },
});
