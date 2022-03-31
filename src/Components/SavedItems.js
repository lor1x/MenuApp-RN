import React, {memo, useState, useEffect} from 'react';
import {Alert, FlatList, View, ScrollView, Text} from 'react-native';
import tw, {useDeviceContext} from 'twrnc';
import IconDel from 'react-native-vector-icons/Ionicons';
import BlurButton from './BlurButton';

const SavedItems = props => {
  useDeviceContext(tw);
  const [dataDisplay, setDataDisplay] = useState(false);

  useEffect(() => {
    props.saved.length > 0 ? setDataDisplay(true) : setDataDisplay(false);
  }, [props.saved]);

  const deleteSavedAlert = () =>
    Alert.alert(
      'Delete all saved items',
      'This action will delete all your saved items. Do you want to continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'DO IT!',
          onPress: () => props.deleteSaved(),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );

  return (
    props.seeSaved && (
      <View
        style={tw`absolute bottom-0 self-center w-full h-10/12 bg-red-500 rounded-tr-lg rounded-tl-lg z-20 ${
          props.mode === 'light' ? ' bg-white ' : ' bg-slate-800 '
        } ${
          props.toClose && props.height <= props.width
            ? ' h-9/12 bg-red-500 '
            : ' '
        } ${!props.toClose && ' h-[95%] '}`}>
        <View
          style={tw`flex flex-col items-center justify-center w-full h-full`}>
          <ScrollView style={tw`w-full h-full`}>
            <Text
              style={tw`${
                props.mode === 'light' ? ' text-slate-700 ' : ' text-blue-500 '
              } font-bold text-2xl mt-4 tracking-wide items-center flex-col flex text-center`}>
              Your Saved Items
            </Text>
            {dataDisplay && (
              <View style={tw`flex-row right-1.5 top-4.5 absolute z-20`}>
                <BlurButton
                  {...props}
                  iconView="px-2 py-1.5"
                  blurStyle="bg-red-500 opacity-75"
                  action={() =>
                    requestAnimationFrame(() => {
                      deleteSavedAlert();
                    })
                  }>
                  <IconDel
                    name="trash-bin"
                    size={16}
                    color={props.mode === 'dark' ? '#fff' : '#000'}
                  />
                </BlurButton>
              </View>
            )}
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
