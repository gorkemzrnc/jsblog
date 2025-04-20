import { forwardRef, useState } from 'react';
import clsx from 'clsx';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

type InputVariant = 'outline' | 'filled' | 'flushed';
type InputSize = 'sm' | 'md' | 'lg';
type InputRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

interface InputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
  size?: InputSize;
  radius?: InputRadius;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  withAsterisk?: boolean;
  labelProps?: React.ComponentPropsWithoutRef<'label'>;
  errorProps?: React.ComponentPropsWithoutRef<'p'>;
  helperTextProps?: React.ComponentPropsWithoutRef<'p'>;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    error,
    helperText,
    variant = 'outline',
    size = 'md',
    radius = 'md',
    leftIcon,
    rightIcon,
    className,
    disabled = false,
    fullWidth = false,
    withAsterisk = false,
    labelProps,
    errorProps,
    helperTextProps,
    id,
    required,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  // Stil varyasyonları
  const variants: Record<InputVariant, string> = {
    outline: clsx(
      'bg-transparent border focus:border-primary-500',
      !error && 'border-gray-300 hover:border-gray-400',
      error && 'border-red-500 focus:border-red-500'
    ),
    filled: clsx(
      'bg-gray-100 border border-transparent focus:bg-white focus:border-primary-500',
      !error && 'hover:bg-gray-200',
      error && 'bg-red-50 focus:border-red-500'
    ),
    flushed: clsx(
      'border-b bg-transparent rounded-none focus:border-primary-500',
      !error && 'border-gray-300 hover:border-gray-400',
      error && 'border-red-500 focus:border-red-500'
    ),
  };

  // Boyut stilleri
  const sizes: Record<InputSize, string> = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3.5 py-2.5 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  // Köşe yarıçapı stilleri
  const radii: Record<InputRadius, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  // Ana input sınıfları
  const inputClasses = clsx(
    'block w-full transition-all duration-200',
    'text-gray-900 placeholder-gray-400',
    'focus:outline-none focus:ring-0',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    radii[radius],
    (leftIcon && 'pl-10'),
    (rightIcon && 'pr-10'),
    className
  );

  // Wrapper sınıfları
  const wrapperClasses = clsx(
    'relative',
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed'
  );

  return (
    <div className={wrapperClasses}>
      {/* Label */}
      {label && (
        <label
          {...labelProps}
          htmlFor={id}
          className={clsx(
            'block mb-1.5 text-sm font-medium',
            error ? 'text-red-600' : 'text-gray-700',
            labelProps?.className
          )}
        >
          {label}
          {withAsterisk && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div
        className={clsx(
          'relative flex items-center',
          isFocused && 'ring-2 ring-primary-200',
          error && 'ring-2 ring-red-200',
          variant !== 'flushed' && radii[radius]
        )}
      >
        {/* Left icon */}
        {leftIcon && (
          <span className="absolute left-3.5 text-gray-400">
            {leftIcon}
          </span>
        )}

        {/* Input element */}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          className={inputClasses}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          aria-invalid={!!error}
          aria-describedby={helperText ? `${id}-help` : undefined}
          required={required}
          {...rest}
        />

        {/* Right icon */}
        {rightIcon && !error && (
          <span className="absolute right-3.5 text-gray-400">
            {rightIcon}
          </span>
        )}

        {/* Error icon */}
        {error && (
          <span className="absolute right-3.5 text-red-500">
            <ExclamationCircleIcon className="w-5 h-5" />
          </span>
        )}
      </div>

      {/* Helper text */}
      {helperText && !error && (
        <p
          {...helperTextProps}
          id={`${id}-help`}
          className={clsx(
            'mt-1.5 text-sm text-gray-500',
            helperTextProps?.className
          )}
        >
          <InformationCircleIcon className="inline w-4 h-4 mr-1 -mt-1" />
          {helperText}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p
          {...errorProps}
          className={clsx(
            'mt-1.5 text-sm text-red-600 flex items-center',
            errorProps?.className
          )}
        >
          <ExclamationCircleIcon className="w-4 h-4 mr-1.5" />
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;