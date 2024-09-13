import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Report.css'

export default function Report() {
  const [genderData, setGenderData] = useState({ male: 0, female: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/admin/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const employees = response.data;

        const maleCount = employees.filter(emp => emp.gender === 'Erkek').length;
        const femaleCount = employees.filter(emp => emp.gender === 'Kadın').length;

        setGenderData({
          male: maleCount,
          female: femaleCount
        });
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, []);

  const totalEmployees = genderData.male + genderData.female;
  const femalePercentage = totalEmployees === 0 ? 0 : (genderData.female / totalEmployees) * 100;
  const malePercentage = totalEmployees === 0 ? 0 : (genderData.male / totalEmployees) * 100;

  return (
    <div className="report-container">
      <h3 className="report-title">Raporlar</h3>
      <div className="report-grid-container">
        <div className="report-grid">
          {/* Mevcut rapor bölümleri buraya */}
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {/* Gender Distribution */}
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title mb-4">Kadın ve Erkek Çalışan Sayıları</h3>
                  <div className="progress mb-3" style={{ height: '30px' }}>
                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${femalePercentage}%` }} aria-valuenow={femalePercentage} aria-valuemin="0" aria-valuemax="100">
                      Kadın {genderData.female}
                    </div>
                  </div>
                  <div className="progress" style={{ height: '30px' }}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${malePercentage}%` }} aria-valuenow={malePercentage} aria-valuemin="0" aria-valuemax="100">
                      Erkek {genderData.male}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Marital Status */}
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title mb-4">Evli ve Bekar Çalışan Sayıları</h3>
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '150px', height: '150px' }}>
                        <div>
                          <h3 className="mb-0">70%</h3>
                          <p className="mb-0">Evli</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <span className="badge bg-primary me-2">Evli </span> 70
                        </li>
                        <li>
                          <span className="badge bg-secondary me-2">Bekar</span> 30
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title mb-4">Çalışma Sürelerine Göre Dağılımı</h3>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <div className="progress flex-grow-1 me-2" style={{ height: '25px' }}>
                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: '20%' }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">20%</div>
                      </div>
                      <span className="text-muted">0-1 Yıl</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <div className="progress flex-grow-1 me-2" style={{ height: '25px' }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>
                      </div>
                      <span className="text-muted">1-3 Yıl</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="progress flex-grow-1 me-2" style={{ height: '25px' }}>
                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '30%' }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">30%</div>
                      </div>
                      <span className="text-muted">3+ Yıl</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Children */}
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title mb-4">Çalışanların Çocuk Sayıları</h3>
                  <div className="row text-center">
                    <div className="col-6">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h1 className="display-4">👨‍👩‍👧‍👦</h1>
                          <h3>50</h3>
                          <p className="text-muted">Çocuklu</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h1 className="display-4">👫</h1>
                          <h3>50</h3>
                          <p className="text-muted">Çocuksuz</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
