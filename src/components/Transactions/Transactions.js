import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Switch, Space } from 'antd';
import {
  getPendingTransactions,
  getApprovedTransactions,
  getDeniedTransactions,
  approveTransaction,
  denyTransaction,
  getTeacherByID,
} from './api-transactions';
import './Transactions.css';

const dateConverter = (date) => {
  const year = date.slice(0, 4);
  let month = parseInt(date.slice(5, 7), 10);
  const day = date.slice(8, 10);
  let hours = date.slice(11, 13);
  const minutes = date.slice(14, 16);
  let suffix = 'am';

  // eslint-disable-next-line default-case
  switch (month) {
    case 1:
      month = 'January';
      break;
    case 2:
      month = 'February';
      break;
    case 3:
      month = 'March';
      break;
    case 4:
      month = 'April';
      break;
    case 5:
      month = 'May';
      break;
    case 6:
      month = 'June';
      break;
    case 7:
      month = 'July';
      break;
    case 8:
      month = 'August';
      break;
    case 9:
      month = 'September';
      break;
    case 10:
      month = 'October';
      break;
    case 11:
      month = 'November';
      break;
    case 12:
      month = 'December';
      break;
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
  const [loadedData, setLoadedData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [typeData, setTypeData] = useState('pending');
  const [selectedData, setSelectedData] = useState([]);

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
  };

  const approveClick = (e, transaction) => {
    e.preventDefault();
    let toDelete = {};
    // eslint-disable-next-line no-restricted-syntax
    for (let j = 0; j < rawData.length; j += 1) {
      if (rawData[j].transactionId === transaction.key) {
        toDelete = rawData[j];
      }
    }
    approveTransaction(toDelete);
    const tempArr = [...loadedData];
    tempArr.splice(tempArr.indexOf(transaction), 1);
    setLoadedData(tempArr);
  };

  const denyClick = (e, transaction) => {
    e.preventDefault();
    let toDelete = {};
    // eslint-disable-next-line no-restricted-syntax
    for (let j = 0; j < rawData.length; j += 1) {
      if (rawData[j].transactionId === transaction.key) {
        toDelete = rawData[j];
      }
    }
    denyTransaction(toDelete);
    const tempArr = [...loadedData];
    tempArr.splice(tempArr.indexOf(transaction), 1);
    setLoadedData(tempArr);
  };

  const columns = [
    {
      title: 'Date/Time',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '12%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '30%',
      key: 'status',
    },
    {
      title: '',
      key: 'approve',
      dataIndex: 'approve',
      render: (text, record) => (
        <button
          type="button"
          onClick={(e) => approveClick(e, record)}
          hidden={!(typeData === 'pending')}
        >
          ✓
        </button>
      ),
    },
    {
      title: '',
      key: 'deny',
      dataIndex: 'deny',
      render: (text, record) => (
        <button
          type="button"
          onClick={(e) => denyClick(e, record)}
          hidden={!(typeData === 'pending')}
        >
          ✖
        </button>
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

  const expandedRowRender = (record) => {
    const itemColumns = [
      { title: 'Item', dataIndex: 'itemName1', key: 'itemName1' },
      { title: 'Qty', dataIndex: 'itemsTaken1', key: 'itemsTaken1' },
      { title: 'Item', dataIndex: 'itemName2', key: 'itemName2' },
      { title: 'Qty', dataIndex: 'itemsTaken2', key: 'itemsTaken2' },
    ];

    return (
      <Table
        columns={itemColumns}
        dataSource={record.childNodes}
        pagination={false}
      />
    );
  };

  const formatData = (transactions, status) => {
    const formattedData = [];
    for (let i = 0; i < transactions.length; i += 1) {
      // eslint-disable-next-line no-loop-func
      getTeacherByID(transactions[i].teacherId).then((teacher) => {
        const formattedObj = {
          date: dateConverter(transactions[i].createdAt),
          name: `${teacher.firstName} ${teacher.lastName}`,
          childNodes: formatItemData(transactions[i].items),
          status: capitalizeFirstLetter(status),
          key: transactions[i].transactionId,
        };
        formattedData.push(formattedObj);
        if (i + 1 === transactions.length) {
          setRawData(transactions);
          setLoadedData(formattedData);
          console.log(formattedData);
        }
      });
    }
  };

  const changeLoadedData = (event) => {
    if (event.target.value === typeData) {
      console.log('no change');
    } else if (event.target.value === 'pending') {
      setSelectedData([]);
      getPendingTransactions().then((transactions) => {
        if (transactions.error) {
          console.log(transactions.error);
        } else {
          setLoadedData([]);
          setTypeData(event.target.value);
          formatData(transactions, event.target.value);
          console.log('Data loaded!');
        }
      });
    } else if (event.target.value === 'approved') {
      setSelectedData([]);
      getApprovedTransactions().then((transactions) => {
        if (transactions.error) {
          console.log(transactions.error);
        } else {
          setLoadedData([]);
          setTypeData(event.target.value);
          formatData(transactions, event.target.value);
          console.log(transactions);
        }
      });
    } else if (event.target.value === 'denied') {
      setSelectedData([]);
      getDeniedTransactions().then((transactions) => {
        if (transactions.error) {
          console.log(transactions.error);
        } else {
          setLoadedData([]);
          setTypeData(event.target.value);
          formatData(transactions, event.target.value);
          console.log('Data loaded!');
        }
      });
    }
  };

  const denySelected = () => {
    for (let i = 0; i < selectedData.length; i += 1) {
      let toDelete = {};
      // eslint-disable-next-line no-restricted-syntax
      for (let j = 0; j < rawData.length; j += 1) {
        if (rawData[j].transactionId === selectedData[i].key) {
          toDelete = rawData[j];
        }
      }
      denyTransaction(toDelete);
      const tempArr = [...loadedData];
      tempArr.splice(tempArr.indexOf(selectedData[i]), 1);
      setLoadedData(tempArr);
    }
    setSelectedData([]);
  };

  const approveSelected = () => {
    for (let i = 0; i < selectedData.length; i += 1) {
      let toDelete = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const transaction in rawData) {
        if (transaction.transactionId === selectedData[i].key) {
          toDelete = transaction;
        }
      }
      approveTransaction(toDelete);
      const tempArr = [...loadedData];
      tempArr.splice(tempArr.indexOf(selectedData[i]), 1);
      setLoadedData(tempArr);
    }
    setSelectedData([]);
  };

  useEffect(() => {
    getPendingTransactions().then((transactions) => {
      if (transactions.error) {
        console.log(transactions.error);
      } else {
        formatData(transactions, 'pending');
      }
    });
  }, []);

  return (
    <div className="transactions">
      <div className="titleArea">
        <h1 className="transactionTitle">Transactions</h1>
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
        <select
          className="chooseData"
          name="options"
          id="options"
          onChange={changeLoadedData}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="denied">Denied</option>
        </select>
      </div>
      <div className="scrollingTransactions">
        <Space align="center" style={{ marginBottom: 16 }} />
        {typeData === 'pending' ? (
          <Table
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
          />
        ) : (
          <Table
            columns={columns}
            dataSource={loadedData}
            expandable={{
              expandedRowRender,
              rowExpandable(record) {
                return record.childNodes.length;
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

const Transactions = () => (
  <div>
    <PendingTransactions />
  </div>
);

export default Transactions;
