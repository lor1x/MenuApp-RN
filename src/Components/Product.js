import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import tw, {useDeviceContext} from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import BlurButton from './BlurButton';

const Product = props => {
  useDeviceContext(tw);

  return (
    <View
      key={props.id}
      style={[
        tw`w-11/12 flex flex-col self-center md:flex-row rounded-lg my-3 px-4 py-3 ${props.styleBG}`,
        s.addShadow,
      ]}>
      {!props.loading && (
        <BlurButton
          touchStyle="absolute top-2 right-2"
          iconView="px-2 py-1"
          blurStyle={` opacity-75 ${
            props.mode === 'light' ? ' bg-yellow-600 ' : ' bg-slate-700 '
          }`}
          action={() =>
            requestAnimationFrame(() => {
              props.bookmark(props.id);
            })
          }>
          <Icon
            name={
              props.saved.findIndex(el => el.id === props.id) !== -1
                ? 'bookmark'
                : 'bookmark-o'
            }
            size={18}
            color={props.mode === 'dark' ? '#bcbfc5' : '#000'}
          />
        </BlurButton>
      )}
      <View style={tw`w-full md:w-1/2`}>
        {props.loading ? (
          <View style={tw`bg-neutral-400 rounded-lg w-full h-48 mb-2`} />
        ) : (
          <Image
            style={tw`h-50 w-full rounded-lg`}
            source={{uri: props.imageUrl}}
          />
        )}
      </View>
      <View
        style={tw`flex flex-col md:flex-row w-full items-center md:w-1/2 ml-1.5 p-2`}>
        {props.loading ? (
          <View style={tw`flex flex-col items-start w-full`}>
            <View
              style={tw`flex flex-row w-[96%] justify-between mb-2 mt-1 mx-1`}>
              <Text style={tw`bg-neutral-400 w-5/12 h-3 -ml-2 rounded-sm`} />
              <Text style={tw`bg-neutral-400 w-4/12 h-3 -mr-2.5 rounded-sm`} />
            </View>
            {[...Array(3)].fill(undefined).map(index => (
              <View
                key={index}
                style={tw`bg-neutral-400 w-[98%] h-3 rounded-sm my-1`}
              />
            ))}
            <View style={tw`bg-neutral-400 w-9/12 h-3 rounded-sm my-1`} />
          </View>
        ) : (
          <View style={tw`flex flex-col w-full -my-1`}>
            <View
              style={tw`flex flex-row w-full justify-between font-bold mb-1.5 mt-1`}>
              <Text
                style={tw`${props.mode === 'light' ? ' ' : ' text-white '}`}>
                {props.title}
              </Text>
              <Text
                style={tw`mr-2 md:mr-0.5 ${
                  props.mode === 'light'
                    ? ' text-yellow-600 '
                    : ' text-yellow-500 '
                }`}>
                € {props.price}
              </Text>
            </View>
            <View
              style={tw`border px-2 my-2 ml-0.5 md:ml-1 md:px-1 w-[97%] border-yellow-500`}
            />
            <Text
              style={tw`${props.mode === 'light' ? ' ' : ' text-white '} my-1`}>
              {props.description}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  addShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.27,
    shadowRadius: 9.5,
    elevation: 7,
  },
});

export default memo(Product);
