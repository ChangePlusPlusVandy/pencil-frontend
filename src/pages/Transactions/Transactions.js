/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { FaChevronDown, FaCheck } from 'react-icons/fa'; //  Add deny/approve function, add no data page
import { IoMdRefresh } from 'react-icons/io';
import { ImCross } from 'react-icons/im';
import { Table } from 'antd';
import { useAuth } from '../../AuthContext';
import CustomDropdown from '../../components/Dropdowns/CustomDropdown';
import {
  handleTransaction,
  getTransactions,
  getPendingTransactions,
} from './api-transactions';
import PageContainer from '../../components/PageContainer/PageContainer';
import './Transactions.css';
import TableHeader from '../../components/TableHeader/TableHeader';
import { parseDate } from '../../utils/timedate';

const formatDate = (dateObj) => {
  const { day, date, month, year, ampmTime } = parseDate(dateObj);
  // TODO: check if this is the correct format
  // currently using material design suggested format
  return `${day}, ${date} ${month}, ${ampmTime}`;
};

function isOverload(data, index) {
  for (const i in data.childNodes) {
    console.log(data);
    if (
      parseInt(data.childNodes[i].itemsTaken1, 10) >
        parseInt(data.childNodes[i].maxLimit1, 10) ||
      parseInt(data.childNodes[i].itemsTaken2, 10) >
        parseInt(data.childNodes[i].maxLimit2, 10)
    ) {
      return true;
    }
  }
  return false;
}

