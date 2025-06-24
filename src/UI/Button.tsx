"use client"
import { cn } from '@/lib';
import React from 'react'
import Loading from "@/UI/Loading"

interface IButtonProps {
  variant?: "outline" | "default",
  className?: string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  text?: string,
  disabled?: boolean,
  icon?: React.ReactNode,
  containerStyle?: string,
  iconSeparator?: boolean | undefined
  separatorStyle?: string,
  content?: React.ReactNode,
  loading?: boolean,
  textStyle?: string,
  type: "submit" | "button"
}

const Button = ({
  variant = 'default',
  className,
  onClick,
  text,
  disabled = false,
  icon,
  containerStyle,
  iconSeparator = false,
  separatorStyle,
  content,
  loading,
  textStyle,
  type
}: IButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn('flex flex-row items-center justify-center gap-2 my-2 rounded-lg px-6 py-2 w-full shadow-sm',
        variant == 'default'
          ? `bg-bgRed text-white hover:bg-red-700`
          : `bg-white text-bgRed border border-bgRed hover:bg-bgRed hover:text-white`,
        containerStyle)}>
      {icon ?? <></>}
      {iconSeparator && <div className={cn('h-[40px] bg-black w-[1px]', variant == 'default' ? `bg-white` : `bg-primary`, separatorStyle)} />}
      {loading ? (
        <Loading />
      ) : (
        <p
          className={cn(`rounded-lg text-[12px] sm:text-[16px] font-[400] text-nowrap`, className, textStyle)}
        >
          {content ?? text}
        </p>
      )}
    </button>
  )
}

export default Button