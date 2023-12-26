import { Switch } from '@headlessui/react'
import React from 'react'

import type { FieldWrapperPassThroughProps } from '@/features/common/components/ui/Form/FieldWrapper'
import { FieldWrapper } from '@/features/common/components/ui/Form/FieldWrapper'

interface SwitchFieldProps extends FieldWrapperPassThroughProps {
  label?: string
  checked: boolean
  onChange: (isChecked: boolean) => void
  wrapperClassName?: string
  className?: string
  labelColor?: string
  labelPosition?: 'top' | 'left' | 'right'
  fontSize?: string
}

export const SwitchField = React.forwardRef<HTMLDivElement, SwitchFieldProps>(
  (
    {
      label,
      checked,
      onChange,
      className,
      wrapperClassName,
      labelColor,
      labelPosition = 'right',
      fontSize,
      ...rest
    },
    ref
  ) => {
    const switchClassName = checked ? 'switchOnColor' : 'switchOffColor'
    const labelStyle = labelColor ? { color: labelColor } : {}

    const labelFontSizeClass = fontSize ? `text-${fontSize}` : ''

    const labelComponent = (
      <div className={`flex-grow pl-2 ${labelFontSizeClass}`} style={labelStyle}>
        {label}
      </div>
    )

    return (
      <FieldWrapper className={wrapperClassName}>
        <div className={`flex items-center ${labelPosition === 'top' ? 'flex-col' : 'flex-row'}`}>
          {labelPosition === 'left' && labelComponent}
          <div className={`flex items-center ${switchClassName}`} ref={ref}>
            <Switch
              checked={checked}
              onChange={onChange}
              {...rest}
              className={`${className} transition-colors duration-200 ease-in-out relative inline-flex items-center h-6 w-11 rounded-full border-0`}
            >
              <span
                className={`${
                  checked ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform rounded-full bg-primarySwitch`}
              />
            </Switch>
          </div>
          {(labelPosition === 'right' || labelPosition === 'top') && labelComponent}
        </div>
      </FieldWrapper>
    )
  }
)

SwitchField.displayName = 'SwitchField'
