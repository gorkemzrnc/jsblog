import { Fragment, forwardRef, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronUpDownIcon, CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

type SelectVariant = 'outline' | 'filled' | 'flushed';
type SelectSize = 'sm' | 'md' | 'lg';
type SelectRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  label?: string;
  error?: string;
  helperText?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  radius?: SelectRadius;
  leftIcon?: React.ReactNode;
  fullWidth?: boolean;
  withAsterisk?: boolean;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  className?: string;
  required?: boolean;
  multiple?: boolean;
  labelProps?: React.ComponentPropsWithoutRef<'label'>;
  errorProps?: React.ComponentPropsWithoutRef<'p'>;
  helperTextProps?: React.ComponentPropsWithoutRef<'p'>;
}

const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    options,
    value,
    defaultValue,
    onChange,
    label,
    error,
    helperText,
    variant = 'outline',
    size = 'md',
    radius = 'md',
    leftIcon,
    fullWidth = false,
    withAsterisk = false,
    disabled = false,
    loading = false,
    placeholder = 'Seçim yapın...',
    className,
    multiple = false,
    labelProps,
    errorProps,
    helperTextProps,
    ...rest
  } = props;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedOptions = multiple 
    ? options.filter(opt => {
        const val = value ?? internalValue ?? [];
        return Array.isArray(val) 
          ? (val as (string | number)[]).map(String).includes(String(opt.value))
          : false;
      })
    : [options.find(opt => String(opt.value) === String(value ?? internalValue ?? ''))].filter(Boolean);

  // Stil varyasyonları
  const variants: Record<SelectVariant, string> = {
    outline: clsx(
      'bg-white border focus:border-primary-500',
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
  const sizes: Record<SelectSize, string> = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3.5 py-2.5 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  // Köşe yarıçapı stilleri
  const radii: Record<SelectRadius, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  // Ana select sınıfları
  const selectClasses = clsx(
    'relative w-full text-left transition-all duration-200',
    'text-gray-900 placeholder-gray-400',
    'focus:outline-none focus:ring-0',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    radii[radius],
    leftIcon && 'pl-10',
    fullWidth && 'w-full',
    className
  );

  return (
    <div ref={ref} className={clsx('relative', fullWidth && 'w-full')}>
      {/* Label */}
      {label && (
        <label
          {...labelProps}
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

      <Listbox
        value={value ?? internalValue}
        onChange={(val) => {
          onChange?.(val);
          setInternalValue(val);
        }}
        disabled={disabled || loading}
        multiple={multiple}
        {...rest}
      >
        {({ open }) => (
          <div className="relative">
            {/* Select button */}
            <Listbox.Button className={selectClasses}>
              {leftIcon && (
                <span className="absolute left-3.5 inset-y-0 flex items-center text-gray-400">
                  {leftIcon}
                </span>
              )}

              <span className={clsx('block truncate', !selectedOptions.length && 'text-gray-400')}>
                {selectedOptions.length 
                  ? multiple 
                    ? selectedOptions.map(opt => opt?.label).join(', ') 
                    : selectedOptions[0]?.label
                  : placeholder}
              </span>

              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                {loading ? (
                  <svg
                    className="w-5 h-5 text-gray-400 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : error ? (
                  <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <ChevronUpDownIcon
                    className={clsx(
                      'w-5 h-5 text-gray-400 transition-transform',
                      open && 'rotate-180'
                    )}
                  />
                )}
              </span>
            </Listbox.Button>

            {/* Dropdown options */}
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={({ active, selected }) =>
                      clsx(
                        'cursor-default select-none relative py-2 pl-10 pr-4',
                        active && 'bg-primary-50',
                        selected && 'bg-primary-100',
                        option.disabled
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-900 hover:bg-primary-50'
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={clsx('block truncate', selected && 'font-medium')}>
                          {option.label}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                            <CheckIcon className="w-5 h-5" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>

      {/* Helper text */}
      {helperText && !error && (
        <p
          {...helperTextProps}
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

Select.displayName = 'Select';

export default Select;