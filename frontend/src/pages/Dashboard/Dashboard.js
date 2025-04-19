
import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalExpenses = async () => {
      try {
        const response = await api.get('/categories');
        console.log(response)
        setTotalExpenses(response.data.total);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar os dados.');
        setLoading(false);
      }
    };

    fetchTotalExpenses();
  }, []);

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.content}>
        <Card>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <div>
              <h2>Gastos Totais</h2>
              <p className={styles.total}>{`R$ ${totalExpenses?.toFixed(2)}`}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

