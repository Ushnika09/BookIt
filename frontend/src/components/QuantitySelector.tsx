import React, { useState } from "react";

const QuantitySelector: React.FC<{ initial?: number; onChange?: (val: number) => void }> = ({
  initial = 1,
  onChange,
}) => {
  const [quantity, setQuantity] = useState<number>(initial);

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        const newVal = prev - 1;
        onChange?.(newVal);
        return newVal;
      });
    }
  };

  const increment = () => {
    setQuantity((prev) => {
      const newVal = prev + 1;
      onChange?.(newVal);
      return newVal;
    });
  };

  return (
    <div className="flex items-center justify-between w-full h-[20px]">
      <span className="font-inter font-normal text-[14px] text-black">Quantity</span>
      <div className="flex items-center gap-2">
        <button
          onClick={decrement}
          className="w-6 h-6 flex items-center justify-center bg-gray-300 rounded"
        >
          -
        </button>
        <span className="font-inter font-normal text-[14px] text-black w-6 text-center">
          {quantity}
        </span>
        <button
          onClick={increment}
          className="w-6 h-6 flex items-center justify-center bg-gray-300 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
