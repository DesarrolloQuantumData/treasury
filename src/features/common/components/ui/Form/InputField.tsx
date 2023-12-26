import clsx from 'clsx'
import { type ForwardedRef, forwardRef, useId } from 'react'

import { inputClasses } from '@/features/common/components/ui/Form/classes'
import type { FieldWrapperPassThroughProps } from '@/features/common/components/ui/Form/FieldWrapper'
import { FieldWrapper } from '@/features/common/components/ui/Form/FieldWrapper'

export interface InputFieldProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    FieldWrapperPassThroughProps {
  wrapperClassName?: string
}

export const InputField = forwardRef(
  (
    {
      description,
      error,
      label,
      labelPosition,
      labelProps,
      className,
      wrapperClassName,
      ...restOfProps
    }: InputFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const innerId = useId()
    const id = restOfProps.id ?? innerId
    const descriptionId = `${id}-description`
    const errorId = `${id}-error`

    return (
      <FieldWrapper
        className={wrapperClassName}
        description={description}
        descriptionId={descriptionId}
        error={error}
        errorId={errorId}
        label={label}
        labelPosition={labelPosition}
        labelProps={labelProps}
      >
        <input
          aria-describedby={`${descriptionId} ${errorId}`}
          className={clsx(inputClasses, className)}
          ref={ref}
          {...restOfProps}
        />
      </FieldWrapper>
    )
  }
)

InputField.displayName = 'InputField'
