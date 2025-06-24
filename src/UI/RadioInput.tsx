import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface IRadioInput<T extends FieldValues> {
  Id: Path<T>,
  label: string,
  register: UseFormRegister<T>,
  value: string,
}

const RadioInput = <T extends FieldValues>({ Id, register, value, label }: IRadioInput<T>) => {
  return (
    <label className="flex items-center gap-x-3 cursor-pointer">
      <div className="relative">
        <input type="radio" {...register(Id)} className="sr-only peer" value={value.toString()} />
        <div className="w-6 h-6 bg-white border-[2px] border-primary rounded-full peer-checked:border-bgRed"></div>
        <div className="absolute inset-0 hidden peer-checked:flex items-center justify-center">
          <div className="w-3 h-3 bg-bgRed rounded-full"></div>
        </div>
      </div>
      <span className="text-primary font-[4000] text-[13px] leading-[15px]">{label}</span>
    </label>
  )
}

export default RadioInput