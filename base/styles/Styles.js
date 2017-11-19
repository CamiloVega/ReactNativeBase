import { StyleSheet, } from 'react-native';
export const MAIN_THEME_COLOR = '#009B6B'

const BUTTON_BG_COLOR = MAIN_THEME_COLOR
const BUTTON_TEXT_COLOR = '#FFFFFF'
const TEXT_INPUT_BG_COLOR = '#FFFFFF'
const LABEL_TEXT_COLOR = '#000000'
const SEPARATOR_COLOR = '#8E8E8E'
const CARDVIEW_BG_COLOR = '#FFFFFF'
const HEADING_LABEL_COLOR = '#000000'
const BORDER_RADIUS = 4
const APPLICATION_FONT = 'Roboto'

export const styles = StyleSheet.create({

  img_background: {
    flex: 1,
    width: null,
    height: null,
  },
  button_view_style: {
    height: 50,
    flex: 1,
    backgroundColor: BUTTON_BG_COLOR, 
    borderRadius: BORDER_RADIUS,
    margin: 10,
  }, 
  main_container: {
    flex: 1,
    paddingTop: 30,
    flexDirection: 'column',
    backgroundColor: '#2E3945'
  },
  container_general: {
    flex: 1,
    flexDirection: 'column',
  },
  container_general_center: {
    
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_general_space_between: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  list_view_separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: SEPARATOR_COLOR,
  }, 
  text_view_heading_1: {
    fontSize: 24,
    textAlign: 'center',
    color: LABEL_TEXT_COLOR,
    backgroundColor: '#00000000',
    // fontFamily: APPLICATION_FONT
  },
  text_view_heading_2: {
    fontSize: 20,
    textAlign: 'center',
    color: LABEL_TEXT_COLOR,
    backgroundColor: '#00000000',
    // fontFamily: APPLICATION_FONT
  },
  text_view_body_1: {
    fontSize: 24,
    color: LABEL_TEXT_COLOR,
    backgroundColor: '#00000000',
    fontFamily: APPLICATION_FONT 
  },
  profile_image: {
    height: 160,
    width: 160, 
    borderRadius: 80,
  }, 
  
});