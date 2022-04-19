/* eslint-disable no-restricted-syntax */
import {
  WidthType,
  Table,
  TableRow,
  TableCell,
  Paragraph,
  Document,
  HeightRule,
  AlignmentType,
  TextRun,
} from 'docx';

const columnTitles = [
  ['Date/Time:', 1, 19],
  ['Name:', 1, 10],
  ['Pencil ID:', 1, 6],
  ['Phone Number:', 1, 20],
  ['School:', 1, 22],
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
      columnSpan: title[1],
    })
);

let rowsArr = [];

function pushRowArr(splitItems) {
  rowsArr = [
    new TableRow({
      children: columnCells,
      width: { size: 100, type: WidthType.PERCENTAGE },
      height: { value: 900, rule: HeightRule.EXACT },
    }),
  ];

  for (const itemArr of splitItems) {
    const singleRow = [];
    for (const item of itemArr) {
      singleRow.push(
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: item['Item.itemName'],
                  bold: true,
                  font: 'Calibri',
                  size: 22,
                }),
              ],
            }),
          ],
          // width: { size: 100 / 8 * 2, type: WidthType.PERCENTAGE }
        })
      );
      singleRow.push(
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: item.maxLimit.toString(),
                  bold: true,
                  font: 'Calibri',
                  size: 22,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          // width: { size: 100 / 8 * 1, type: WidthType.PERCENTAGE }
        })
      );
      singleRow.push(
        new TableCell({
          children: [new Paragraph('      ')],
          // width: { size: 100 / 8 * 1, type: WidthType.PERCENTAGE }
        })
      );
    }
    rowsArr.push(
      new TableRow({
        children: singleRow,
        height: { value: 300, rule: HeightRule.EXACT },
        // width: { size: 100 / newTitles.length, type: WidthType.PERCENTAGE }
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
