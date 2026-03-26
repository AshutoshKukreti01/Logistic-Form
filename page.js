'use client';

import { useState, useCallback } from 'react';
import OrderForm from '../components/OrderForm/OrderForm';
import ShipmentPreview from '../components/ShipmentPreview/ShipmentPreview';
import styles from './page.module.css';

function generateOrderId() {
  const prefix = 'SFG';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

const defaultPackage = () => ({
  id: crypto.randomUUID(),
  label: '',
  weight: '',
  length: '',
  width: '',
  height: '',
  declaredValue: '',
});

const initialState = {
  orderId: generateOrderId(),
  shipmentDate: '',
  deliveryType: 'standard',
  consignor: { name: '', address: '', city: '', pincode: '' },
  consignee: { name: '', address: '', city: '', pincode: '' },
  packages: [defaultPackage()],
  fragile: false,
  insurance: false,
};

export default function Home() {
  const [formData, setFormData] = useState(initialState);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleNestedChange = useCallback((section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  }, []);

  const handlePackageChange = useCallback((id, field, value) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.map(pkg =>
        pkg.id === id ? { ...pkg, [field]: value } : pkg
      ),
    }));
  }, []);

  const addPackage = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      packages: [...prev.packages, defaultPackage()],
    }));
  }, []);

  const removePackage = useCallback((id) => {
    setFormData(prev => {
      if (prev.packages.length <= 1) return prev;
      return { ...prev, packages: prev.packages.filter(p => p.id !== id) };
    });
  }, []);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>⬡</span>
            <span className={styles.logoText}>ShipForge</span>
          </div>
          <span className={styles.headerTag}>Logistics Order System</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          <section className={styles.formPanel}>
            <OrderForm
              formData={formData}
              onChange={handleChange}
              onNestedChange={handleNestedChange}
              onPackageChange={handlePackageChange}
              onAddPackage={addPackage}
              onRemovePackage={removePackage}
            />
          </section>
          <section className={styles.previewPanel}>
            <ShipmentPreview formData={formData} />
          </section>
        </div>
      </main>
    </div>
  );
}
