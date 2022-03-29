import React, {memo, useState, useEffect} from 'react';
import {FlatList, View, ScrollView, Text} from 'react-native';
import tw, {useDeviceContext} from 'twrnc';

const SavedItems = props => {
  useDeviceContext(tw);
  const [dataDisplay, setDataDisplay] = useState(false);

  useEffect(() => {
    props.saved.length > 0 ? setDataDisplay(true) : setDataDisplay(false);
  }, [props.saved]);

  return (
    props.seeSaved && (
      <View
        style={tw`absolute bottom-0 self-center w-full h-10/12 bg-red-500 rounded-tr-lg rounded-tl-lg z-20 pt-2 ${
          props.mode === 'light' ? ' bg-white ' : ' bg-slate-800 '
        } ${
          props.toClose && props.height <= props.width
            ? ' h-9/12 bg-red-500 '
            : ' '
        } ${!props.toClose && ' h-[95%] '}`}>
        <View
          style={tw`flex flex-col items-center justify-center w-full h-full`}>
          <ScrollView>
            <Text
              style={tw`${
                props.mode === 'light' ? ' text-slate-700 ' : ' text-blue-500 '
              } font-bold text-3xl mt-2 tracking-wide items-center flex-col flex text-center`}>
              Your Saved Items
            </Text>
            <View
              style={tw`w-full h-full sm:w-10/12 flex-1 flex-col md:justify-around justify-center self-center mb-8 ${
                dataDisplay ? ' -mt-3 ' : ' mt-2'
              }`}>
              {dataDisplay ? (
                <FlatList
                  removeClippedSubviews={true}
                  initialNumToRender={4}
                  data={props.saved}
                  extraData={props.saved}
                  renderItem={props.renderIt}
                  style={tw`flex-1 px-1 md:px-2 h-full py-6`}
                />
              ) : (
                <Text
                  style={tw`text-xl text-center mt-3 ${
                    props.mode === 'light' ? ' text-black ' : ' text-white '
                  }`}>
                  No items saved yet...
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    )
  );
};

export default memo(SavedItems);
