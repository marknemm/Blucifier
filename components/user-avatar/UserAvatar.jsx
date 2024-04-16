/* eslint-disable react/jsx-props-no-spreading */
import { Avatar } from '@rneui/themed';
import { User } from '@util/user';
import PropTypes from 'prop-types';
import { useStyles } from './styles';

/**
 * The UserAvatar component.
 *
 * @param {import('@rneui/base').AvatarProps & { user: User }} props The component props.
 * @returns {React.JSX.Element} The UserAvatar component.
 */
export default function UserAvatar(props)  {
  const styles = useStyles(props);
  const { containerStyle, user } = props;
  const icon = !(user?.photoURL || user?.initials)
    ? { name: 'user', type: 'font-awesome' }
    : null;

  const source = user?.photoURL
    ? { uri: user.photoURL }
    : null;

  return (
    <Avatar
      icon={icon}
      rounded
      source={source}
      title={user?.initials}
      {...props}
      containerStyle={[styles.container, containerStyle]}
    />
  );
}

UserAvatar.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  user: PropTypes.instanceOf(User),
};
