import {StyleSheet} from 'react-native';
import colors from '../components/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  textInput: {
    height: 50,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighgray,
    marginBottom: 10,
    paddingHorizontal: 40,
    color: 'black',
  },
  textInputIcon: {
    position: 'absolute',
    bottom: 25,
    left: 10,
  },
  button: {
    backgroundColor: colors.purple,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '800',
  },
  leadIMG: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'SourceSansPro-Regular',
    color: 'black',
  },
  heading: {
    fontFamily: 'SourceSansPro-Bold',
    color: 'gray',
    fontSize: 30,
  },
  textLink: {
    fontFamily: 'SourceSansPro-Bold',
    color: colors.lightPurple,
  },
  shortLine: {
    borderWidth: 1,
    borderColor: colors.lighgray,
    width: '10%',
    alignSelf: 'center',
    marginVertical: 40,
  },
  longLine: {
    borderWidth: 1,
    borderColor: colors.lighgray,
    width: '100%',
    alignSelf: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  subHeading: {
    fontFamily: 'SourceSansPro-Bold',
    color: colors.lightPurple,
    fontSize: 18,
  },
  logoIMG: {
    width: '100%',
    height: '100%',
  },
  logoIMGContainer: {
    height: 30,
    width: 60,
  },
  balanceContainer: {
    height: 100,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  actionContainer: {
    height: 150,
    width: '30%',
    backgroundColor: colors.lightPurple,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
  },
  majorActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  actionImageContainer: {
    width: 60,
    height: 60,
    padding: 10,
    borderRadius: 35,
    backgroundColor: 'white',
  },
  actionImage: {
    width: '100%',
    height: '100%',
  },
  actionText: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'SourceSansPro-Bold',
  },
});

export default styles;
