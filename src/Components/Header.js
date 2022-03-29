import React, {memo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {useDeviceContext} from 'twrnc';

const Header = ({filtering, mode}) => {
  useDeviceContext(tw);
  const nav = [
    {title: 'All', place: 0},
    {title: 'Breakfast', place: 1},
    {title: 'Lunch', place: 2},
    {title: 'Dinner', place: 3},
  ];
  const [selected, setSelect] = useState(nav[0].place);

  return (
    <View style={tw`flex items-center`}>
      <Text
        style={tw`${
          mode === 'light' ? ' text-slate-700 ' : ' text-blue-500 '
        } font-bold text-5xl mt-2 tracking-wide items-center flex-col flex text-center`}>
        Our Menu
      </Text>
      <View style={tw`border m-2 w-5/12 border-yellow-500`} />
      <View style={tw`flex flex-row w-11/12 justify-around`}>
        {nav.map(el => (
          <TouchableOpacity
            key={el.place}
            onPress={() => {
              requestAnimationFrame(() => {
                setSelect(el.place);
                return filtering(nav[el.place].title.toLowerCase());
              });
            }}
            style={tw`rounded-lg px-3 mx-1 py-1 mt-3 ${
              selected === el.place
                ? mode === 'light'
                  ? ' bg-yellow-500 '
                  : ' bg-yellow-600 '
                : ' '
            }`}>
            <Text
              style={tw`${
                mode === 'light' ? ' text-slate-800 ' : ' text-white '
              } ${
                selected === el.place
                  ? ' text-white '
                  : mode === 'light'
                  ? ' text-black '
                  : ' text-white '
              }`}>
              {el.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default memo(Header);
