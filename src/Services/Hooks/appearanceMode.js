import {useCallback, useEffect, useState} from 'react';
import {Appearance, useColorScheme} from 'react-native';

//* Theme changing
export const useAppearanceMode = storage => {
  const deviceTheme = useColorScheme(); //Getting device theme (light/dark)
  const [defaultMode, setMode] = useState(
    storage.getString('mode') !== undefined
      ? storage.getString('mode')
      : deviceTheme,
  );
  const themeChangeListener = useCallback(() => {
    setMode(Appearance.getColorScheme());
  }, [setMode]);
  useEffect(() => {
    Appearance.addChangeListener(themeChangeListener);
    return () => Appearance.remove(themeChangeListener);
  }, [themeChangeListener]);
  useEffect(() => {
    storage.set('mode', defaultMode);
    setMode(storage.getString('mode'));
  }, [setMode, storage, defaultMode]);
  return {defaultMode, setMode};
};
