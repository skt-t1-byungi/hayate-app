import * as React from 'react'

import { TextInput, type TextInputProps } from 'react-native'

import { cn } from '~/lib/utils'

const Input = React.forwardRef<TextInput, TextInputProps>(
  ({ className, placeholderClassName, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'border-border bg-card text-foreground min-h-12 flex-1 rounded-2xl border px-4 py-3 text-base',
          className
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
