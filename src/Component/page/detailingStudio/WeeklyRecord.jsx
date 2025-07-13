import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useGetAlldetailingStudioBilQuery } from '../../../features/Api';
import CustomTable from '../../common/CustomTable';

function WeeklyRecord() {
  const [weeklyDetailingStudioSales, setWeeklyDetailingStudioSales] = useState([]);
  const { data: detailingStudioData = {}, isSuccess } = useGetAlldetailingStudioBilQuery();

  useEffect(() => {
    if (isSuccess && detailingStudioData) {
      console.log("Raw API Data:", detailingStudioData);

      const now = moment(); // today
      const currentMonth = now.month(); // 0-based (July = 6)
      const currentYear = now.year();
      const todayDay = now.date();

      // Determine current week's day range
      let startDay = 1;
      let endDay = 7;

      if (todayDay >= 1 && todayDay <= 7) {
        startDay = 1;
        endDay = 7;
      } else if (todayDay >= 8 && todayDay <= 15) {
        startDay = 8;
        endDay = 15;
      } else if (todayDay >= 16 && todayDay <= 23) {
        startDay = 16;
        endDay = 23;
      } else {
        startDay = 24;
        endDay = 31;
      }

      const weeklySales = detailingStudioData.filter((record) => {
        if (!record.createdAt) return false;

        const recordDate = moment(record.createdAt);

        return (
          recordDate.isValid() &&
          recordDate.month() === currentMonth &&
          recordDate.year() === currentYear &&
          recordDate.date() >= startDay &&
          recordDate.date() <= endDay
        );
      });

      const categorizedSales = weeklySales.map((record, index) => ({
        Sr_No: index + 1,
        Week: `Week (${startDay}-${endDay})`,
        Date: moment(record.createdAt).format("YYYY-MM-DD"),
        CarName: record.carName,
        Detailing_Master: record.detailingMaster,
        Commission: record.commission,
        Bill: record.detailingBill,
      }));

      setWeeklyDetailingStudioSales(categorizedSales);
    }
  }, [detailingStudioData, isSuccess]);

  const weeklyDetailingStudioColumns = [
    "Sr_No",
    "Week",
    "Date",
    "CarName",
    "Detailing_Master",
    "Commission",
    "Bill"
  ];

  return (
    <div className='w-[90%]'>
      <div>
        <h1 className='my-4 font-[500] text-[24px]'>
          Weekly Sale Record (Only Current Week)
        </h1>
      </div>
      <div>
        <CustomTable rows={weeklyDetailingStudioSales} columns={weeklyDetailingStudioColumns} />
      </div>
    </div>
  );
}

export default WeeklyRecord;
