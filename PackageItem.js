'use client';

import { useState } from 'react';
import styles from './PackageItem.module.css';

export default function PackageItem({ pkg, index, onChange, onRemove, canRemove }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const volumetricWeight = (() => {
    const l = parseFloat(pkg.length);
    const w = parseFloat(pkg.width);
    const h = parseFloat(pkg.height);
    if (l && w && h) return ((l * w * h) / 5000).toFixed(2);
    return null;
  })();

  return (
    <div className={styles.card}>
      <div className={styles.header} onClick={() => setIsExpanded(v => !v)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setIsExpanded(v => !v)}>
        <div className={styles.headerLeft}>
          <span className={styles.pkgIndex}>P{index + 1}</span>
          <span className={styles.pkgName}>{pkg.label || `Package ${index + 1}`}</span>
          {pkg.weight && <span className={styles.pkgWeight}>{pkg.weight} kg</span>}
        </div>
        <div className={styles.headerRight}>
          {canRemove && (
            <button
              className={styles.removeBtn}
              onClick={e => { e.stopPropagation(); onRemove(pkg.id); }}
              type="button"
              aria-label="Remove package"
            >
              ✕
            </button>
          )}
          <span className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}>›</span>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.body}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor={`${pkg.id}-label`}>Package Label</label>
            <input
              id={`${pkg.id}-label`}
              className={styles.input}
              type="text"
              placeholder="e.g. Electronics Box A"
              value={pkg.label}
              onChange={e => onChange(pkg.id, 'label', e.target.value)}
            />
          </div>

          <div className={styles.row3}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor={`${pkg.id}-length`}>Length (cm)</label>
              <input
                id={`${pkg.id}-length`}
                className={styles.input}
                type="number"
                placeholder="0"
                min="0"
                value={pkg.length}
                onChange={e => onChange(pkg.id, 'length', e.target.value)}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor={`${pkg.id}-width`}>Width (cm)</label>
              <input
                id={`${pkg.id}-width`}
                className={styles.input}
                type="number"
                placeholder="0"
                min="0"
                value={pkg.width}
                onChange={e => onChange(pkg.id, 'width', e.target.value)}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor={`${pkg.id}-height`}>Height (cm)</label>
              <input
                id={`${pkg.id}-height`}
                className={styles.input}
                type="number"
                placeholder="0"
                min="0"
                value={pkg.height}
                onChange={e => onChange(pkg.id, 'height', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row2}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor={`${pkg.id}-weight`}>Weight (kg)</label>
              <input
                id={`${pkg.id}-weight`}
                className={styles.input}
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={pkg.weight}
                onChange={e => onChange(pkg.id, 'weight', e.target.value)}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor={`${pkg.id}-value`}>Declared Value (₹)</label>
              <input
                id={`${pkg.id}-value`}
                className={styles.input}
                type="number"
                placeholder="0"
                min="0"
                value={pkg.declaredValue}
                onChange={e => onChange(pkg.id, 'declaredValue', e.target.value)}
              />
            </div>
          </div>

          {volumetricWeight && (
            <div className={styles.volumetric}>
              <span className={styles.volumetricLabel}>Volumetric Weight:</span>
              <span className={styles.volumetricValue}>{volumetricWeight} kg</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
