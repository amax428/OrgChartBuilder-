import React from 'react';
import EmployeeCard from './EmployeeCard';

const ManagerRow = ({ manager, employees, onDrop }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>{manager.name} (Manager)</h3>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        borderBottom: '2px solid black',
        paddingBottom: '10px',
      }}>
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} onDrop={onDrop} />
        ))}
      </div>
    </div>
  );
};

export default ManagerRow;
