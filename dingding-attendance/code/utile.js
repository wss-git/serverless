const dayjs = require('dayjs');
const years = require('./years');

function getNationalRegulations(today = dayjs().format('MM.DD')) {
  const currentYear = years[dayjs().get('year')];

  if (currentYear) {
    const { work, holiday } = currentYear;
    if (work.includes(today)) {
      return 'work';
    }
    if (holiday.includes(today)) {
      return 'holiday';
    }
  } else {
    console.log('没有找到假期安排表');
  }
  return '';
}

function getNeedWork(timeStamp) {
  if (!timeStamp) {
    timeStamp = dayjs().valueOf();
  }
  const nationalRegulations = getNationalRegulations(dayjs(timeStamp).format('MM.DD'));
  console.log('nationalRegulations: ', nationalRegulations);
  if (nationalRegulations === 'holiday') {
    return false;
  } else if (nationalRegulations === 'work') {
    return true;
  }

  const d = dayjs().get('day');
  console.log('周: ', d + 1);
  return ![0, 6].includes(d);
}

module.exports = {
  getNeedWork,
  getNationalRegulations,
};
