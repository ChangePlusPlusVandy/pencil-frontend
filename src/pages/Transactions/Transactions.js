/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { FaChevronDown, FaChevronUp, FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Table, Space } from 'antd';
import isIn from 'validator/lib/isIn';
import { useAuth } from '../../AuthContext';
import CustomDropdown from '../../components/Dropdowns/CustomDropdown';
import {
  getPendingTransactions,
  getApprovedTransactions,
  getDeniedTransactions,
  approveTransaction,
  denyTransaction,
  getTeacherByID,
} from './api-transactions';
import PageContainer from '../../components/PageContainer/PageContainer';
import './Transactions.css';
import TableHeader from '../../components/TableHeader/TableHeader';

const dateConverter = (date) => {
  const year = date.slice(0, 4);
  let month = parseInt(date.slice(5, 7), 10);
  const day = parseInt(date.slice(8, 10), 10);
  let hours = parseInt(date.slice(11, 13), 10);
  const minutes = date.slice(14, 16);
  let suffix = 'am';

  switch (month) {
    case 1:
      month = 'Jan';
      break;
    case 2:
      month = 'Feb';
      break;
    case 3:
      month = 'Mar';
      break;
    case 4:
      month = 'Apr';
      break;
    case 5:
      month = 'May';
      break;
    case 6:
      month = 'June';
      break;
    case 7:
      month = 'Jul';
      break;
    case 8:
      month = 'Aug';
      break;
    case 9:
      month = 'Sept';
      break;
    case 10:
      month = 'Oct';
      break;
    case 11:
      month = 'Nov';
      break;
    case 12:
      month = 'Dec';
      break;
    default:
  }

  if (hours > 12) {
    suffix = 'pm';
    hours -= 12;
  }

  return `${day} ${month} ${year}\n${hours}:${minutes} ${suffix}`;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const PendingTransactions = () => {
  const [numItems, setNumItems] = useState(10);
  const [loadedData, setLoadedData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [view, setView] = useState('Pending');
  const [selectedData, setSelectedData] = useState([]);
  const [wasChecked, setWasChecked] = useState([]);
  const { currentLocation } = useAuth();

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
      setSelectedData(selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: (record) => ({
      disabled: isIn(record.key, wasChecked),
      checked: !isIn(record.key, wasChecked),
    }),
  };

  const approveClick = (e, transaction) => {
    e.preventDefault();
    console.log(transaction);
    let toDelete = {};
    for (let j = 0; j < rawData.length; j += 1) {
      if (rawData[j].transactionId === transaction.key) {
        toDelete = rawData[j];
      }
    }
    approveTransaction(currentLocation, toDelete);
    const tempArr = [...loadedData];
    const funnyObj = transaction;
    funnyObj.status = 'Approved';
    funnyObj.isDisabled = true;
    tempArr[tempArr.indexOf(transaction)] = funnyObj;
    setLoadedData([]);
    setLoadedData(tempArr);
  };

  const denyClick = (e, transaction) => {
    e.preventDefault();
    let toDelete = {};
    for (let j = 0; j < rawData.length; j += 1) {
      if (rawData[j].transactionId === transaction.key) {
        toDelete = rawData[j];
      }
    }
    denyTransaction(currentLocation, toDelete);
    const tempArr = [...loadedData];
    const funnyObj = transaction;
    funnyObj.status = 'Denied';
    funnyObj.isDisabled = true;
    tempArr[tempArr.indexOf(transaction)] = funnyObj;
    setLoadedData([]);
    setLoadedData(tempArr);
  };

  const columns = [
    {
      title: 'Date/Time',
      dataIndex: 'date',
      key: 'date',
      width: '15%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '40%',
      key: 'status',
    },
    {
      title: '',
      key: 'approve',
      dataIndex: 'approve',
      render: (text, record) => (
        <div
          className="approve-button"
          hidden={record.isDisabled}
          onClick={(e) => approveClick(e, record)}
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
          className="deny-button"
          hidden={record.isDisabled}
          onClick={(e) => denyClick(e, record)}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          <ImCross />
        </div>
      ),
    },
  ];

  const formatItemData = (items) => {
    const formattedData = [];
    for (let i = 0; i < items.length; i += 2) {
      let itemName2 = '';
      if (items[i + 1]) {
        itemName2 = items[i + 1].itemName;
      }
      let itemsTaken2 = '';

      if (items[i + 1]) {
        itemsTaken2 = String(items[i + 1].itemCount);
      }
      const newObj = {
        itemName1: items[i].itemName,
        itemsTaken1: String(items[i].itemCount),
        itemName2,
        itemsTaken2,
      };
      formattedData.push(newObj);
    }
    return formattedData;
  };

  const expandedRowRender = (record) => (
    <table className="expandedData">
      <tr>
        <th>Item</th>
        <th>Qty</th>
        <th>Item</th>
        <th>Qty</th>
      </tr>
      {record.childNodes.map((item) => (
        <tr>
          <td>{item.itemName1}</td>
          <td>{item.itemsTaken1}</td>
          <td>{item.itemName2}</td>
          <td>{item.itemsTaken2}</td>
        </tr>
      ))}
    </table>
  );

  const formatData = (transactions, status) => {
    const formattedData = [];
    console.log(status);
    for (let i = 0; i < transactions.length; i += 1) {
      // eslint-disable-next-line no-loop-func
      getTeacherByID(currentLocation, transactions[i].teacherId).then(
        (teacher) => {
          const formattedObj = {
            date: dateConverter(transactions[i].createdAt),
            name: `${teacher.firstName} ${teacher.lastName}`,
            childNodes: formatItemData(transactions[i].items),
            status: capitalizeFirstLetter(status),
            key: transactions[i].transactionId,
            isDisabled: !(status === 'Pending'),
          };
          formattedData.push(formattedObj);
          if (i + 1 === transactions.length) {
            setRawData(transactions);
            setLoadedData(formattedData);
            console.log(formattedData);
          }
        }
      );
    }
  };

  const loadMore = () => {
    setNumItems(numItems + 50);
  };

  const changeLoadedData = (event) => {
    console.log(event.target.innerText);
    if (event.target.innerText === view) {
      console.log('no change');
    } else if (event.target.innerText === 'Pending') {
      setSelectedData([]);
      getPendingTransactions(currentLocation).then((transactions) => {
        if (transactions.error) {
          console.log(transactions.error);
        } else {
          setLoadedData([]);
          setView(event.target.innerText);
          formatData(transactions, 'Pending');
          console.log('Data loaded!');
          console.log(transactions);
        }
      });
    } else if (event.target.innerText === 'Approved') {
      setSelectedData([]);
      getApprovedTransactions(currentLocation).then((transactions) => {
        if (transactions.error) {
          console.log(transactions.error);
        } else {
          setLoadedData([]);
          setView(event.target.innerText);
          formatData(transactions, 'Approved');
          console.log(transactions);
        }
      });
    } else if (event.target.innerText === 'Denied') {
      setSelectedData([]);
      getDeniedTransactions(currentLocation).then((transactions) => {
        if (transactions.error) {
          console.log(transactions.error);
        } else {
          setLoadedData([]);
          setView(event.target.innerText);
          formatData(transactions, 'Denied');
          console.log(transactions);
        }
      });
    }
  };

  const denySelected = (e) => {
    const transactionArr = [];
    for (let i = 0; i < selectedData.length; i += 1) {
      transactionArr.push(selectedData[i].key);
      let toDelete = {};
      for (let j = 0; j < rawData.length; j += 1) {
        if (rawData[j].transactionId === selectedData[i].key) {
          toDelete = rawData[j];
        }
      }
      denyTransaction(currentLocation, toDelete);
      const tempArr = [...loadedData];
      const funnyObj = selectedData[i];
      funnyObj.status = 'Denied';
      funnyObj.isDisabled = true;
      tempArr[tempArr.indexOf(selectedData[i])] = funnyObj;
      setLoadedData([]);
      setLoadedData(tempArr);
    }
    console.log(transactionArr);
    setWasChecked(...wasChecked, ...transactionArr);
    console.log(wasChecked);
    setSelectedData([]);
  };

  const approveSelected = (e) => {
    for (let i = 0; i < selectedData.length; i += 1) {
      let toDelete = {};
      for (let j = 0; j < rawData.length; j += 1) {
        if (rawData[j].transactionId === selectedData[i].key) {
          toDelete = rawData[j];
        }
      }
      approveTransaction(currentLocation, toDelete);
      const tempArr = [...loadedData];
      const funnyObj = selectedData[i];
      funnyObj.status = 'Approved';
      funnyObj.isDisabled = true;
      tempArr[tempArr.indexOf(selectedData[i])] = funnyObj;
      setLoadedData([]);
      setLoadedData(tempArr);
    }
    const transactionArr = [];
    for (const transaction in selectedData) {
      transactionArr.push(transaction.transactionId);
    }
    setWasChecked(...wasChecked, transactionArr);
    setSelectedData([]);
  };

  useEffect(() => {
    getPendingTransactions(currentLocation).then((transactions) => {
      if (transactions.error) {
        console.log(transactions.error);
      } else {
        formatData(transactions, 'Pending');
      }
    });
  }, []);

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

  const customExpandIcon = (fun) => {
    if (fun.expanded) {
      return (
        <button
          type="button"
          style={{ color: 'black' }}
          onClick={(e) => {
            fun.onExpand(fun.record, e);
          }}
        >
          <FaChevronUp />
        </button>
      );
    }
    return (
      <button
        type="button"
        style={{ color: 'black' }}
        onClick={(e) => {
          fun.onExpand(fun.record, e);
        }}
      >
        <FaChevronDown />
      </button>
    );
  };

  const leftItems = (
    <>
      <button
        type="button"
        className="borderlessButton"
        id="wordButton"
        onClick={approveSelected}
        hidden={!selectedData.length}
      >
        Approve
      </button>
      <button
        className="borderlessButton"
        type="button"
        onClick={approveSelected}
        hidden={!selectedData.length}
      >
        ✓
      </button>
      <button
        id="wordButton"
        className="borderlessButton"
        type="button"
        onClick={denySelected}
        hidden={!selectedData.length}
      >
        Deny
      </button>
      <button
        className="borderlessButton"
        type="button"
        onClick={denySelected}
        hidden={!selectedData.length}
      >
        ✕
      </button>
    </>
  );

  const rightItems = (
    <CustomDropdown title={view} menuItems={menu} type="small" />
  );

  return (
    <>
      <TableHeader
        title="Transactions"
        leftArea={leftItems}
        rightArea={rightItems}
      />
      <div className="scrollingTransactions">
        <Space align="center" style={{ marginBottom: 16 }} />
        {view === 'Pending' ? (
          <Table
            expandIcon={(props) => customExpandIcon(props)}
            rowKey="key"
            columns={columns}
            className="bigTable"
            rowSelection={{ ...rowSelection }}
            dataSource={loadedData}
            expandable={{
              expandedRowRender,
              rowExpandable(record) {
                return record?.childNodes?.length;
              },
            }}
            pagination={{ pageSize: numItems }}
          />
        ) : (
          <Table
            expandIcon={(props) => customExpandIcon(props)}
            columns={columns}
            dataSource={loadedData}
            expandable={{
              expandedRowRender,
              rowExpandable(record) {
                return record.childNodes.length;
              },
            }}
            pagination={{ pageSize: numItems }}
          />
        )}
        <div
          type="button"
          className="load-more"
          onClick={loadMore}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          Load 50
        </div>
      </div>
    </>
  );
};

const Transactions = () => (
  <PageContainer>
    <PendingTransactions />
  </PageContainer>
);

export default Transactions;
