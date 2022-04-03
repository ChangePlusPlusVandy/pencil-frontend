import React, { useState } from 'react';

const FilterInput = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div type="text" className="secondaryInput filterInput">
      Filter By School
    </div>
  );
};

export default FilterInput;
