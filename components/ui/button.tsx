import * as React from 'react'

import { Pressable, type PressableProps } from 'react-native'

import * as Slot from '@rn-primitives/slot'
import { type VariantProps, cva } from 'class-variance-authority'

import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

const buttonVariants = cva(
  'items-center justify-center rounded-2xl px-4 py-3 active:opacity-90',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        secondary: 'bg-card border border-border',
        ghost: 'bg-transparent'
      },
      size: {
        default: 'min-h-12',
        sm: 'min-h-10 px-3',
        lg: 'min-h-14 px-5'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const buttonTextVariants = cva('text-sm font-semibold', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-foreground',
      ghost: 'text-foreground'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

type ButtonProps = PressableProps &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    className?: string
    textClassName?: string
  }

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      asChild = false,
      children,
      className,
      size,
      textClassName,
      variant,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.Pressable : Pressable

    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ size, variant }), className)}
        {...props}
      >
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text className={cn(buttonTextVariants({ variant }), textClassName)}>
            {children}
          </Text>
        ) : (
          children
        )}
      </Component>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
