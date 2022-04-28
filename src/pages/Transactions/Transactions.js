/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import { ImCross } from 'react-icons/im';
import { Table } from 'antd';
import { IoFilter } from 'react-icons/io5';
import { useAuth } from '../../AuthContext';
import CustomDropdown from '../../components/Dropdowns/CustomDropdown';
import Subtable from './Subtable';
import {
  handleTransaction,
  getTransactions,
  approveDeniedTransaction,
  getVerifiedSchools,
  approveDeniedTransactionWithNewSchool,
  approveTransactionWithNewSchool,
} from './api-transactions';
import PageContainer from '../../components/PageContainer/PageContainer';
import './Transactions.css';
import TableHeader from '../../components/TableHeader/TableHeader';
import { parseDate } from '../../utils/timedate';
import Modal from '../../components/Modal/Modal';
import CustomCombobox from '../../components/Combobox/CustomCombobox';

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
  const [showPopup, setShowPopup] = useState(false);
  const [schoolNameList, setSchoolNameList] = useState([]);
  const [schoolFilter, setSchoolFilter] = useState('');
  const [singleSelected, setSingleSelected] = useState(false);
  const [showMulPopup, setShowMulPopup] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState([]);
  const [mulSchoolFilter, setMulSchoolFilter] = useState([]);
  const [allowApproval, setAllowApproval] = useState(false);

  const formatData = (transactions, status, isLoadMore = false) => {
    const result = transactions.map((item) => ({
      uuid: item.uuid,
      date: formatDate(new Date(item.createdAt)),
      teacherName: item.Teacher.name,
      schoolName: item.Teacher.School.name,
      schoolId: item.Teacher.School.uuid,
      schoolVerified: item.Teacher.School.verified,
      transactionItems: item.TransactionItems,
      status,
    }));
    if (!isLoadMore) setData(result);
    else if (transactions.length !== 0) setData([...data, ...result]);
  };

  useEffect(() => {
    getTransactions(currentLocation, 'Pending').then((transactions) => {
      console.log(transactions);
      if (transactions.error) setError(transactions.error);
      else formatData(transactions, 'Pending');
    });
    getVerifiedSchools().then((schools) => {
      const schoolList = !schools.error ? schools.map((item) => item.name) : [];
      setSchoolNameList([...new Set(schoolList)]);
    });
  }, []);

  useEffect(() => {
    if (!mulSchoolFilter.length) return;
    let allfilled = true;
    mulSchoolFilter.forEach((curval) => {
      if (curval === '') allfilled = false;
    });
    setAllowApproval(allfilled);
  }, [mulSchoolFilter]);

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
    if (action === 'Approve' && !transaction.schoolVerified) {
      setSingleSelected(transaction);
      setShowPopup(true);
      return;
    }
    if (view === 'Denied') {
      approveDeniedTransaction(
        currentLocation,
        transaction.uuid,
        transaction.transactionItems
      );
    } else {
      handleTransaction(currentLocation, transaction.uuid, action);
    }
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
    const unverifiedArr = selectedData.filter((a) => !a.schoolVerified);
    if (action === 'Approve' && unverifiedArr.length) {
      setMulSchoolFilter(Array(unverifiedArr.length).fill(''));
      setShowMulPopup(true);
      setMultipleSelected(unverifiedArr);
    } else {
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
    }
  };

  const handleTransactionItemsChange = (items, trxUuid) => {
    setData((prevData) =>
      prevData.map((transaction) => {
        if (transaction.uuid === trxUuid) transaction.transactionItems = items;
        return transaction;
      })
    );
  };

  const columns = [
    {
      title: 'Date/Time',
      dataIndex: 'date',
      key: 'date',
      width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'teacherName',
      key: 'teacherName',
      width: '30%',
    },
    {
      title: 'School',
      dataIndex: 'schoolName',
      key: 'schoolName',
      width: '30%',
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
          hidden={
            (record.status !== 'Pending' && view !== 'Denied') ||
            (view === 'Denied' && record.status === 'Approved')
          }
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

  const expandedRowRender = (record) => (
    <Subtable
      uuid={record.uuid}
      data={record.transactionItems}
      onChange={handleTransactionItemsChange}
      transactionType={view}
      status={record.status}
    />
  );

  const updateSchoolName = async () => {
    if (view === 'Denied') {
      approveDeniedTransactionWithNewSchool(
        currentLocation,
        singleSelected.uuid,
        singleSelected.transactionItems,
        schoolFilter
      );
    } else {
      approveTransactionWithNewSchool(
        currentLocation,
        singleSelected.uuid,
        schoolFilter
      );
    }
    setData((prevData) => {
      const temp = [...prevData];
      temp[temp.indexOf(singleSelected)].status = 'Approved';
      temp[temp.indexOf(singleSelected)].schoolName = schoolFilter;
      return temp;
    });
    setSchoolFilter('');
    setShowPopup(false);
  };

  const updateMulSchoolName = async () => {
    let newSchoolIndex = 0;
    selectedData.forEach(async (transaction) => {
      if (!transaction.schoolVerified) {
        if (view === 'Denied') {
          await approveDeniedTransactionWithNewSchool(
            currentLocation,
            multipleSelected[newSchoolIndex].uuid,
            multipleSelected[newSchoolIndex].transactionItems,
            mulSchoolFilter[newSchoolIndex]
          );
        } else {
          await approveTransactionWithNewSchool(
            currentLocation,
            multipleSelected[newSchoolIndex].uuid,
            mulSchoolFilter[newSchoolIndex]
          );
        }
        setData((prevData) => {
          const temp = [...prevData];
          const mulItemIndex = temp.indexOf(multipleSelected[newSchoolIndex]);
          temp[mulItemIndex].status = 'Approved';
          temp[mulItemIndex].schoolName = mulSchoolFilter[newSchoolIndex];
          return temp;
        });
        newSchoolIndex += 1;
      } else {
        await handleTransaction(currentLocation, transaction.uuid, 'Approve');
        setData((prevData) => {
          const temp = [...prevData];
          temp[temp.indexOf(transaction)].status = 'Approved';
          return temp;
        });
      }
    });

    // clear selected data
    const selectedUuid = selectedData.map((a) => a.uuid);
    setWasChecked(selectedUuid.concat(wasChecked));
    setSelectedData([]);
    setMulSchoolFilter([]);
    setMultipleSelected([]);
    setShowMulPopup(false);
  };

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

  const menu = menuOptions
    .filter((option) => option !== view)
    .map((option) => <a onClick={(e) => changeLoadedData(e)}>{option}</a>);

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
            rowKey="uuid"
            expandIcon={(props) => customExpandIcon(props)}
            columns={columns}
            dataSource={data}
            rowClassName="transactionTableItem"
            expandable={{
              expandedRowRender,
              rowExpandable(record) {
                return record?.transactionItems?.length;
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
      <Modal
        show={showPopup}
        onClose={() => setShowPopup(false)}
        actionButtonText="Approve Transaction"
        handleAction={updateSchoolName}
        actionButtonDisabled={!schoolFilter}
      >
        {singleSelected && (
          <h3 style={{ color: 'rgb(219, 56, 56)' }}>
            &quot;{singleSelected.schoolName}&quot; is not a verified school.
          </h3>
        )}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="inputLabel">
          New School Name
          <CustomCombobox
            data={schoolNameList}
            onChange={setSchoolFilter}
            size="small"
            placeholder="Search by school"
            icon={
              <IoFilter
                size="16"
                className={`${schoolFilter !== '' && 'selectedBlue'}`}
              />
            }
          />
        </label>
      </Modal>
      <Modal
        show={showMulPopup}
        onClose={() => setShowMulPopup(false)}
        actionButtonText="Approve Transaction"
        handleAction={updateMulSchoolName}
        actionButtonDisabled={!allowApproval}
      >
        <div className="all-items">
          {multipleSelected.map((item, index) => (
            <>
              <h3 style={{ color: 'rgb(240, 56, 56)' }}>
                {item.teacherName}&apos;s school &quot;{item.schoolName}&quot;
                is not verified.
              </h3>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="inputLabel">
                New School Name
                <CustomCombobox
                  data={schoolNameList}
                  onChange={(selected) => {
                    const temp = [...mulSchoolFilter];
                    temp[index] = selected;
                    setMulSchoolFilter(temp);
                  }}
                  size="small"
                  placeholder="Search by school"
                  icon={
                    <IoFilter
                      size="16"
                      className={`${schoolFilter !== '' && 'selectedBlue'}`}
                    />
                  }
                />
              </label>
              <br />
            </>
          ))}
        </div>
      </Modal>
    </PageContainer>
  );
};

export default Transactions;

const isOverload = (data, index) => {
  for (const i in data.transactionItems) {
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
};
