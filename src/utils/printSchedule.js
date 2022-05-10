/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import {
  WidthType,
  Table,
  TableRow,
  TableCell,
  Paragraph,
  Document,
  AlignmentType,
  TextRun,
} from 'docx';

const columnTitles = [
  ['Time:', 1, 15],
  ['Name:', 1, 10],
  ['Pencil ID:', 1, 5],
  ['School:', 1, 20],
];
const columnCells = columnTitles.map(
  (title) =>
    new TableCell({
      // Make all cells the same with over 100% of the available page width
      width: { size: title[2], type: WidthType.PERCENTAGE },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: title[0],
              bold: true,
              size: 22,
              font: 'Calibri',
            }),
          ],
          alignment: AlignmentType.CENTER,
        }),
      ],
    })
);

let rowsArr = [];

function pushRowArr(splitItems) {
  rowsArr = [
    new TableRow({
      children: columnCells,
      width: { size: 100, type: WidthType.PERCENTAGE },
    }),
  ];

  for (const itemArr of splitItems) {
    const singleRow = [];
    for (const property in itemArr) {
      singleRow.push(
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: itemArr[property],
                  size: 22,
                  font: 'Calibri',
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
        })
      );
    }
    rowsArr.push(
      new TableRow({
        children: singleRow,
      })
    );
  }
}

function createFile() {
  const table = new Table({
    rows: rowsArr,
  });

  const doc = new Document({
    sections: [
      {
        children: [table],
        properties: {
          page: {
            margin: {
              right: 800,
              left: 800,
            },
          },
        },
      },
    ],
  });

  return doc;
}

export default function printForm(data) {
  pushRowArr(data);
  return createFile();
}
