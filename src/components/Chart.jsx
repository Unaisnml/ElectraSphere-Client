import React, { useState, useEffect, useRef } from 'react';
import Chart from 'react-apexcharts';
import { useGetOrdersQuery } from '../slices/orderApiSlice';
import { useGetUsersQuery } from '../slices/usersApiSlice'; // Assuming you have a slice for users
import {Loader} from './Loader'; // Assuming Loader is a default export
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const OrdersAndUsersChart = () => {
  const { data: orders, refetch, isLoading: isLoadingOrders, error: errorOrders } = useGetOrdersQuery();
  const { data: users,  isLoading: isLoadingUsers, error: errorUsers } = useGetUsersQuery();
  const chartRef = useRef(null);

  const [chartData, setChartData] = useState({
    series: [{
      name: 'Orders',
      data: []
    }, {
      name: 'Customers',
      data: []
    }],
    options: {
      chart: {
        id: 'chart2',
        type: 'line',
        height: 230,
        dropShadow: {
          enabled: true,
          enabledOnSeries: [1]
        },
        toolbar: {
          autoSelected: 'pan',
          show: false
        }
      },
      colors: ['#008FFB', '#00E396'],
      stroke: {
        width: [2, 6],
        curve: ['straight', 'monotoneCubic']
      },
      fill: {
        opacity: [1, 0.75],
      },
      markers: {
        size: 0
      },
      yaxis: [
        {
          seriesName: 'Orders',
          axisTicks: {
            show: true,
            color: '#008FFB'
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              colors: '#008FFB',
            }
          },
          title: {
            text: "Orders",
            style: {
              color: '#008FFB'
            }
          },
        },
        {
          seriesName: 'Customers',
          opposite: true,
          axisTicks: {
            show: true,
            color: '#00E396'
          },
          axisBorder: {
            show: true,
            color: '#00E396'
          },
          labels: {
            style: {
              colors: '#00E396'
            }
          },
          title: {
            text: "Customers",
            style: {
              color: '#00E396'
            }
          },
        }
      ],
      xaxis: {
        type: 'datetime'
      }
    }
  });

  useEffect(() => {
    if (orders && users) {
      const formatData = (data, dateField) => {
        return data.map(item => ({
          x: new Date(item[dateField]).getTime(),
          y: item.count || 1 // Assuming each entry is a count of 1 if there's no count field
        }));
      };

      const formattedOrders = formatData(orders, 'createdAt');
      const formattedUsers = formatData(users, 'createdAt');

      setChartData(prevState => ({
        ...prevState,
        series: [
          { name: 'Orders', data: formattedOrders },
          { name: 'Customers', data: formattedUsers }
        ]
      }));
    }
  }, [orders, users]);

  const downloadPDF = () => {
    const input = chartRef.current;
    html2canvas(input, { backgroundColor: '#ffffff' }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('chart.pdf');
    });
  };

  if (isLoadingOrders || isLoadingUsers) {
    return <Loader />;
  }

  if (errorOrders || errorUsers) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="app h-auto">
      <div className="row mx-auto">
        <div className="mixed-chart" ref={chartRef} style={{ backgroundColor: '#ffffff', padding: '10px' }}>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            height="230"
          />
        </div>
        <button className='text-red-600 mt-2 rounded-md px-2 py-2 shadow-xl ml-5 bg-white' onClick={downloadPDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default OrdersAndUsersChart;
