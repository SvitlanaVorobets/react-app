interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

export interface ProfileRowProps {
  label: string;
  value: string;
}
