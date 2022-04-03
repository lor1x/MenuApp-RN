import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw, {useDeviceContext} from 'twrnc';
import {BlurView} from '@react-native-community/blur';

const OfflineStatus = props => {
  useDeviceContext(tw);

  return (
    props.toClose && (
      <TouchableOpacity
        style={tw`w-11/12 self-center border-2 z-50 rounded-lg border-opacity-30 absolute ${
          props.mode === 'light' ? ' border-gray-600 ' : ' border-slate-300 '
        } ${
          props.width >= 360 &&
          props.height >= 780 &&
          props.height >= props.width
            ? ' top-12 '
            : ' top-6 '
        }`}
        onPress={() =>
          requestAnimationFrame(() => {
            props.setToClose(false);
          })
        }>
        <BlurView
          style={tw`absolute top-0 right-0 left-0 bottom-0 rounded-md`}
          blurType={props.mode === 'dark' ? 'dark' : 'light'}
          blurAmount={6}
          reducedTransparencyFallbackColor={
            props.mode === 'dark' ? 'dark' : 'light'
          }
        />
        <View
          style={[
            tw`w-full py-3 flex flex-row items-center justify-center rounded-lg`,
          ]}>
          <Text
            style={tw` ${
              props.mode === 'light' ? ' text-zinc-800' : 'text-white'
            } font-bold text-lg text-center tracking-wider self-center`}>
            App is offline
          </Text>
        </View>
      </TouchableOpacity>
    )
  );
};

export default OfflineStatus;
