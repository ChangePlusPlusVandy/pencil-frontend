/* eslint-disable no-useless-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Table, Space } from 'antd';
import isIn from 'validator/lib/isIn';
import { useAuth } from '../../AuthContext';
import CustomDropdown from '../../components/Dropdowns/CustomDropdown';
import { handleTransaction, getTransactions } from './api-transactions';
import PageContainer from '../../components/PageContainer/PageContainer';
import './Transactions.css';
import TableHeader from '../../components/TableHeader/TableHeader';
import { parseDate } from '../../utils/timedate';

const formatDate = (dateObj) => {
  const { date, month, year, ampmTime } = parseDate(dateObj);

  return `${date} ${month} ${year}\n${ampmTime}`;
};

const PendingTransactions = () => {
  const [numItems, setNumItems] = useState(10);
  const [loadedData, setLoadedData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [view, setView] = useState('Pending');
  const [selectedData, setSelectedData] = useState([]);
  const [wasChecked, setWasChecked] = useState([]);
  const [error, setError] = useState('');
  const { currentLocation } = useAuth();

  useEffect(() => {
    getTransactions(currentLocation, 1, 'Pending').then((transactions) => {
      if (transactions.error) {
        setError(transactions.error);
      } else {
        setLoadedData(transactions);
      }
    });
  }, []);

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
      disabled: record.status !== 'Pending',
      checked: record.key ? !isIn(record.key, wasChecked) : false,
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
    if (action === 'Approve') funnyObj.action = 'Approved';
    else funnyObj.action = 'Denied';
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
      if (action === 'Approve') funnyObj.action = 'Approved';
      else funnyObj.action = 'Denied';
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
          className="approve-button"
          hidden={record.isDisabled}
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
          className="deny-button"
          hidden={record.isDisabled}
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

  const formatItemData = (items) => {
    const formattedData = [];
    for (let i = 0; i < items.length; i += 2) {
      let itemName2 = '';
      if (items[i + 1]) {
        itemName2 = items[i + 1].Item.itemName;
      }
      let itemsTaken2 = '';

      if (items[i + 1]) {
        itemsTaken2 = String(items[i + 1].amountTaken);
      }
      const newObj = {
        itemName1: items[i].Item.itemName,
        itemsTaken1: String(items[i].amountTaken),
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
    for (let i = 0; i < transactions.length; i += 1) {
      const { Teacher } = transactions[i];
      const formattedObj = {
        date: formatDate(new Date(transactions[i].createdAt)),
        name: `${Teacher.firstName} ${Teacher.lastName}`,
        childNodes: formatItemData(transactions[i].TransactionItems),
        status,
        key: transactions[i].uuid,
        isDisabled: !(status === 'Pending'),
      };
      formattedData.push(formattedObj);
    }
    setRawData(transactions);
    setLoadedData(formattedData);
  };

  const loadMore = () => {
    setNumItems(numItems + 50);
  };

  const changeLoadedData = (event) => {
    if (event.target.innerText === view) return;
    setSelectedData([]);
    getTransactions(currentLocation, 1, event.target.innerText).then(
      (transactions) => {
        if (transactions.error) console.log(transactions.error);
        else {
          setLoadedData([]);
          formatData(transactions, event.target.innerText);
          setView(event.target.innerText);
        }
      }
    );
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
      className={`expandArrowTransaction${fun.expanded ? 'Rotate' : ''}`}
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
            pagination={{ pageSize: numItems, position: ['none'] }}
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
            pagination={{ pageSize: numItems, position: ['none'] }}
          />
        )}
        <div className="horizontal-align-center">
          <button type="button" className="primaryButton" onClick={loadMore}>
            Load 50
          </button>
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
