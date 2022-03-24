import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CgTrash } from 'react-icons/cg';
import { getMasterInv } from './api-inventory';
import './MasterInventory.css';
import EditableText from './EditableText';

const MasterInventory = ({ data, setData, setChanged }) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    document.addEventListener('dragend', () => {
      setActive(false);
    });
    return () => {
      document.removeEventListener('dragend', () => {
        setActive(false);
      });
    };
  }, []);
  useEffect(() => {
    getMasterInv().then((result) => {
      if (result instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(
          'Something went wrong in the backend server. Please contact the developer team'
        );
        console.log(result);
      } else {
        console.log(result);
        setData(result);
      }
    });
  }, []);

  // TODO: Add delete icon to row and attach this function
  const handleDelete = (name) => {
    const newData = data.filter((item) => item.itemName !== name);
    setData([]);
    setData(newData);
    setChanged(true);
  };

  // TODO: Replace text with EditableText and attach this function
  const handleItemChange = (item) => {
    setChanged(true);
    setData(item);
  };

  return (
    <div>
      <div className="tableItemHeader">
        <div className="headerName">Item Name</div>
        <div className="headerItemLimit">Item Price </div>
      </div>
      {data &&
        data.map((item, index) => (
          <div key={item.itemName} className="tableItem">
            <div className="itemOrder">{index + 1}</div>
            <EditableText
              id="master-inventory-name"
              role="button"
              tabIndex="-1"
              widthSize="20"
              itemName={item.itemName}
              initValue={item.itemName}
              inventory={data}
              updateInventory={handleItemChange}
              keyToUpdate="itemName"
              cssClass="itemName"
              isNumber={false}
              setActive={setActive}
            />
            <EditableText
              id="master-inventory-price"
              role="button"
              tabIndex="-1"
              widthSize="5"
              itemName={item.itemName}
              initValue={item.itemPrice.toString()}
              inventory={data}
              updateInventory={handleItemChange}
              keyToUpdate="itemPrice"
              setActive={setActive}
              cssClass="itemPrice"
              isNumber
            />
            <div className="master-inventory-delete vertical-align-center">
              <CgTrash
                size="20"
                color="F04747"
                onClick={() => handleDelete(item.itemName)}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

MasterInventory.propTypes = {
  data: PropTypes.arrayOf.isRequired,
  setData: PropTypes.func.isRequired,
  setChanged: PropTypes.func.isRequired,
};

export default MasterInventory;
