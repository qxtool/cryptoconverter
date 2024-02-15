import React, { useEffect, useRef, useState } from "react";
import Choices from "choices.js";
import { useDispatch, useSelector } from "react-redux";
import {
  ConverterSliceState,
  convertValue,
  setCurrency,
  setValue,
} from "../../redux/slices/converterSlice";
import { useDebounce } from "ahooks";
import convert from "../../utils/converter";
import { AppDispatch, RootState } from "../../redux/store";

const crypto: string[] = convert.list.crypto;
const MainInput: React.FC = () => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { value, currency } = useSelector<RootState>(
    (state) => state.converter,
  ) as ConverterSliceState;
  const [actValue, setActValue] = useState(value);

  // TODO: file
  useEffect(() => {
    if (selectRef.current !== null) {
      const choices = new Choices(selectRef.current, {
        searchEnabled: true,
        itemSelectText: "",
        allowHTML: true,
        noResultsText: "No found",
        position: "bottom",
      });
      return () => {
        choices.destroy();
      };
    }
  }, []);

  const debouncedValue = useDebounce(actValue, { wait: 500 });
  useEffect(() => {
    dispatch(setValue(debouncedValue));
    dispatch(convertValue("currency"));
  }, [debouncedValue, currency]);

  useEffect(() => {
    setActValue(value);
  }, [value]);

  return (
    <div className="main-input input">
      <div className="field">
        <input
          value={actValue}
          onChange={(e) => setActValue(e.target.value)}
          type="number"
          placeholder="0.00"
          id="main-input"
        />
      </div>
      <select
        ref={selectRef}
        onChange={(e) => dispatch(setCurrency(e.target.value))}
        className="js-choice"
      >
        {crypto.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MainInput;
