import { useDrag, useDrop } from 'react-dnd';
import React from 'react';

const EmployeeCard = ({ employee, onDrop }) => {
  const isManager = employee.manager_id === null;

  const [{ isDragging }, drag] = useDrag({
    type: 'EMPLOYEE',
    item: { id: employee.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'EMPLOYEE',
    drop: (item) => onDrop(item.id, employee.id), // Change manager
  });

  return (
    <div
      ref={isManager ? drop : drag} // Managers are drop targets, Developers are draggable
      className="employee-card"
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isManager ? '#ffcccb' : 'lightblue', // Different colors
        padding: '10px',
        margin: '5px',
        border: '1px solid black',
        borderRadius: '8px',
        cursor: isManager ? 'default' : 'move',
        textAlign: 'center',
        minWidth: '120px',
      }}
    >
      <strong>{employee.name}</strong>
      <br />
      <small>{employee.title}</small>
    </div>
  );
};

export default EmployeeCard;
