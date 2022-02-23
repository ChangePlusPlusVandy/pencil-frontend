/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';

import { getTeacherByID } from './api-transactions';

const MiniTransaction = ({
  transaction,
  teacher,
  createdAt,
  approveClick,
  denyClick,
}) => {
  const [teacherName, setTeacherName] = useState([]);
  //   console.log(createdAt);

  useEffect(() => {
    getTeacherByID(teacher).then((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        setTeacherName(`${result.firstName} ${result.lastName}`);
      }
    });
  });

  return (
    <div className="singleTransaction">
      <button
        type="button"
        className="accept"
        onClick={(e) => approveClick(e, transaction)}
      >
        ✔
      </button>
      <h1 className="transactionName">{teacherName}</h1>
      <button
        type="button"
        className="deny"
        onClick={(e) => denyClick(e, transaction)}
      >
        ✗
      </button>
    </div>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { MiniTransaction };
