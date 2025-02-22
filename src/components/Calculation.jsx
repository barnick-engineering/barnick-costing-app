import { useState, useRef } from "react";
import PropTypes from "prop-types";

const InputGroup = ({ label, value, onChange, readOnly = false }) => (
  <div className="grid gap-2">
    <label className="text-sm font-medium">{label}</label>
    <input
      type="number"
      value={readOnly ? Number(value).toFixed(2) : value || ""}
      onChange={onChange}
      readOnly={readOnly}
      className={`px-3 py-2 rounded-md border ${
        readOnly ? "bg-gray-50" : "bg-white"
      }`}
      min="0"
      step="any"
    />
  </div>
);

InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

InputGroup.defaultProps = {
  readOnly: false,
  onChange: () => {},
};

export default function CostCalculator() {
  const [sheetHeight, setSheetHeight] = useState(0);
  const [sheetWidth, setSheetWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const [itemOrdered, setItemOrdered] = useState(0);
  const [printingCostPerSheet, setPrintingCostPerSheet] = useState(0);
  const [dyingCost, setDyingCost] = useState(0);
  const [additionalCost, setAdditionalCost] = useState(0);
  const [perSheetBuyingCost, setPerSheetBuyingCost] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);
  const contentRef = useRef();

  const handleFloatInput = (setter) => (e) => {
    const value = e.target.value;
    setter(value === "" ? 0 : parseFloat(value));
  };

  const itemsPerSheet =
    sheetHeight > 0 && boxHeight > 0 && sheetWidth > 0 && boxWidth > 0
      ? Math.floor((sheetHeight / boxHeight) * (sheetWidth / boxWidth))
      : 0;

  const sheetRequired =
    itemOrdered > 0 && itemsPerSheet > 0
      ? Math.ceil(itemOrdered / itemsPerSheet)
      : 0;

  const totalPrintingCost = printingCostPerSheet * sheetRequired;
  const totalSheetCost = perSheetBuyingCost * sheetRequired;
  const totalCost =
    totalPrintingCost + totalSheetCost + dyingCost + additionalCost;
  const costPerItem = itemOrdered > 0 ? totalCost / itemOrdered : 0;
  const singlePriceAfterProfit =
    costPerItem > 0 && profitPercentage > 0
      ? costPerItem + costPerItem * (profitPercentage / 100)
      : 0;
  const totalPriceAfterProfit =
    costPerItem > 0 && profitPercentage > 0
      ? totalCost + totalCost * (profitPercentage / 100)
      : 0;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6 flex justify-center items-center mx-auto">
        <h1 className="text-2xl font-bold">Printing Cost Calculator</h1>
      </div>

      <div className="space-y-6" ref={contentRef}>
        {/* Sheet Dimensions */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Sheet Dimensions</h2>
            <div className="space-y-4">
              <InputGroup
                label="Sheet Height (inch)"
                value={sheetHeight}
                onChange={handleFloatInput(setSheetHeight)}
              />
              <InputGroup
                label="Sheet Width (inch)"
                value={sheetWidth}
                onChange={handleFloatInput(setSheetWidth)}
              />
            </div>
          </div>

          {/* Item Dimensions */}
          <div className="bg-white rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Item Dimensions</h2>
            <div className="space-y-4">
              <InputGroup
                label="Item Height (inch)"
                value={boxHeight}
                onChange={handleFloatInput(setBoxHeight)}
              />
              <InputGroup
                label="Item Width (inch)"
                value={boxWidth}
                onChange={handleFloatInput(setBoxWidth)}
              />
            </div>
          </div>
        </div>

        {/* Calculations */}
        <div className="bg-white rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <InputGroup
              label="Items Per Sheet"
              value={itemsPerSheet}
              readOnly={true}
            />
            <InputGroup
              label="Total Items Ordered"
              value={itemOrdered}
              onChange={handleFloatInput(setItemOrdered)}
            />
            <InputGroup
              label="Sheets Required"
              value={sheetRequired}
              readOnly={true}
            />
            <InputGroup
              label="Printing Cost per Sheet"
              value={printingCostPerSheet}
              onChange={handleFloatInput(setPrintingCostPerSheet)}
            />
            <InputGroup
              label="Per Sheet Buying Cost"
              value={perSheetBuyingCost}
              onChange={handleFloatInput(setPerSheetBuyingCost)}
            />
            <InputGroup
              label="Total Sheet Cost"
              value={totalSheetCost}
              readOnly={true}
            />
          </div>
        </div>

        {/* Additional Costs */}
        <div className="bg-white rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">Additional Costs</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <InputGroup
              label="Dying Cost"
              value={dyingCost}
              onChange={handleFloatInput(setDyingCost)}
            />
            <InputGroup
              label="Additional Cost"
              value={additionalCost}
              onChange={handleFloatInput(setAdditionalCost)}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">Additional Costs</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <InputGroup
              label="Profit Margin"
              value={profitPercentage}
              onChange={handleFloatInput(setProfitPercentage)}
            />
          </div>
        </div>

        {/* Total Cost Summary */}
        <div className="bg-gray-50 rounded-lg border p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-lg font-semibold">Total Cost</label>
              <div className="text-3xl font-bold text-blue-600">
                BDT {totalCost.toFixed(2)}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-lg font-semibold">
                Total Cost After Profit
              </label>
              <div className="text-3xl font-bold text-blue-600">
                BDT {totalPriceAfterProfit.toFixed(2)}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-lg font-semibold">Cost Per Item</label>
              <div className="text-3xl font-bold text-green-600">
                BDT {costPerItem.toFixed(2)}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-lg font-semibold">
                Cost Per Item After Profit
              </label>
              <div className="text-3xl font-bold text-green-600">
                BDT {singlePriceAfterProfit.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
