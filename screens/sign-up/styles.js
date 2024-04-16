import { makeStyles } from '@rneui/themed';
import { horizontalGutter } from '@styles/general-styles';

/**
 * Gets the styles for the `SignUpScreen`.
 */
export const useStyles = makeStyles((theme) => ({
  formError: {
    marginTop: 10,
    textAlign: 'center',
  },
  formField: {
    marginBottom: 5,
  },
  submitButton: {
    marginBottom: 10,
    marginHorizontal: horizontalGutter,
  },
}));
