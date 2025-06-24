'use client'
import { cn } from '@/lib'
import React, { ChangeEvent } from 'react'
import { Path, UseFormRegister, FieldValues } from 'react-hook-form';

interface ITextInputProps<TFieldValues extends FieldValues = FieldValues> {
  label?: string,
  optional?: string,
  type: 'text' | 'file' | 'text-area' | 'number' | 'email' | 'password' | 'date',
  errors?: FieldValues,
  defaultValue?: string,
  ID?: Path<TFieldValues>;
  placeholder: string,
  labelStyle?: string,
  inputStyle?: string,
  containerStyle?: string,
  errorStyle?: string,
  rows?: number,
  icon?: React.ReactNode,
  placeholderStyle?: string,
  register?: UseFormRegister<TFieldValues>,
  setFileError?: (id: Path<TFieldValues>, error: { message: string }) => void;
  setFileValue?: (id: Path<TFieldValues>, file: File | File[]) => void;
  value?: string | File | File[],
  isVideo?: boolean,
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  multiple?: boolean,
  readOnly?: boolean,
}

function TextInput<TFieldValues extends FieldValues = FieldValues>({
  label = '',
  optional = '',
  type = 'text',
  errors = {},
  defaultValue = '',
  ID,
  placeholder = '',
  labelStyle = '',
  inputStyle = '',
  containerStyle = '',
  errorStyle = '',
  rows = 5,
  icon,
  placeholderStyle = '',
  register,
  setFileValue,
  setFileError,
  value,
  isVideo,
  onChange,
  multiple = false,
  readOnly = false,
}: ITextInputProps<TFieldValues>) {

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event?.target?.files || []);

    if (files.length > 0) {
      // If only one file, send it as a File, otherwise send it as an array of Files
      const fileValue = files.length === 1 ? files[0] : files;
      setFileValue?.(ID as Path<TFieldValues>, fileValue);
      setFileError?.(ID as Path<TFieldValues>, { message: '' }); // Clear the error if files are selected
    } else {
      setFileError?.(ID as Path<TFieldValues>, { message: 'At least one file is required' }); // Trigger error if no file is selected
    }
  };

  return (
    <div className={cn('col-span-full', containerStyle)}>
      <p className={cn("block text-[13px] sm:text-[16px] font-[400] sm:font-[500] leading-[16.36px] sm:leading-[19.36px] text-primary py-2", labelStyle)}>
        {label} <span className='text-[10px] sm:text-[12px] font-[200] sm:font-[300] text-gray-400'>{optional}</span>
      </p>
      <div className="flex flex-col items-start justify-center">
        {type == 'file' ? (
          <label htmlFor={ID ?? 'file-input'} className={cn('flex flex-row gap-x-2 items-center w-full justify-start border-[2px] border-bgGray rounded-md py-3 px-4', inputStyle)}>
            <input
              type="file"
              onChange={handleFileChange}
              multiple={multiple}
              className="hidden"
              id={ID ?? 'file-input'}
              accept={isVideo ? "image/*, video/*" : "image/jpg, image/jpeg, image/png, application/pdf, image/webp"}

            // This style maybe used later (Don't remove)
            //   className="mt-1 block w-full text-sm text-gray-500
            // file:mr-4 file:py-2 file:px-4
            // file:rounded-full file:border-0
            // file:text-sm file:font-semibold
            // file:bg-blue-50 file:text-blue-700
            // hover:file:bg-blue-100"
            />
            {icon}
            <div className="cursor-pointer text:[11px] sm:text:[13px] text-primary font-[400] leading-[13px] sm:leading-[18px] border-b-[1px] border-b-primary w-auto">
              {/* {value instanceof File ? (value as File).name : placeholder} */}
              {value instanceof File ? (value as File).name : Array.isArray(value) && value.length > 0 ? value.map(file => file.name).toString() : placeholder}
            </div>
          </label>
        ) :
          type === 'text-area' ? (
            <div className='flex flex-row items-center gap-x-3 w-full'>
              <div className='absolute px-2'>
                {icon}
              </div>
              <textarea
                placeholder={placeholder}
                rows={rows}
                defaultValue={defaultValue}
                {...register?.(ID as Path<TFieldValues>)}
                className={cn("p-2 block w-full rounded-md border border-gray-600 outline-0 text-[#181A20] shadow-sm ring-gray-300 placeholder:text-[#BBBBBB] placeholder:font-[400] text-[12px] sm:text-[14px] sm:leading-[16px]", inputStyle)}
              />
            </div>
          ) : (
            <div className='flex flex-row items-center gap-x-3 w-full'>
              <div className='absolute px-2'>
                {icon}
              </div>
              <input
                placeholder={placeholder}
                type={type}
                defaultValue={defaultValue}
                step="any"
                min={type === 'number' ? "0" : undefined}
                onChange={(e) => {
                  if (type === 'number' && e.target.valueAsNumber < 0) {
                    e.target.value = "0";
                  }
                  onChange?.(e);
                }}
                {...register?.(ID as Path<TFieldValues>)}
                autoComplete={ID}
                readOnly={readOnly}
                className={cn(`px-2 py-3 block w-full focus:ring-1 focus-within:border-2 rounded-md text-black placeholder:text-[#BBBBBB] placeholder:font-[400] text-[12px] sm:text-[14px] sm:leading-[16px]
                  mt-1 border border-gray-600 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50`, inputStyle, placeholderStyle)}
              />
            </div>
          )}
        {errors[ID!]?.message && <p role='alert' className={cn('w-full px-0 mt-1 text-red-600 py-1 text-nowrap', errorStyle)}>{`*${errors[ID!]?.message}`}</p>}
      </div>
    </div>
  )
}

export default TextInput