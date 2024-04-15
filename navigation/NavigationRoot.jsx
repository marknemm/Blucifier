import { RootNavigationContext } from '@contexts/root-navigation/RootNavigationContext';
import { useScreenOptions } from '@hooks/navigation-hooks';
import { useUser } from '@hooks/user-hooks';
import { DarkTheme, DefaultTheme, NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import ForgotPasswordScreen from '@screens/forgot-password/ForgotPasswordScreen';
import LoginScreen from '@screens/login/LoginScreen';
import SignupScreen from '@screens/signup/SignupScreen';
import { useMemo } from 'react';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();
const bottomTabsOpts = { headerShown: false };

/**
 * The {@link NavigationRoot}.
 *
 * @returns {React.JSX.Element} The {@link NavigationRoot}.
 */
export default function NavigationRoot() {
  const user = useUser();
  const navigationRef = createNavigationContainerRef();

  return (
    <NavigationContainer theme={useNavTheme()} ref={navigationRef}>
      <RootNavigationContext.Provider value={navigationRef}>
        <Stack.Navigator screenOptions={useScreenOptions()}>
          { user?.isAuthenticated ? (
            <Stack.Screen
              name="Bottom Tabs"
              component={BottomTabs}
              options={bottomTabsOpts}
            />
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
              />
              <Stack.Screen
                name="Forgot Password"
                component={ForgotPasswordScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </RootNavigationContext.Provider>
    </NavigationContainer>
  );
}

/**
 * Uses the navigation theme.
 *
 * @returns {import('@react-navigation/native').Theme} The navigation theme.
 */
function useNavTheme() {
  const { theme } = useTheme();

  return useMemo(() => {
    const dark = theme.mode === 'dark';
    const navDefaultTheme = dark ? DarkTheme : DefaultTheme;

    return {
      dark,
      colors: {
        ...navDefaultTheme.colors,
        ...theme.colors,
        text: theme.colors.black,
      },
    };
  }, [theme]);
}