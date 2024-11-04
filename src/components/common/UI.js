import React, {useState, Component, cloneElement} from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  Text as TextHelper,
  TextInput,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
const {width, fontScale} = Dimensions.get('window');
export const Button = props => {
  const {theme} = useSelector(state => state.theme);
  return (
    <TouchableOpacity
      style={[
        {elevation: 4},
        props.ml != undefined ? {marginLeft: props.ml} : null,
        props.mr != undefined ? {marginRight: props.mr} : null,
        props.mb != undefined ? {marginBottom: props.mb} : null,
        props.mt != undefined ? {marginTop: props.mt} : null,
        props.r != undefined ? {borderRadius: props.r} : null,
        props.width != undefined ? {width: props.width} : null,
        props.maxWidth != undefined ? {maxWidth: props.maxWidth} : null,
        props.p != undefined ? {padding: props.p} : null,
        props.pl != undefined ? {paddingLeft: props.pl} : null,
        props.pr != undefined ? {paddingRight: props.pr} : null,
        props.pb != undefined ? {paddingBottom: props.pb} : null,
        props.pt != undefined ? {paddingTop: props.pt} : null,
        props.disabled == true ? {opacity: 0.7} : null,
        props.style,
      ]}
      onPress={
        props.onPress != undefined
          ? async () => {
              props.onPress();
            }
          : null
      }
      activeOpacity={props.o != undefined ? props.o : 0.8}
      disabled={props.disabled != undefined ? props.disabled : false}>
      <LinearGradient
        start={{x: 0, y: 0}}
        locations={[0.3, 1]}
        end={{x: 1, y: 0.4}}
        colors={[theme.colors.primary, theme.colors.primary]}
        // colors={[
        //   theme.colors.primary,
        //   theme.colors.secondary,
        //   theme.colors.primary,
        // ]}
        style={styleButton.gradient}>
        {props.child}
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styleButton = StyleSheet.create({
  btn: {
    width: '100%',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    overflow: 'hidden',
    borderRadius: 50,
    padding: 0,
    paddingBottom: 15,
    paddingTop: 15,
    display: 'flex',
    alignItems: 'center',
  },
});
export const Div = props => {
  return (
    <View
      style={[
        {position: 'relative'},
        props.bg != undefined ? {backgroundColor: props.bg} : null,
        props.bw != undefined ? {borderWidth: props.bw} : null,
        props.bc != undefined ? {borderColor: props.bc} : null,
        props.br != undefined ? {borderRadius: props.br} : null,
        props.alc != undefined ? {alignItems: 'center'} : null,
        props.center != undefined ? {justifyContent: 'center'} : null,

        props.ml != undefined ? {marginLeft: props.ml} : null,
        props.mr != undefined ? {marginRight: props.mr} : null,
        props.mb != undefined ? {marginBottom: props.mb} : null,
        props.mt != undefined ? {marginTop: props.mt} : null,

        props.p != undefined ? {padding: props.p} : null,
        props.pl != undefined ? {paddingLeft: props.pl} : null,
        props.pr != undefined ? {paddingRight: props.pr} : null,
        props.pb != undefined ? {paddingBottom: props.pb} : null,
        props.pt != undefined ? {paddingTop: props.pt} : null,

        props.l != undefined ? {left: props.l} : null,
        props.r != undefined ? {right: props.r} : null,
        props.b != undefined ? {bottom: props.b} : null,
        props.t != undefined ? {top: props.t} : null,

        props.o != undefined ? {borderRadius: props.o} : null,

        props.width != undefined ? {width: props.width} : null,
        props.height != undefined ? {height: props.height} : null,

        props.maxheight != undefined ? {maxWidth: props.maxheight} : null,
        props.minheight != undefined ? {minHeight: props.minheight} : null,

        props.minwidth != undefined ? {minWidth: props.minwidth} : null,
        props.maxwidth != undefined ? {maxWidth: props.maxwidth} : null,

        props.style,
      ]}>
      {props.children}
    </View>
  );
};
export const Touch = props => {
  return (
    <TouchableOpacity
      {...props}
      onPress={props.onPress}
      style={[
        {position: 'relative'},
        props.bg != undefined ? {backgroundColor: props.bg} : null,
        props.bw != undefined ? {borderWidth: props.bw} : null,
        props.bc != undefined ? {borderColor: props.bc} : null,
        props.br != undefined ? {borderRadius: props.br} : null,
        props.center != undefined ? {justifyContent: center} : null,
        props.alc != undefined ? {alignItems: center} : null,

        props.ml != undefined ? {marginLeft: props.ml} : null,
        props.mr != undefined ? {marginRight: props.mr} : null,
        props.mb != undefined ? {marginBottom: props.mb} : null,
        props.mt != undefined ? {marginTop: props.mt} : null,

        props.p != undefined ? {padding: props.p} : null,
        props.pl != undefined ? {paddingLeft: props.pl} : null,
        props.pr != undefined ? {paddingRight: props.pr} : null,
        props.pb != undefined ? {paddingBottom: props.pb} : null,
        props.pt != undefined ? {paddingTop: props.pt} : null,

        props.l != undefined ? {left: props.l} : null,
        props.r != undefined ? {right: props.r} : null,
        props.b != undefined ? {bottom: props.b} : null,
        props.t != undefined ? {top: props.t} : null,

        props.o != undefined ? {borderRadius: props.o} : null,

        props.width != undefined ? {width: props.width} : null,
        props.height != undefined ? {height: props.height} : null,

        props.maxheight != undefined ? {maxWidth: props.maxheight} : null,
        props.minheight != undefined ? {minHeight: props.minheight} : null,

        props.minwidth != undefined ? {minWidth: props.minwidth} : null,
        props.maxwidth != undefined ? {maxWidth: props.maxwidth} : null,

        props.style,
      ]}>
      {props.children}
    </TouchableOpacity>
  );
};
export const Text = props => {
  return (
    <TextHelper
      style={[
        props.color != undefined ? {color: props.color} : '#000',
        props.bg != undefined ? {backgroundColor: props.bg} : null,
        props.size != undefined
          ? {fontSize: props.size / fontScale}
          : {fontSize: 14 / fontScale},
        {fontFamily: 'AlegreyaSans-Italic'},
        props.center != undefined ? {textAlign: 'center'} : null,
        props.right != undefined ? {textAlign: 'right'} : null,
        props.ml != undefined ? {marginLeft: props.ml} : null,
        props.mr != undefined ? {marginRight: props.mr} : null,
        props.mb != undefined ? {marginBottom: props.mb} : null,
        props.mt != undefined ? {marginTop: props.mt} : null,
        props.pl != undefined ? {paddingLeft: props.pl} : null,
        props.pr != undefined ? {paddingRight: props.pr} : null,
        props.pb != undefined ? {paddingBottom: props.pb} : null,
        props.pt != undefined ? {paddingTop: props.pt} : null,
        props.l != undefined ? {lineHeight: props.l} : null,
        props.s != undefined ? {letterSpacing: props.s} : null,
        props.width != undefined ? {width: props.width} : null,
        props.upper != undefined ? {textTransform: 'uppercase'} : null,
        props.bold != undefined ? {fontWeight: 'bold'} : null,
        {position: 'relative'},
        props.l != undefined ? {left: props.l} : null,
        props.r != undefined ? {right: props.r} : null,
        props.b != undefined ? {bottom: props.b} : null,
        props.t != undefined ? {top: props.t} : null,
        props.ul != undefined ? {textDecorationLine: 'underline'} : null,

        props.style,
      ]}
      numberOfLines={props.line != undefined ? props.line : null}>
      {props.children}
    </TextHelper>
  );
};

export const Flex = props => {
  return (
    <View
      style={[
        {width: props.size, display: 'flex', position: 'relative'},
        props.bw != undefined ? {borderWidth: props.bw} : null,
        props.bc != undefined ? {borderColor: props.bc} : null,
        props.br != undefined ? {borderRadius: props.br} : null,
        props.bg != undefined ? {backgroundColor: props.bg} : null,

        props.height != undefined ? {height: props.height} : null,

        props.column != undefined
          ? {flexDirection: 'column'}
          : {flexDirection: 'row'},
        props.middle != undefined ? {alignItems: 'center'} : '',
        props.bottom != undefined ? {alignItems: 'flex-end'} : '',
        props.baseline != undefined ? {alignItems: 'baseline'} : '',
        props.stretch != undefined ? {alignItems: 'stretch'} : '',
        props.spaceb != undefined ? {justifyContent: 'space-between'} : '',
        props.spacea != undefined ? {justifyContent: 'space-around'} : '',
        props.end != undefined ? {justifyContent: 'flex-end'} : '',
        props.center != undefined ? {justifyContent: 'center'} : '',
        props.right != undefined ? {justifyContent: 'flex-end'} : '',
        props.cover != undefined ? {minHeight: screen.h('97%')} : '',
        props.full != undefined ? {minHeight: screen.h('91%')} : '',

        props.ml != undefined ? {marginLeft: props.ml} : null,
        props.mr != undefined ? {marginRight: props.mr} : null,
        props.mb != undefined ? {marginBottom: props.mb} : null,
        props.mt != undefined ? {marginTop: props.mt} : null,

        props.l != undefined ? {left: props.l} : null,
        props.r != undefined ? {right: props.r} : null,
        props.b != undefined ? {bottom: props.b} : null,
        props.t != undefined ? {top: props.t} : null,

        props.wrap != undefined ? {flexWrap: 'wrap'} : null,

        props.width != undefined ? {width: props.width} : null,
        props.minwidth != undefined ? {minWidth: props.minwidth} : null,
        props.maxwidth != undefined
          ? {maxWidth: props.maxwidth}
          : {maxWidth: '100%'},

        {padding: 10},
        props.p != undefined ? {padding: props.p} : null,

        props.o != undefined ? {borderRadius: props.o} : null,

        props.pl != undefined ? {paddingLeft: props.pl} : null,
        props.pr != undefined ? {paddingRight: props.pr} : null,
        props.pb != undefined ? {paddingBottom: props.pb} : null,
        props.pt != undefined ? {paddingTop: props.pt} : null,

        props.style != undefined ? props.style : null,
      ]}>
      {props.children}
    </View>
  );
};

export const Container = props => {
  return (
    <View
      style={[
        {position: 'relative'},
        props.bg != undefined ? {backgroundColor: props.bg} : null,
        props.bw != undefined ? {borderWidth: props.bw} : null,
        props.bc != undefined ? {borderColor: props.bc} : null,
        props.br != undefined ? {borderRadius: props.br} : null,
        props.center != undefined ? {justifyContent: center} : null,
        props.alc != undefined ? {alignItems: center} : null,

        props.ml != undefined ? {marginLeft: 'auto'} : null,
        props.mr != undefined ? {marginRight: 'auto'} : null,
        props.mb != undefined ? {marginBottom: props.mb} : null,
        props.mt != undefined ? {marginTop: props.mt} : null,

        props.p != undefined ? {padding: props.p} : null,
        props.pl != undefined ? {paddingLeft: props.pl} : null,
        props.pr != undefined ? {paddingRight: props.pr} : null,
        props.pb != undefined ? {paddingBottom: props.pb} : null,
        props.pt != undefined ? {paddingTop: props.pt} : null,

        props.l != undefined ? {left: props.l} : null,
        props.r != undefined ? {right: props.r} : null,
        props.b != undefined ? {bottom: props.b} : null,
        props.t != undefined ? {top: props.t} : null,

        props.o != undefined ? {borderRadius: props.o} : null,

        props.width != undefined ? {width: props.width} : {width: '95%'},
        props.height != undefined ? {height: props.height} : null,

        props.maxheight != undefined ? {maxWidth: props.maxheight} : null,
        props.minheight != undefined ? {minHeight: props.minheight} : null,

        props.style,
      ]}>
      {props.children}
    </View>
  );
};
export const Gradient = props => {
  const {theme} = useSelector(state => state.theme);

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      locations={[0.3, 1, 1, 0.1]}
      end={{x: 1, y: 0.4}}
      colors={[
        theme.gradBG.dark,
        theme.gradBG.midDark,
        theme.gradBG.dark,
        theme.gradBG.midDark,
      ]}
      style={[{flex: 1}, {...props.style}]}>
      {props.children}
    </LinearGradient>
  );
};

export const GradientRed = props => {
  return (
    <LinearGradient
      start={{x: 0, y: 0.4}}
      locations={[0, 0.9]}
      end={{x: 0.8, y: 0.1}}
      colors={['red', '#fff']}
      style={[props.style]}>
      {props.children}
    </LinearGradient>
  );
};

const UI = {
  Button,
  Div,
  Text,
  Flex,
  Gradient,
  GradientRed,
  Container,
};

export default UI;
