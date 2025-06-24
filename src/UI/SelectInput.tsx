import { useCallback, useEffect, useRef } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface ISelectInputsProps<T extends FieldValues> {
  label?: string,
  optional?: string,
  firstOption?: string,
  register: UseFormRegister<T>,
  errors?: FieldValues,
  options: { [key: string]: string | number }[],
  isSelectedBasedOnLabel?: boolean,
  ID: Path<T>,
  optionValue: string, // key name of the option object to be set to the value
  optionLabel: string, // key name of the option object to be used as the label of the option
  containerStyle?: string,
  selectedLabel?: string,
  onChange?: (value: string) => void
}

function SelectInput<T extends FieldValues>({
  label = '',
  optional = '',
  firstOption = '',
  errors = {},
  register,
  isSelectedBasedOnLabel = false,
  options = [],
  ID,
  optionValue = '', // key name of the option object to be set to the value
  optionLabel = '', // key name of the option object to be used as the label of the option
  containerStyle = '',
  selectedLabel = '',
  onChange,
}: ISelectInputsProps<T>) {

  const selectRef = useRef<HTMLSelectElement>(null);

  const handleChange = useCallback((value: string) => {
    onChange?.(value);
  }, [onChange]);

  useEffect(() => {
    if (!selectedLabel) return

    const found = options.find(opt => isSelectedBasedOnLabel ? opt[optionLabel] == selectedLabel : opt[optionValue] == selectedLabel);
    if (!found || !selectRef.current) return;

    if (selectRef.current.value !== String(found[optionValue])) {
      selectRef.current.value = String(found[optionValue]);
      handleChange(String(found[optionValue]));
    }
  }, [selectedLabel, options, isSelectedBasedOnLabel, optionValue, optionLabel, handleChange ]);

  const handleClear = () => {
    if (selectRef.current) {
      selectRef.current.value = '';
    }
    onChange?.('');
  };

  return (
    <div className={`${containerStyle}`}>
      <label htmlFor={String(ID)} className="block text-sm font-medium text-gray-900">
        {label} <span className='text-[10px] sm:text-[12px] font-[200] sm:font-[300] text-gray-400'>{optional}</span>
      </label>
      <div className="mt-2 relative">
        <select
          {...register(ID)}
          ref={selectRef}
          defaultValue={''}
          className="px-2 py-3 block w-full outline-none rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          onChange={(e) => onChange?.(e.target.value)}
        >
          <option value="" disabled>{firstOption}</option>
          {options?.map((option) => (
            <option key={option[optionValue]} value={option[optionValue]}>
              {option[optionLabel]}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleClear}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900"
          aria-label="Clear selection"
        >
          &times;
        </button>
        {errors[ID]?.message && <p className="text-red-500">{`*${errors[ID]?.message}`}</p>}
      </div>
    </div>
  )
}

export default SelectInput 