const Transactions = () => {
  const [prevItems, setPrevItems] = useState(10);
  const [loadedData, setLoadedData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [view, setView] = useState('Pending');
  const [selectedData, setSelectedData] = useState([]);
  const [wasChecked, setWasChecked] = useState([]);
  const [error, setError] = useState('');
  const { currentLocation } = useAuth();

  const formatItemData = (items) => {
    const formattedData = [];
    for (let i = 0; i < items.length; i += 2) {
      let itemName2 = '';
      let maxLimit2 = '0';
      console.log(items[i]);
      if (items[i + 1]) {
        itemName2 = items[i + 1].Item.itemName;
      }
      let itemsTaken2 = '';

      if (items[i + 1]) {
        itemsTaken2 = String(items[i + 1].amountTaken);
        maxLimit2 = String(items[i + 1].maxLimit);
      }
      const newObj = {
        itemName1: items[i].Item.itemName,
        itemsTaken1: String(items[i].amountTaken),
        maxLimit1: String(items[i].maxLimit),
        itemName2,
        itemsTaken2,
        maxLimit2,
      };
      formattedData.push(newObj);
    }
    return formattedData;
  };

  const formatData = (transactions, status, isLoadMore = false) => {
    const formattedData = [];
    for (let i = 0; i < transactions.length; i += 1) {
      const { Teacher } = transactions[i];
      const formattedObj = {
        date: formatDate(new Date(transactions[i].createdAt)),
        name: `${Teacher.firstName} ${Teacher.lastName}`,
        childNodes: formatItemData(transactions[i].TransactionItems),
        status,
        key: transactions[i].uuid,
        isDeniedDisabled: status === 'Denied',
        isApproveDisabled: !(status === 'Pending'),
      };
      formattedData.push(formattedObj);
    }
    if (!isLoadMore) {
      setRawData(transactions);
      setLoadedData(formattedData);
    } else if (transactions.length !== 0) {
      setRawData([...rawData, ...transactions]);
      setLoadedData([...loadedData, ...formattedData]);
    }
  };

  useEffect(() => {
    getTransactions(currentLocation, 'Pending').then((transactions) => {
      console.log(transactions);
      if (transactions.error) {
        setError(transactions.error);
      } else {
        setLoadedData([]);
        setView('Pending');
        formatData(transactions, 'Pending');
        console.log('Data loaded!');
      }
    });
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedData(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.status !== 'Pending',
      checked: record.key in wasChecked,
    }),
  };

  const handleClick = (e, transaction, action) => {
    e.preventDefault();
    let toDelete = {};
    for (let j = 0; j < rawData.length; j += 1) {
      if (rawData[j].uuid === transaction.key) {
        toDelete = rawData[j];
      }
    }
    const tempArr = [...loadedData];
    const funnyObj = transaction;
    handleTransaction(currentLocation, toDelete, action);
    if (action === 'Approve') funnyObj.status = 'Approved';
    else funnyObj.status = 'Denied';
    funnyObj.isDisabled = true;
    tempArr[tempArr.indexOf(transaction)] = funnyObj;
    setLoadedData([]);
    setLoadedData(tempArr);
    setWasChecked((prevChecked) => {
      prevChecked.push(transaction.key);
      return prevChecked;
    });
  };

  const handleSelected = (action) => {
    const transactionArr = [];
    for (let i = 0; i < selectedData.length; i += 1) {
      transactionArr.push(selectedData[i].key);
      let toDelete = {};
      for (let j = 0; j < rawData.length; j += 1) {
        if (rawData[j].uuid === selectedData[i].key) {
          toDelete = rawData[j];
        }
      }
      const tempArr = [...loadedData];
      const funnyObj = selectedData[i];
      handleTransaction(currentLocation, toDelete, action);
      if (action === 'Approve') funnyObj.status = 'Approved';
      else funnyObj.status = 'Denied';
      funnyObj.isDisabled = true;
      tempArr[tempArr.indexOf(selectedData[i])] = funnyObj;
      setLoadedData([]);
      setLoadedData(tempArr);
    }
    setWasChecked(transactionArr.concat(wasChecked));
    setSelectedData([]);
  };

  const columns = [
    {
      title: 'Date/Time',
      dataIndex: 'date',
      key: 'date',
      width: '25%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '35%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '30%',
      key: 'status',
      render: (text, record) => (
        <div className={`status${record.status}`}>{record.status}</div>
      ),
    },
    {
      title: '',
      key: 'approve',
      dataIndex: 'approve',
      render: (text, record) => (
        <div
          className=" roundButton approve-button"
          hidden={record.isApproveDisabled}
          onClick={(e) => handleClick(e, record, 'Approve')}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          <FaCheck />
        </div>
      ),
    },
    {
      title: '',
      key: 'deny',
      dataIndex: 'deny',
      render: (text, record) => (
        <div
          className="roundButton deny-button"
          hidden={record.isDeniedDisabled}
          onClick={(e) => handleClick(e, record, 'Deny')}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          <ImCross />
        </div>
      ),
    },
  ];

  const expandedRowRender = (record) => (
    <table className="expandedData">
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Item</th>
        <th>Quantity</th>
      </tr>
      {record.childNodes.map((item) => (
        <tr className="expandedTableRow">
          <td>{item.itemName1}</td>
          <td>{item.itemsTaken1}</td>
          <td>{item.itemName2}</td>
          <td>{item.itemsTaken2}</td>
        </tr>
      ))}
    </table>
  );

  const loadMore = (type) => {
    getTransactions(currentLocation, type, prevItems, prevItems + 50).then(
      (transactions) => {
        if (transactions.error) console.log(transactions.error);
        else {
          formatData(transactions, type, true);
          setView(type);
        }
      }
    );
    setPrevItems(prevItems + 50);
  };

  const changeLoadedData = (event) => {
    const type = event.target.innerText || view;
    setSelectedData([]);
    setPrevItems(10);
    formatData([], type); // TODO: remove this if the reload flicker isn't wanted
    getTransactions(currentLocation, type).then((transactions) => {
      if (transactions.error) console.log(transactions.error);
      else {
        setLoadedData([]);
        formatData(transactions, type);
        setView(type);
      }
    });
  };

  const menuOptions = ['Pending', 'Approved', 'Denied'];

  const menu = (
    <>
      {menuOptions
        .filter((option) => option !== view)
        .map((option) => (
          <a onClick={(e) => changeLoadedData(e)}>{option}</a>
        ))}
    </>
  );

  const customExpandIcon = (fun) => (
    <FaChevronDown
      onClick={(e) => {
        fun.onExpand(fun.record, e);
      }}
      className={`expandArrowTransaction ${fun.expanded ? 'rotate180' : ''}`}
    />
  );

  const leftItems = (
    <>
      <button
        type="button"
        className="secondaryButton vertical-align-center statusApproved"
        onClick={() => handleSelected('Approve')}
        hidden={!selectedData.length}
      >
        Approve
        <FaCheck size={11} />
      </button>
      <button
        type="button"
        className="secondaryButton vertical-align-center statusDenied"
        onClick={() => handleSelected('Deny')}
        hidden={!selectedData.length}
      >
        Deny
        <ImCross size={11} />
      </button>
    </>
  );

  const rightItems = (
    <>
      <IoMdRefresh
        className="refreshButton"
        size="26"
        onClick={changeLoadedData}
      />
      <CustomDropdown title={view} menuItems={menu} type="small" />
    </>
  );

  return (
    <PageContainer>
      <TableHeader
        title="Transactions"
        leftArea={leftItems}
        rightArea={rightItems}
      />
      <div className="tableContainer">
        {view === 'Pending' ? (
          <Table
            expandIcon={(props) => customExpandIcon(props)}
            rowKey="key"
            columns={columns}
            rowSelection={{ ...rowSelection }}
            dataSource={loadedData}
            expandable={{
              expandedRowRender,
              rowExpandable(record) {
                return record?.childNodes?.length;
              },
            }}
            // pagination={{ pageSize: numItems, position: ['none'] }}
            pagination={false}
          />
        ) : (
          <Table
            expandIcon={(props) => customExpandIcon(props)}
            columns={columns}
            dataSource={loadedData}
            rowClassName="transactionTableItem"
            expandable={{
              expandedRowRender,
              rowExpandable(record) {
                return record.childNodes.length;
              },
            }}
            // pagination={{ pageSize: numItems, position: ['none'] }}
            pagination={false}
          />
        )}
        <div className="horizontal-align-center">
          {loadedData.length === prevItems ? (
            <button
              type="button"
              className="primaryButton"
              onClick={() => loadMore(view)}
            >
              Load 50
            </button>
          ) : (
            <> </>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Transactions;
