import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  addOn?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  isCurrency?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  fullWidth = true,
  className = '',
  addOn,
  prefixIcon,
  suffixIcon,
  ...props
}, ref) => {
  const inputStyles = `
    px-3 py-2 bg-white border focus:outline-none focus:ring-2
    focus:ring-primary/50 focus:border-primary
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${error ? 'border-destructive' : 'border-gray-300'} 
    ${addOn ? 'rounded-r-md' : 'rounded-md'}
    ${prefixIcon ? 'pl-10' : ''}
    ${suffixIcon ? 'pr-10' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative flex">
        {addOn && (
          <div className="inline-flex items-center px-3 bg-gray-100 border-y border-l border-gray-300 rounded-l-md text-gray-500">
            {addOn}
          </div>
        )}
        
        <div className="relative flex-grow">
          {prefixIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {prefixIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={inputStyles}
            {...props}
          />
          
          {suffixIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              {suffixIcon}
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';