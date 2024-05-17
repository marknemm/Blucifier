import { useThemedStyles } from '@hooks/styles-hooks';
import { StyleSheet } from 'react-native';
import { StyleProps } from './props';

/**
 * Gets the styles for the `TeaserCard` component.
 *
 * @param props The component style props.
 * @returns The styles for the `TeaserCard` component.
 */
export function useStyles({
  containerStyle,
  iconStyle,
  innerStyle,
  layout,
  photoPlaceholderStyle,
  photoStyle,
  subtitleStyle,
  titleStyle,
}: StyleProps) {
  return useThemedStyles(() => ({
    cardContainer: {
      width: '100%',
      ...StyleSheet.flatten(containerStyle),
    },
    cardInner: {
      alignItems: 'center',
      flexDirection: layout || 'row',
      margin: 0,
      padding: 0,
      ...StyleSheet.flatten(innerStyle),
    },
    icon: StyleSheet.flatten(iconStyle),
    photo: StyleSheet.flatten(photoStyle),
    photoPlaceholder: {
      color: 'white',
      ...StyleSheet.flatten(photoPlaceholderStyle),
    },
    subtitle: {
      color: 'gray',
      ...StyleSheet.flatten(subtitleStyle),
    },
    textContent: {
      alignContent: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    title: {
      fontSize: 22,
      marginBottom: 5,
      textAlign: 'left',
      ...StyleSheet.flatten(titleStyle),
    },
  }), [containerStyle, iconStyle, innerStyle, layout, photoStyle, photoPlaceholderStyle, subtitleStyle, titleStyle]);
}
