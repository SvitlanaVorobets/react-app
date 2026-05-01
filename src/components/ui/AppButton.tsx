import { Button, type ButtonProps } from '@mui/material';

interface AppButtonProps extends ButtonProps {
  label: string;
}

export const AppButton = ({ label, variant = 'contained', ...props }: AppButtonProps) => (
  <Button variant={variant} {...props}>
    {label}
  </Button>
);
