import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Update with your FastAPI URL

export const getEmployees = async () => {
	try {
		const response = await axios.get(`${API_URL}/employees`);
		return response.data;
	} catch (error) {
		console.error('Error fetching employees:', error);
		throw error;
	}
};

export const updateManager = async (employeeId, newManagerId) => {
	try {
		const response = await axios.put(`${API_URL}/update_manager`, {
			employee_id: employeeId,
			new_manager_id: newManagerId,
		});
		return response.data;
	} catch (error) {
		console.error('Error updating manager:', error);
		throw error;
	}
};
