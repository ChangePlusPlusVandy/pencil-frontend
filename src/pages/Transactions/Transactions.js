/* eslint-disable no-param-reassign */

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
import Subtable from './Subtable';
import { handleTransaction, getTransactions } from './api-transactions';
import PageContainer from '../../components/PageContainer/PageContainer';
import './Transactions.css';
import TableHeader from '../../components/TableHeader/TableHeader';
import { parseDate } from '../../utils/timedate';

const formatDate = (dateObj) => {
  const { day, date, month, ampmTime } = parseDate(dateObj);
  return `${day}, ${date} ${month}, ${ampmTime}`;
};

const Transactions = () => {
  const [prevItems, setPrevItems] = useState(10);
  const [data, setData] = useState([]);
  const [view, setView] = useState('Pending');
  const [selectedData, setSelectedData] = useState([]);
  const [wasChecked, setWasChecked] = useState([]);
  const [error, setError] = useState('');
  const { currentLocation } = useAuth();

  const formatData = (transactions, status, isLoadMore = false) => {
    const result = transactions.map((item) => ({
      uuid: item.uuid,
      date: formatDate(new Date(item.createdAt)),
      teacherName: item.Teacher.name,
      transactionItems: item.TransactionItems,
      status,
    }));
    if (!isLoadMore) setData(result);
    else if (transactions.length !== 0) setData([...data, ...result]);
  };

  useEffect(() => {
    getTransactions(currentLocation, 'Pending').then((transactions) => {
      if (transactions.error) setError(transactions.error);
      else formatData(transactions, 'Pending');
    });
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedData(selectedRows);
    },
    getCheckboxProps: (record) => ({
      // checked: true,
      disabled: record.status !== 'Pending' || record.uuid in wasChecked,
    }),
  };

  const handleClick = (e, transaction, action) => {
    handleTransaction(currentLocation, transaction.uuid, action);
    // find the index of the transaction in the data array,
    // and change the status based on the action
    setData((prevData) => {
      const temp = [...prevData];
      temp[temp.indexOf(transaction)].status =
        action === 'Approve' ? 'Approved' : 'Denied';
      return temp;
    });

    setWasChecked((prevChecked) => {
      prevChecked.push(transaction.uuid);
      return prevChecked;
    });

    // remove transaction from selected data if exists
    const selectedUuid = selectedData.map((a) => a.uuid);
    if (selectedUuid.includes(transaction.uuid)) {
      setSelectedData([]);
      setSelectedData((datas) =>
        datas.splice(selectedUuid.indexOf(transaction.uuid), 1)
      );
    }
  };

  const handleSelected = (action) => {
    // handle each transaction in selected data
    selectedData.forEach((transaction) => {
      handleTransaction(currentLocation, transaction.uuid, action);
      setData((prevData) => {
        const temp = [...prevData];
        temp[temp.indexOf(transaction)].status =
          action === 'Approve' ? 'Approved' : 'Denied';
        return temp;
      });
    });

    // clear selected data
    const selectedUuid = selectedData.map((a) => a.uuid);
    setWasChecked(selectedUuid.concat(wasChecked));
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
      dataIndex: 'teacherName',
      key: 'teacherName',
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
          hidden={record.status !== 'Pending' && view !== 'Denied'}
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
          hidden={record.status !== 'Pending'}
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

  const handleTransactionItemsChange = (items, trxUuid) => {
    setData((prevData) => {
      prevData.map((transaction) => {
        if (transaction.uuid === trxUuid) transaction.transactionItems = items;
        return transaction;
      });
      return prevData;
    });
  };

  const expandedRowRender = (record) => (
    <Subtable
      uuid={record.uuid}
      data={record.transactionItems}
      transactionType={view}
      status={record.status}
      onChange={handleTransactionItemsChange}
    />
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
        setData([]);
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
            rowKey="uuid"
            columns={columns}
            rowSelection={{ ...rowSelection }}
            dataSource={data}
            expandable={{
              expandedRowRender,

              rowExpandable(record) {
                return record?.transactionItems?.length;
              },
            }}
            pagination={false}
          />
        ) : (
          <Table
            expandIcon={(props) => customExpandIcon(props)}
            columns={columns}
            dataSource={data}
            rowClassName="transactionTableItem"
            expandable={{
              expandedRowRender,

              rowExpandable(record) {
                return record.transactionItems.length;
              },
            }}
            pagination={false}
          />
        )}
        <div className="horizontal-align-center">
          {data && data.length === prevItems ? (
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

function isOverload(data, index) {
  for (const i in data.transactionItems) {
    console.log(data);

    if (
      parseInt(data.transactionItems[i].itemsTaken1, 10) >
        parseInt(data.transactionItems[i].maxLimit1, 10) ||
      parseInt(data.transactionItems[i].itemsTaken2, 10) >
        parseInt(data.transactionItems[i].maxLimit2, 10)
    ) {
      return true;
    }
  }

  return false;
}
