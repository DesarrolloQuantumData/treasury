import clsx from 'clsx'
import { forwardRef } from 'react'

export interface FieldWrapperProps {
  children: React.ReactNode
  className?: string
  label?: React.ReactNode
  labelProps?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
  labelPosition?: 'top' | 'right' | 'left'
  errorId?: string
  error?: string
  descriptionId?: string
  description?: string
}

export type FieldWrapperPassThroughProps = Pick<
  FieldWrapperProps,
  'description' | 'error' | 'label' | 'labelPosition' | 'labelProps'
>

export const FieldWrapper = forwardRef(
  (
    {
      children,
      label,
      labelPosition = 'top',
      labelProps = {},
      descriptionId,
      description,
      errorId,
      error,
      className
    }: FieldWrapperProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const { className: labelClassName } = labelProps

    return (
      <div className={className} ref={ref}>
        {label ? (
          <label
            {...labelProps}
            className={clsx(
              labelClassName,
              labelPosition === 'left' ? 'flex justify-between gap-2' : '',
              labelPosition === 'right' ? 'flex flex-row-reverse items-center gap-2' : ''
            )}
          >
            <span className={labelPosition === 'top' ? 'mb-2' : ''}>{label}</span>
            <div className='relative w-4/4'>{children}</div>
          </label>
        ) : null}

        {!label ? children : null}

        {description ? (
          <span
            className={`block mt-1 text-sm text-white ${
              labelPosition === 'left' ? 'text-right' : ''
            }`}
            id={descriptionId}
          >
            {description}
          </span>
        ) : null}

        {error ? (
          <span
            aria-live='assertive'
            className={`block text-sm text-red-500 ${labelPosition === 'left' ? 'text-right' : ''}`}
            id={errorId}
            role='alert'
          >
            {error}
          </span>
        ) : null}
      </div>
    )
  }
)

FieldWrapper.displayName = 'FieldWrapper'
