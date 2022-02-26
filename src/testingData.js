import printForm from './printForm';

const dummyData = [
  {
    itemId: 13,
    itemName: 'Pencils',
    maxLimit: 12,
    itemOrder: 0,
  },
  {
    itemId: 13,
    itemName: 'Clipboards',
    maxLimit: 1,
    itemOrder: 2,
  },
  {
    itemId: 13,
    itemName: 'Pens',
    maxLimit: 203,
    itemOrder: 1,
  },
  {
    itemId: 13,
    itemName: 'Markers',
    maxLimit: 15,
    itemOrder: 3,
  },
  {
    itemId: 13,
    itemName: 'Paper',
    maxLimit: 120,
    itemOrder: 10,
  },
  {
    itemId: 13,
    itemName: 'Sharpies',
    maxLimit: 120,
    itemOrder: 11,
  },
];

printForm(dummyData);
