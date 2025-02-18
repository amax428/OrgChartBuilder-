import React, { useEffect, useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { getEmployees, updateManager } from "../api"; // Import API calls

const OrgChart = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employees from API.js
  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
      buildGraph(data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  // Convert employees into nodes and edges
  const buildGraph = (employees) => {
    const nodeList = employees.map((emp, index) => ({
      id: emp.id.toString(),
      data: { label: `${emp.name} (${emp.title})` },
      position: { x: index * 200, y: emp.manager_id ? 150 : 50 },
      style: { border: "1px solid black", padding: 10, borderRadius: 8, background: "lightblue" },
      draggable: true,
    }));

    const edgeList = employees
      .filter((emp) => emp.manager_id !== null)
      .map((emp) => ({
        id: `edge-${emp.id}`,
        source: emp.manager_id.toString(),
        target: emp.id.toString(),
        animated: true,
        type: "smoothstep",
      }));

    setNodes(nodeList);
    setEdges(edgeList);
  };

  // Handle drag-and-drop to change manager
  const onConnect = useCallback(async (connection) => {
    const { source, target } = connection;

    if (!source || !target) return;

    setLoading(true);
    try {
      await updateManager(parseInt(target), parseInt(source));

      // Update local state
      const updatedEmployees = employees.map((emp) =>
        emp.id.toString() === target ? { ...emp, manager_id: parseInt(source) } : emp
      );
      setEmployees(updatedEmployees);
      buildGraph(updatedEmployees);
    } catch (error) {
      console.error("Error updating manager:", error);
    }
    setLoading(false);
  }, [employees]);

  return (
    <div style={{ width: "100vw", height: "90vh", border: "1px solid gray" }}>
      {loading && <p>Updating manager...</p>}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default OrgChart;
