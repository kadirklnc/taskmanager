import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SearchBar from '../Common/SearchBar';
import EmployeeFormModal from './EmployeeFormModal';

const Employees = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [originalEmployee, setOriginalEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/admin/getAll', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEmployees(response.data || []);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleSearch = (query) => {
        setSearchTerm(query.toLowerCase());
    };

    const filteredEmployees = employees.filter(employee =>
        Object.values(employee).some(value =>
            value ? value.toString().toLowerCase().includes(searchTerm) : false
        )
    );

    const handleSelectEmployee = (id) => {
        const selectedEmployee = employees.find(emp => emp.id === parseInt(id));
        setCurrentEmployee({ ...selectedEmployee });
        setOriginalEmployee({ ...selectedEmployee });
        setShowModal(true);
    };

    const handleSave = async () => {
        console.log('testttttttt')
        if (!currentEmployee) return;

        try {
            const token = localStorage.getItem('token');
            const data = {};
            
            console.log(currentEmployee)

            // Compare currentEmployee with originalEmployee and only add changed fields to data
            for (const key in currentEmployee) {
                if (currentEmployee[key] !== originalEmployee[key]) {
                    data[key] = key === 'date' ? formatDateToDatabase(currentEmployee[key]) : currentEmployee[key];
                }
            }

            let response;

            if (currentEmployee.id) {
                // Update existing employee
                response = await axios.put(`http://localhost:8080/api/admin/update/${currentEmployee.id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        // 'Content-Type': 'application/json'
                    }
                });
            } else {
                // Create new employee
                const { id, ...employeeWithoutId } = currentEmployee;
                console.log("test",employeeWithoutId)
                response = await axios.post('http://localhost:8080/api/admin/add', employeeWithoutId, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        // 'Content-Type': 'application/json'
                    }
                });
            }

            if (response.status === 200 || response.status === 201) {
                // Update the employee list
                const updatedEmployees = currentEmployee.id
                    ? employees.map(employee => employee.id === currentEmployee.id ? { ...currentEmployee } : employee)
                    : [...employees, response.data];
                setEmployees(updatedEmployees);
                setShowModal(false);
            } else {
                console.error('Failed to save employee:', response);
            }
        } catch (error) {
            console.error('Error saving employee data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'is_active' ? parseInt(value) : value;
        setCurrentEmployee(prevState => ({ ...prevState, [name]: updatedValue }));
    };

    const formatDateToDisplay = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${year}-${month}-${day}`;
    };
    
    const formatDateToDatabase = (dateString) => {
        if (!dateString) return '';
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`;
    };
    
    

    return (
        <div className="employee-list-container">
            <div className="employee-list-header">
                <h3>Çalışanlar ({filteredEmployees.length})</h3>
                <div className="employee-list-actions">
                    <Button variant="outline-success">İçe Aktar</Button>
                    <Button variant="success" onClick={() => {
                        setCurrentEmployee({
                             id: null, //yeni calisan diye id null olur
                            name: '',
                            surname: '',
                            password:'',
                            phone: '',
                            email: '',
                            date: '',
                            department: '',
                            gender:'',
                            is_active: '',
                        });
                        setOriginalEmployee(null);
                        setShowModal(true);
                    }}>
                        + Yeni Çalışan Oluştur
                    </Button>
                </div>
            </div>
            <SearchBar onSearch={handleSearch} placeholder="Çalışan Ara" />
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Adı Soyadı</th>
                            <th>Telefon No</th>
                            <th>E-posta</th>
                            
                            <th>Doğum Tarihi</th>
                            <th>Departman</th>
                            <th>Cinsiyet</th>
                            <th>Aktif Durumu</th>
                            <th>Aksiyonlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name} {employee.surname}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.email}</td>
                                <td>{formatDateToDisplay(employee.date)}</td>
                                <td>{employee.department}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.is_active ? 'Evet' : 'Hayır'}</td>
                                <td>
                                    <Button variant="info" onClick={() => handleSelectEmployee(employee.id)}>
                                        Düzenle
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <EmployeeFormModal
                showModal={showModal}
                handleClose={() => setShowModal(false)}
                handleChange={handleChange}
                handleSave={handleSave}
                currentEmployee={currentEmployee}
            />
        </div>
    );
};

export default Employees;
