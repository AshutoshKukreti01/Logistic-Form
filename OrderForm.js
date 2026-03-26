'use client';

import PackageItem from '../PackageItem/PackageItem';
import styles from './OrderForm.module.css';

export default function OrderForm({
  formData,
  onChange,
  onNestedChange,
  onPackageChange,
  onAddPackage,
  onRemovePackage,
}) {
  return (
    <div className={styles.form}>
      {/* ===== SHIPMENT DETAILS ===== */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>📦</span>
          <h2 className={styles.sectionTitle}>Shipment Details</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Order ID</label>
            <input
              className={`${styles.input} ${styles.inputReadonly}`}
              type="text"
              value={formData.orderId}
              readOnly
              aria-readonly="true"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="shipmentDate">
              Shipment Date <span className={styles.required}>*</span>
            </label>
            <input
              id="shipmentDate"
              className={styles.input}
              type="date"
              value={formData.shipmentDate}
              onChange={e => onChange('shipmentDate', e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Delivery Type</label>
            <div className={styles.radioGroup}>
              {['standard', 'express'].map(type => (
                <label key={type} className={`${styles.radioCard} ${formData.deliveryType === type ? styles.radioCardActive : ''}`}>
                  <input
                    type="radio"
                    name="deliveryType"
                    value={type}
                    checked={formData.deliveryType === type}
                    onChange={() => onChange('deliveryType', type)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioIndicator} />
                  <span className={styles.radioLabel}>
                    {type === 'standard' ? '🚚 Standard' : '⚡ Express'}
                  </span>
                  <span className={styles.radioSub}>
                    {type === 'standard' ? '5–7 business days' : '1–2 business days'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== CONSIGNOR ===== */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>📤</span>
          <h2 className={styles.sectionTitle}>Consignor <span className={styles.sectionSub}>Sender</span></h2>
        </div>
        <div className={styles.fields}>
          <PersonFields
            data={formData.consignor}
            section="consignor"
            onChange={onNestedChange}
          />
        </div>
      </div>

      {/* ===== CONSIGNEE ===== */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>📥</span>
          <h2 className={styles.sectionTitle}>Consignee <span className={styles.sectionSub}>Receiver</span></h2>
        </div>
        <div className={styles.fields}>
          <PersonFields
            data={formData.consignee}
            section="consignee"
            onChange={onNestedChange}
          />
        </div>
      </div>

      {/* ===== PACKAGES ===== */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>🗃️</span>
          <h2 className={styles.sectionTitle}>Packages
            <span className={styles.badge}>{formData.packages.length}</span>
          </h2>
        </div>

        <div className={styles.packageList}>
          {formData.packages.map((pkg, index) => (
            <PackageItem
              key={pkg.id}
              pkg={pkg}
              index={index}
              onChange={onPackageChange}
              onRemove={onRemovePackage}
              canRemove={formData.packages.length > 1}
            />
          ))}
        </div>

        <button className={styles.addPackageBtn} onClick={onAddPackage} type="button">
          <span className={styles.addIcon}>+</span>
          Add Another Package
        </button>
      </div>

      {/* ===== ADDITIONAL OPTIONS ===== */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>⚙️</span>
          <h2 className={styles.sectionTitle}>Additional Options</h2>
        </div>
        <div className={styles.checkboxGroup}>
          <label className={`${styles.checkCard} ${formData.fragile ? styles.checkCardActive : ''}`}>
            <input
              type="checkbox"
              checked={formData.fragile}
              onChange={e => onChange('fragile', e.target.checked)}
              className={styles.checkInput}
            />
            <span className={styles.checkIcon}>🔮</span>
            <div className={styles.checkText}>
              <span className={styles.checkLabel}>Fragile</span>
              <span className={styles.checkSub}>Handle with extreme care</span>
            </div>
            <span className={`${styles.checkMark} ${formData.fragile ? styles.checkMarkActive : ''}`} />
          </label>

          <label className={`${styles.checkCard} ${formData.insurance ? styles.checkCardActive : ''}`}>
            <input
              type="checkbox"
              checked={formData.insurance}
              onChange={e => onChange('insurance', e.target.checked)}
              className={styles.checkInput}
            />
            <span className={styles.checkIcon}>🛡️</span>
            <div className={styles.checkText}>
              <span className={styles.checkLabel}>Insurance Required</span>
              <span className={styles.checkSub}>Cover loss or damage</span>
            </div>
            <span className={`${styles.checkMark} ${formData.insurance ? styles.checkMarkActive : ''}`} />
          </label>
        </div>
      </div>
    </div>
  );
}

function PersonFields({ data, section, onChange }) {
  return (
    <>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor={`${section}-name`}>Full Name</label>
        <input
          id={`${section}-name`}
          className={styles.input}
          type="text"
          placeholder="e.g. Rahul Sharma"
          value={data.name}
          onChange={e => onChange(section, 'name', e.target.value)}
        />
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor={`${section}-address`}>Address</label>
        <input
          id={`${section}-address`}
          className={styles.input}
          type="text"
          placeholder="Street, Area"
          value={data.address}
          onChange={e => onChange(section, 'address', e.target.value)}
        />
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor={`${section}-city`}>City</label>
          <input
            id={`${section}-city`}
            className={styles.input}
            type="text"
            placeholder="City"
            value={data.city}
            onChange={e => onChange(section, 'city', e.target.value)}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor={`${section}-pincode`}>Pincode</label>
          <input
            id={`${section}-pincode`}
            className={styles.input}
            type="text"
            placeholder="110001"
            maxLength={6}
            value={data.pincode}
            onChange={e => onChange(section, 'pincode', e.target.value.replace(/\D/g, ''))}
          />
        </div>
      </div>
    </>
  );
}
