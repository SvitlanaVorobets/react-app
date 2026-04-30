import { Avatar, type AvatarProps } from '@mui/material';

interface AppAvatarProps extends AvatarProps {
  name?: string;
}

export const AppAvatar = ({ name, src, ...props }: AppAvatarProps) => (
  <Avatar src={src} alt={name} {...props}>
    {!src && name ? name[0].toUpperCase() : null}
  </Avatar>
);
