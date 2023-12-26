import clsx from 'clsx'
import { type ForwardedRef, forwardRef, useId } from 'react'

import { inputClasses } from '@/features/common/components/ui/Form/classes'
import type { FieldWrapperPassThroughProps } from '@/features/common/components/ui/Form/FieldWrapper'
import { FieldWrapper } from '@/features/common/components/ui/Form/FieldWrapper'

export interface TextAreaProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    FieldWrapperPassThroughProps {
  wrapperClassName?: string
}

export const TextAreaField = forwardRef(
  (
    {
      description,
      error,
      label,
      labelPosition,
      labelProps,
      className,
      wrapperClassName,
      children,
      ...restOfProps
    }: TextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
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
        <textarea
          aria-describedby={`${descriptionId} ${errorId}`}
          className={clsx(inputClasses, className)}
          ref={ref}
          {...restOfProps}
        >
          {children}
        </textarea>
      </FieldWrapper>
    )
  }
)

TextAreaField.displayName = 'TextareaField'
