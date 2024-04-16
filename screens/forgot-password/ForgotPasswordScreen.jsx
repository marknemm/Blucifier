import FormError from '@components/form-error/FormError';
import Input from '@components/input/Input';
import { EMAIL_REGEX } from '@constants/regex';
import { AUTH_SIGN_IN_LAST_EMAIL_KEY } from '@constants/storage-keys';
import FormProvider from '@contexts/form/FormProvider';
import { useLSState } from '@hooks/local-storage-hooks';
import { Button, Text } from '@rneui/themed';
import { generalStyles } from '@styles/general-styles';
import { sendPasswordResetEmail } from '@util/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStyles } from './styles';

/**
 * {@link ForgotPasswordScreen} component.
 *
 * @param {Object} param0 The component properties.
 * @param {Types.Navigation.StackNavigation} param0.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The {@link ForgotPasswordScreen} component.
 */
export default function ForgotPasswordScreen({ navigation }) {
  const styles = useStyles();
  const [lastSignInEmail] = useLSState(AUTH_SIGN_IN_LAST_EMAIL_KEY, { defaultValue: '' });
  const form = useForm({
    defaultValues: {
      email: lastSignInEmail,
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState('');
  const [submitSuccessful, setSubmitSuccessful] = useState(false);

  return (
    <FormProvider
      form={form}
      safeArea
      style={generalStyles.screenContainer}
    >
      <Input
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        containerStyle={styles.formField}
        keyboardType="email-address"
        label="Email"
        name="email"
        rules={{ required: 'Email is required', pattern: EMAIL_REGEX }}
        rulesErrorMessageMap={{ pattern: 'Invalid email address' }}
        secureTextEntry={false}
        textContentType="username"
      />

      <Button
        loading={submitting}
        onPress={form.handleSubmit(async ({ email }) => {
          setSubmitErr('');
          setSubmitting(true);

          try {
            await sendPasswordResetEmail(email);
            setSubmitSuccessful(true);
          } catch (error) {
            setSubmitErr(error.message);
            setSubmitSuccessful(false);
          } finally {
            setSubmitting(false);
          }
        })}
        style={styles.submitButton}
        title={`${submitSuccessful ? 'Resend' : 'Send'} Password Reset Email`}
      />

      <Button
        disabled={submitting}
        onPress={() => navigation.navigate('Sign In')}
        style={generalStyles.horizontalGutter}
        title="Sign in"
        type="clear"
      />

      {submitSuccessful && (
        <Text style={styles.submitSuccessText}>
          Email sent - please check your inbox.
        </Text>
      )}

      <FormError errorMessage={submitErr} style={styles.formError} />
    </FormProvider>
  );
}
