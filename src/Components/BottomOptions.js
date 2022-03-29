import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import tw, {useDeviceContext} from 'twrnc';
import {BlurView} from '@react-native-community/blur';
import IconMode from 'react-native-vector-icons/Feather';
import IconSaved from 'react-native-vector-icons/FontAwesome';

const BottomOptions = props => {
  useDeviceContext(tw);
  const [dataDisplay, setDataDisplay] = useState(false);

  useEffect(() => {
    props.savedLength.length > 0 ? setDataDisplay(true) : setDataDisplay(false);
  }, [props.savedLength]);

  return (
    <View
      style={tw`z-30 self-center absolute items-center justify-around flex-row w-5/12 ${
        props.width >= 360 && props.height >= 780 && props.height >= props.width
          ? ' bottom-10 '
          : ' bottom-3 '
      }`}>
      <TouchableOpacity
        style={[tw`self-center z-20`, s.addShadow]}
        onPress={() =>
          requestAnimationFrame(() =>
            props.setMode(props.mode === 'light' ? 'dark' : 'light'),
          )
        }>
        <BlurView
          style={tw`absolute top-0 right-0 left-0 bottom-0 rounded-lg`}
          blurType={props.mode === 'dark' ? 'dark' : 'light'}
          blurAmount={6}
          reducedTransparencyFallbackColor={
            props.mode === 'dark' ? 'dark' : 'light'
          }
        />
        <View
          style={tw`py-2 px-3 flex flex-row items-center justify-center z-50`}>
          <IconMode
            name={props.mode === 'dark' ? 'sun' : 'moon'}
            size={24}
            color={props.mode === 'dark' ? '#fff' : '#000'}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[tw`self-center z-20`, s.addShadow]}
        onPress={() =>
          requestAnimationFrame(() => {
            props.setSeeSaved(!props.seeSaved);
          })
        }>
        <BlurView
          style={tw`absolute top-0 right-0 left-0 bottom-0 rounded-lg`}
          blurType={props.mode === 'dark' ? 'dark' : 'light'}
          blurAmount={6}
          reducedTransparencyFallbackColor={
            props.mode === 'dark' ? 'dark' : 'light'
          }
        />
        <View
          style={tw`py-2 px-3 flex flex-row items-center justify-center z-50`}>
          <IconSaved
            name={dataDisplay ? 'bookmark' : 'bookmark-o'}
            size={24}
            color={props.mode === 'dark' ? '#fff' : '#000'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  addShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8.5,
    elevation: 15,
  },
});

export default memo(BottomOptions);
