import React, {memo, useState, useEffect} from 'react';
import {View} from 'react-native';
import tw, {useDeviceContext} from 'twrnc';
import IconMode from 'react-native-vector-icons/Feather';
import IconSaved from 'react-native-vector-icons/FontAwesome';
import BlurButton from './BlurButton';

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
      <BlurButton
        {...props}
        iconView="px-3"
        action={() =>
          requestAnimationFrame(() => {
            props.setMode(props.mode === 'light' ? 'dark' : 'light');
          })
        }>
        <IconMode
          name={props.mode === 'dark' ? 'sun' : 'moon'}
          size={24}
          color={props.mode === 'dark' ? '#fff' : '#000'}
        />
      </BlurButton>
      <BlurButton
        {...props}
        iconView="px-3.5"
        action={() =>
          requestAnimationFrame(() => {
            props.setSeeSaved(!props.seeSaved);
          })
        }>
        <IconSaved
          name={dataDisplay ? 'bookmark' : 'bookmark-o'}
          size={24}
          color={props.mode === 'dark' ? '#fff' : '#000'}
        />
      </BlurButton>
    </View>
  );
};
export default memo(BottomOptions);
