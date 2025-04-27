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
      <div className="row g-4">
        {/* Gender Distribution */}
        <div className="col-md-6">
          <div className="card report-card">
            <div className="card-body">
              <h3 className="card-title">Cinsiyet Dağılımı</h3>
              <div className="progress mb-3" style={{ height: '30px' }}>
                <div 
                  className="progress-bar female-bar" 
                  style={{ width: `${femalePercentage}%` }}
                >
                  Kadın ({genderData.female})
                </div>
              </div>
              <div className="progress" style={{ height: '30px' }}>
                <div 
                  className="progress-bar male-bar" 
                  style={{ width: `${malePercentage}%` }}
                >
                  Erkek ({genderData.male})
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marital Status */}
        <div className="col-md-6">
          <div className="card report-card">
            <div className="card-body">
              <h3 className="card-title">Medeni Durum</h3>
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="status-circle">
                    <div>
                      <h3 className="mb-0">70%</h3>
                      <p className="mb-0">Evli</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex flex-column gap-2">
                    <div className="status-badge bg-success">Evli: 70</div>
                    <div className="status-badge bg-secondary">Bekar: 30</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="col-md-6">
          <div className="card report-card">
            <div className="card-body">
              <h3 className="card-title">Çalışma Süreleri</h3>
              <div className="mt-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="progress experience-bar flex-grow-1">
                    <div className="progress-bar bg-success" style={{ width: '20%' }}>20%</div>
                  </div>
                  <span className="experience-label ms-3">0-1 Yıl</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="progress experience-bar flex-grow-1">
                    <div className="progress-bar bg-info" style={{ width: '50%' }}>50%</div>
                  </div>
                  <span className="experience-label ms-3">1-3 Yıl</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="progress experience-bar flex-grow-1">
                    <div className="progress-bar bg-warning" style={{ width: '30%' }}>30%</div>
                  </div>
                  <span className="experience-label ms-3">3+ Yıl</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Children Count */}
        <div className="col-md-6">
          <div className="card report-card">
            <div className="card-body">
              <h3 className="card-title">Çocuk Durumu</h3>
              <div className="row g-3 mt-2">
                <div className="col-6">
                  <div className="children-card p-3 text-center">
                    <div className="emoji-display">👨‍👩‍👧‍👦</div>
                    <div className="count-display">50</div>
                    <p className="text-muted mb-0">Çocuklu</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="children-card p-3 text-center">
                    <div className="emoji-display">👫</div>
                    <div className="count-display">50</div>
                    <p className="text-muted mb-0">Çocuksuz</p>
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
