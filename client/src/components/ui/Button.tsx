import { forwardRef, useState, MouseEvent } from 'react';
import clsx from 'clsx';
import IconSpinner from '../icons/IconSpinner';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger' | 'green';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  isLoading?: boolean;
  fullWidth?: boolean;
  ripple?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = 'primary',
    size = 'md',
    iconLeft,
    iconRight,
    isLoading = false,
    disabled = false,
    className,
    children,
    onClick,
    type = 'button',
    fullWidth = false,
    ripple = true,
    ...rest
  } = props;

  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -1, y: -1 });

  const handleRipple = (e: MouseEvent<HTMLButtonElement>) => {
    if (ripple && !isLoading && !disabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setTimeout(() => setCoords({ x: -1, y: -1 }), 500);
    }
  };

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    text: 'text-blue-600 hover:bg-blue-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    green: 'bg-green-600 hover:bg-green-700 text-white'
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonClasses = clsx(
    'relative overflow-hidden transition-all duration-200',
    'rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );

  return (
    <button
      ref={ref}
      type={type as ButtonType}
      disabled={disabled || isLoading}
      className={buttonClasses}
      onClick={(e) => {
        handleRipple(e);
        onClick?.(e);
      }}
      {...rest}
    >
      {ripple && (
        <span
          className="absolute bg-white/30 rounded-full scale-0 animate-ripple"
          style={{
            left: coords.x,
            top: coords.y,
            width: '10px',
            height: '10px',
          }}
        />
      )}

      <div className="flex items-center justify-center gap-2">
        {isLoading && (
          <span className="animate-spin">
            <IconSpinner className="w-5 h-5" />
          </span>
        )}

        {!isLoading && iconLeft && <span className="mr-2">{iconLeft}</span>}
        {children}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </div>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;