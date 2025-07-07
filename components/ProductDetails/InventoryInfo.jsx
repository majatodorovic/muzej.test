const InventoryInfo = ({ displayComponent, selectedProduct, inventory }) => {
  if (!displayComponent) return <></>;

  return (
    <>
      <h2 className="mt-[1.063rem] text-[0.688rem] text-[#636363]">
        {selectedProduct ? `Status: ${inventory?.status}` : <>&nbsp;</>}
      </h2>
    </>
  );
};

export default InventoryInfo;
