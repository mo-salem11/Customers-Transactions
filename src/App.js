import { useEffect, useState } from 'react';
import './App.css';
import CustomerTable from './Components/CustomerTable/CustomerTable';
import TransactionChart from './Components/TransactionChart/TransactionChart'
import { ErrorBoundary } from './Components/ErrorBounry';
function App() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  
  const handleCustomerSelect = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  useEffect(() => {
    if (selectedCustomerId) {
      const transactionChartSection = document.getElementById('transaction-chart-section');
      if (transactionChartSection) {
        transactionChartSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedCustomerId]);
  
  return (
   <>
      
      <ErrorBoundary>
          <CustomerTable onCustomerSelect={handleCustomerSelect} />
          {selectedCustomerId && (
        <section id='transaction-chart-section'>
          <h2 className='text-center text-muted mb-4'>Transaction Chart</h2>
          <TransactionChart   customerId={selectedCustomerId} />
        </section> )}
        </ErrorBoundary>
   </>
  );
}

export default App;
