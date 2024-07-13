import React, { useEffect, useState } from 'react'
import { Data } from '../../db';

function CustomerTable({ onCustomerSelect }) {
  
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      // const customersResponse = await axios.get('http://localhost:3001/customers');
      // const transactionsResponse = await axios.get('http://localhost:3001/transactions');
      
      const customers = Data.customers;
      const transactions = Data.transactions;

      
      const combinedData = transactions.map(transaction => {
        const customer = customers.find(customer => Number(customer.id) === transaction.customer_id);
    
        return { ...transaction, customerName: customer ? customer.name : 'Unknown' };
      });

     

      setData(combinedData);
    };

    fetchData();
  }, []);

  const handleRowClick = (customerId) => {
    onCustomerSelect(customerId);
  };
  
  return (
    <section className='container py-5 d-flex flex-column justify-content-center'>
        <input
         type='text'
         placeholder='Filter by name or amount'
         value={filter}
         onChange={e=>setFilter(e.target.value)}
         className='w-50 mx-auto form-control mb-4'
        />
        <div className="responsive_table">
            <table className='mb-0 table text-center'>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter(item => 
                  item.customerName.toLowerCase().includes(filter.toLowerCase()) ||
                  item.amount.toString().includes(filter)
                )
                .map(item => (
                  <tr key={item.id} onClick={() => handleRowClick(item.customer_id)}>
                    <td>{item.customerName}</td>
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      
    </section>
  )
}

export default CustomerTable