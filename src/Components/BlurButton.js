import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import tw, {useDeviceContext} from 'twrnc';
import {BlurView} from '@react-native-community/blur';

const BlurButton = props => {
  useDeviceContext(tw);

  return (
    <TouchableOpacity
      style={[tw`self-center z-20 ${props.touchStyle}`, s.addShadow]}
      onPress={props.action}>
      <BlurView
        style={tw`absolute top-0 right-0 left-0 bottom-0 rounded-lg ${props.blurStyle}`}
        blurType={props.mode === 'dark' ? 'dark' : 'light'}
        blurAmount={6}
        reducedTransparencyFallbackColor={
          props.mode === 'dark' ? 'dark' : 'light'
        }
      />
      <View
        style={tw`py-2 px-2.5 flex flex-row items-center justify-center z-50 ${props.iconView}`}>
        {props.children}
      </View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  addShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8.5,
    elevation: 7,
  },
});

export default memo(BlurButton);
