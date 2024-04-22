import FormError from '@components/form-error/FormError';
import Form from '@components/form/Form';
import HeaderSaveButton from '@components/header-save-button/HeaderSaveButton';
import PasswordInput from '@components/password-input/PasswordInput';
import { useSubmitState } from '@hooks/form-hooks';
import { useNavigationSubmitOptions } from '@hooks/navigation-hooks';
import { updatePassword } from '@util/auth';
import { useForm } from 'react-hook-form';
import { useStyles } from './styles';

/**
 * The {@link UpdatePasswordScreen} component.
 *
 * @param {object} param0 The component properties.
 * @param {Types.Navigation.StackNavigation} param0.navigation The {@link Types.Navigation.StackNavigation navigation} object.
 * @returns {React.JSX.Element} The {@link UpdatePasswordScreen} component.
 */
export default function UpdatePasswordScreen({ navigation }) {
  const styles = useStyles();
  const form = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const { handleSubmit, submitError, submitting } = useSubmitState(form);

  const onSave = handleSubmit(async (formData) => {
    await updatePassword(formData.currentPassword, formData.newPassword);
    navigation.goBack();
  });

  // Change navigation options to accommodate a (form) submit screen
  useNavigationSubmitOptions(submitting, {
    headerRight: () => (
      <HeaderSaveButton
        disabled={!form.formState.isDirty}
        loading={submitting}
        onPress={onSave}
      />
    ),
  }, [form.formState.isDirty, onSave, submitting]);

  return (
    <Form form={form} safeArea scrollable>

      <PasswordInput
        label="Current Password"
        name="currentPassword"
        required
      />

      <PasswordInput
        label="New Password"
        name="newPassword"
        required
        textContentType="newPassword"
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        rules={{
          required: 'Confirm Password is required',
          validate: (value) => value === form.getValues().newPassword || 'Passwords must match',
        }}
        textContentType="newPassword"
      />

      <FormError errorMessage={submitError} style={styles.formError} />

    </Form>
  );
}