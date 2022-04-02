import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import tw, {useDeviceContext} from 'twrnc';
import {useNetInfo} from '@react-native-community/netinfo';
import {MMKV} from 'react-native-mmkv';
import {useAppearanceMode} from './Services/Hooks/appearanceMode';
import BottomOptions from './Components/BottomOptions';
import Header from './Components/Header';
import OfflineStatus from './Components/OfflineStatus';
import Product from './Components/Product';
import SavedItems from './Components/SavedItems';

const storage = new MMKV();

const App = () => {
  const {height, width} = useWindowDimensions();
  useDeviceContext(tw); //For using TailwindCSS
  const [data, setData] = useState([]); //Saving api data
  const [category, setCategory] = useState(data); //Filtering displayed items by category using api data above
  const [loading, setLoading] = useState(true); //Showing sceleton loading 'animation'
  const {defaultMode, setMode} = useAppearanceMode(storage); //* Theme changing, dynamically setting device theme (light/dark)
  const netInfo = useNetInfo(); //Getting network status
  const [toClose, setToClose] = useState(!netInfo.isConnected); //Setting offline notice display status based on network status
  const [seeSaved, setSeeSaved] = useState(false); //Setting saved items display status
  const [saved, setSaved] = useState(
    storage.getString('saved') !== undefined
      ? JSON.parse(storage.getString('saved'))
      : [],
  ); //Setting saved items

  const renderItem = ({item}) => (
    <Product
      id={item.id}
      category={item.category}
      title={item.title}
      description={item.description}
      price={item.price}
      imageUrl={item.imageUrl}
      mode={defaultMode}
      styleBG={defaultMode === 'light' ? ' bg-neutral-300 ' : ' bg-slate-900 '}
      saved={saved}
      bookmark={bookmarkItem}
    />
  ); //* Used by Fatlist

  const fetchData = useCallback(async () => {
    const url = 'https://api.npoint.io/240eb541ef3c02fcd7bd';
    const localJson = storage.getString('data');
    const localData = JSON.parse(localJson);

    if (netInfo.isConnected) {
      try {
        const apiData = await fetch(url);
        const json = await apiData.json();
        if (JSON.stringify(localData) === JSON.stringify(json.products) && typeof localData !== undefined) {
              setData(localData.products);
              setCategory(localData.products);
        } else {
          storage.delete('data');
          storage.set('data', JSON.stringify(json.products));
          setData(json.products);
          setCategory(json.products);
        }
      } catch (error) {
        console.log('Failed to get data', error);
      } finally {
        setLoading(false);
      }
    } else {
        try {
          (typeof localData !== undefined || localData !== null || localData !== []) && setData(localData.products) && setCategory(localData.products);
        } catch (error) {
          console.log('Failed to load data', error);
        } finally {
          setLoading(false);
      }
    }
  }, [netInfo.isConnected]);
  useEffect(() => {
    fetchData();
  }, [netInfo.isConnected, fetchData]);

  //* Offline notice
  useEffect(() => {
    setToClose(!netInfo.isConnected);
    return;
  }, [netInfo.isConnected]);

  //* Header filtering row
  const filterItems = categories => {
    categories === 'all' ||
    typeof categories === undefined ||
    categories === null
      ? setCategory(data)
      : typeof data !== undefined &&
        setCategory(data.filter(item => item.category === categories));
  };

  //* Adding saved items to local storage, removing exisrting items and initializing saved items
  const bookmarkItem = elID => {
    if (saved !== undefined) {
      const save = saved;
      const itemIndex = save.findIndex(el => el.id === elID);
      if (itemIndex !== -1) {
        save.splice(itemIndex, 1);
        storage.set('saved', JSON.stringify(save));
        setSaved(JSON.parse(storage.getString('saved')));
        return;
      }
      save.push(data[elID]);
      storage.set('saved', JSON.stringify(save));
      setSaved(JSON.parse(storage.getString('saved')));
      return;
    }
    storage.set('saved', JSON.stringify(data[elID]));
    setSaved(storage.get('saved'));
  };

  //* Delete all saved items
  const deleteAllSaved = () => {
    storage.delete('saved');
    setSaved([]);
  };

  return (
    <SafeAreaView
      style={[
        tw`flex-1 ${
          defaultMode === 'light' ? ' bg-white ' : ' bg-slate-800 '
        } ${
          width >= 360 && height >= 780 && Platform.OS === 'ios'
            ? ' -mt-2 -mb-3 '
            : ' '
        }`,
        {width: width, height: height},
      ]}>
      <StatusBar
        networkActivityIndicatorVisible={true}
        barStyle={defaultMode === 'dark' ? 'light-content' : 'dark-content'}
      />
      {seeSaved && (
        <TouchableOpacity
          style={[
            tw`absolute bg-black opacity-70 z-10`,
            {width: width, height: height},
          ]}
          onPress={() => setSeeSaved(!seeSaved)}
        />
      )}
      <View style={tw`flex flex-col items-center justify-center w-full h-full`}>
        <ScrollView>
          <View style={tw`mb-2 p-1 ${toClose ? ' mt-20 ' : ' mt-5 '} `}>
            <Header filtering={filterItems} mode={defaultMode} />
          </View>
          <View
            style={tw`w-full h-full sm:w-10/12 flex-1 flex-col md:justify-around justify-center self-center -mt-4 mb-8`}>
            {loading ? (
              <FlatList
                data={[...Array(2)]}
                renderItem={() => (
                  <Product
                    loading={true}
                    styleBG={
                      defaultMode === 'light'
                        ? ' bg-neutral-300 '
                        : ' bg-slate-900 '
                    }
                  />
                )}
                style={tw`flex-1 px-1 md:px-2 h-full py-6`}
              />
            ) : (
              <FlatList
                removeClippedSubviews={true}
                initialNumToRender={4}
                data={category}
                extraData={data}
                renderItem={renderItem}
                style={tw`flex-1 px-1 md:px-2 h-full py-6`}
              />
            )}
          </View>
        </ScrollView>
      </View>
      <SavedItems
        seeSaved={seeSaved}
        toClose={toClose}
        width={width}
        height={height}
        renderIt={renderItem}
        saved={saved}
        deleteSaved={deleteAllSaved}
        mode={defaultMode}
      />
      {toClose && (
        <OfflineStatus
          mode={defaultMode}
          setToClose={setToClose}
          width={width}
          height={height}
          seeSaved={seeSaved}
        />
      )}
      <BottomOptions
        mode={defaultMode}
        setMode={setMode}
        width={width}
        height={height}
        setSeeSaved={setSeeSaved}
        seeSaved={seeSaved}
        savedLength={saved}
      />
    </SafeAreaView>
  );
};
export default App;
