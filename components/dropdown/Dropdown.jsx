import FormError from '@components/form-error/FormError';
import { useFormControl, useFormErrorMessage, useValidationRules } from '@hooks/form-hooks';
import { Text, useTheme } from '@rneui/themed';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { Dropdown as RneDropdown } from 'react-native-element-dropdown';
import { useDropdownItems } from './hooks';
import { useStyles } from './styles';

/**
 * The {@link Dropdown} component.
 *
 * @param {Types.Dropdown.DropdownProps} props The component {@link Types.Dropdown.DropdownProps properties}.
 * @returns {React.JSX.Element} The {@link Dropdown} component.
 * @throws {Error} The `name` property is required when using form controls.
 */
export default function Dropdown(props) {
  const { label, name, onBlur, onChange, placeholder } = props;

  // Derive entities related to a dropdown controlled by react-hook-form
  const control = useFormControl(props);
  const rules = useValidationRules(props, label?.toString() || placeholder);
  const errorMessage = useFormErrorMessage(rules, props);

  return control
    ? (
      <>
        <Controller
          control={control}
          name={name}
          render={({ field: { onBlur: onBlurForm, onChange: onChangeForm, value } }) => (
            <DropdownControlled
              {...props}
              onBlur={() => {
                onBlurForm();
                onBlur?.();
              }}
              onChange={(item) => {
                onChangeForm(item?.value);
                onChange?.(item?.value);
              }}
              value={value}
            />
          )}
          rules={rules}
        />

        <FormError
          {...props}
          errorMessage={errorMessage}
          style={null}
        />
      </>
    )
    : <DropdownControlled {...props} />;
}

/**
 * The {@link DropdownControlled} component.
 *
 * @param {Types.Dropdown.DropdownProps} props The component {@link Types.Dropdown.DropdownProps properties}.
 * @returns {React.JSX.Element} The {@link DropdownControlled} component.
 */
function DropdownControlled({
  containerStyle,
  data,
  includeEmptyOption,
  itemContainerStyle,
  itemTextStyle,
  label = 'label',
  labelField,
  labelStyle,
  onChange,
  placeholderStyle,
  selectedTextStyle,
  style,
  valueField = 'value',
  ...rneDropdownProps
}) {
  const styles = useStyles({
    containerStyle,
    itemContainerStyle,
    itemTextStyle,
    labelStyle,
    placeholderStyle,
    selectedTextStyle,
    style,
  });
  const { theme } = useTheme();
  const items = useDropdownItems(data, labelField, valueField, includeEmptyOption);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <RneDropdown
        activeColor={theme.colors.grey5}
        data={items}
        itemContainerStyle={styles.itemContainer}
        itemTextStyle={styles.itemText}
        labelField={labelField}
        onChange={onChange}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        style={styles.dropdown}
        valueField={valueField}
        {...rneDropdownProps}
      />
    </View>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

DropdownControlled.propTypes = {
  containerStyle: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    }),
  ])),
  includeEmptyOption: PropTypes.bool,
  itemContainerStyle: PropTypes.object,
  itemTextStyle: PropTypes.object,
  label: PropTypes.string,
  labelField: PropTypes.string,
  labelStyle: PropTypes.object,
  onChange: PropTypes.func,
  placeholderStyle: PropTypes.object,
  selectedTextStyle: PropTypes.object,
  valueField: PropTypes.string,
};
