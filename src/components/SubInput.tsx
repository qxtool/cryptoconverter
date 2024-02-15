import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConverterSliceState,
  setRUB,
  setUSDT,
} from "../redux/slices/converterSlice";
import { useDebounce } from "ahooks";
import { AppDispatch, RootState } from "../redux/store";

type Props = {
  icon: string;
  title: string;
};

const SubInput: React.FC<Props> = ({ icon, title }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const converter = useSelector<RootState>(
    (state) => state.converter,
  ) as ConverterSliceState;

  const debouncedValue = useDebounce(value, { wait: 500 });
  useEffect(() => {
    if (title === "USDT") {
      dispatch(setUSDT(debouncedValue));
    } else {
      dispatch(setRUB(debouncedValue));
    }
    // dispatch(convertValue(title));
  }, [debouncedValue]);

  useEffect(() => {
    if (title === "USDT") {
      setValue(converter.USDT);
    } else {
      setValue(converter.RUB);
    }
  }, [converter.RUB, converter.USDT]);

  return (
    <div className="field">
      <img className="icon" src={icon} alt={title} />
      <input
        disabled={true} // TODO: change to false and fix :)
        type="number"
        placeholder="0.00"
        className={title + "-input"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="sign">{title}</div>
    </div>
  );
};

export default SubInput;
