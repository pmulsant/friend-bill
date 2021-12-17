import { Input, InputAdornment } from "@mui/material";
import { useState } from "react";

export default function PriceInput(props) {
  const [price, setPrice] = useState(0);
  const [changed, setChanged] = useState(false);
  return (
    <Input
      error={price <= 0 && (changed || props.requestValidation)}
      className="numberInput"
      type="number"
      startAdornment={
        <InputAdornment position="start">{props.label}</InputAdornment>
      }
      value={"" + price}
      onChange={(e) => {
        setChanged(true);
        const str = e.target.value.split(",").join(".");
        const newPrice = Math.round(+str * 100, 2) / 100;
        props.onPriceChange(newPrice);
        setPrice(newPrice);
      }}
    />
  );
}
