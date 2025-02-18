import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EmployeeCard from './EmployeeCard';
import { getEmployees, updateManager } from '../api';

const OrgChart = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDrop = async (draggedId, newManagerId) => {
    setLoading(true);
    try {
      await updateManager(draggedId, newManagerId);
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === draggedId ? { ...emp, manager_id: newManagerId } : emp
        )
      );
      console.log(`Updated employee ${draggedId} to manager ${newManagerId}`);
    } catch (error) {
      console.error('Failed to update manager:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group employees by managers
  const managers = employees.filter(emp => emp.manager_id === null);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {loading && <p>Loading...</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {managers.map((manager) => (
            <div key={manager.id}>
              <EmployeeCard employee={manager} onDrop={handleDrop} />
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                padding: '10px',
              }}>
                {employees
                  .filter(emp => emp.manager_id === manager.id)
                  .map((developer) => (
                    <EmployeeCard key={developer.id} employee={developer} onDrop={handleDrop} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default OrgChart;
