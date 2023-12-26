import clsx from 'clsx'
import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
  to?: string
  isSelected?: boolean;
  onSelect?: any;
}

export const Card = ({ children, className, to}: CardProps) => {
  const cardContent = to ? (
    <Link className={clsx('max-w-full rounded-lg bg-primaryNotification flex justify-center items-center w-60 h-20 card selected', className)} to={to}>
      {children}
    </Link>
  ) : (
    <div className={clsx('max-w-full  rounded-lg bg-primaryNotification', className)}>
      {children}
    </div>
  )
  return cardContent
}
