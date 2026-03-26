'use client';

import styles from './ShipmentPreview.module.css';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatCurrency(val) {
  const n = parseFloat(val);
  if (!n) return '₹0';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function ShipmentPreview({ formData }) {
  const { orderId, shipmentDate, deliveryType, consignor, consignee, packages, fragile, insurance } = formData;

  const totalWeight = packages.reduce((sum, p) => sum + (parseFloat(p.weight) || 0), 0);
  const totalValue = packages.reduce((sum, p) => sum + (parseFloat(p.declaredValue) || 0), 0);
  const totalPackages = packages.length;

  const isExpress = deliveryType === 'express';

  return (
    <div className={styles.preview}>
      {/* Header */}
      <div className={styles.previewHeader}>
        <div className={styles.previewHeaderTop}>
          <div>
            <p className={styles.previewLabel}>Shipment Summary</p>
            <p className={styles.previewOrderId}>{orderId}</p>
          </div>
          <span className={`${styles.deliveryBadge} ${isExpress ? styles.deliveryBadgeExpress : styles.deliveryBadgeStandard}`}>
            {isExpress ? '⚡ Express' : '🚚 Standard'}
          </span>
        </div>
        <div className={styles.previewMeta}>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>📅</span>
            {formatDate(shipmentDate)}
          </span>
          {(fragile || insurance) && (
            <div className={styles.badges}>
              {fragile && <span className={styles.flagBadge} data-type="fragile">🔮 Fragile</span>}
              {insurance && <span className={styles.flagBadge} data-type="insured">🛡️ Insured</span>}
            </div>
          )}
        </div>
      </div>

      {/* Route */}
      <div className={styles.route}>
        <div className={styles.routeParty}>
          <p className={styles.routeRole}>FROM</p>
          <p className={styles.routeName}>{consignor.name || <span className={styles.empty}>—</span>}</p>
          {(consignor.address || consignor.city) && (
            <p className={styles.routeAddress}>
              {[consignor.address, consignor.city, consignor.pincode].filter(Boolean).join(', ')}
            </p>
          )}
        </div>

        <div className={styles.routeArrow}>
          <div className={styles.routeLine} />
          <span className={styles.routeDot}>→</span>
          <div className={styles.routeLine} />
        </div>

        <div className={`${styles.routeParty} ${styles.routePartyRight}`}>
          <p className={styles.routeRole}>TO</p>
          <p className={styles.routeName}>{consignee.name || <span className={styles.empty}>—</span>}</p>
          {(consignee.address || consignee.city) && (
            <p className={styles.routeAddress}>
              {[consignee.address, consignee.city, consignee.pincode].filter(Boolean).join(', ')}
            </p>
          )}
        </div>
      </div>

      {/* Summary stats */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{totalPackages}</span>
          <span className={styles.statLabel}>Packages</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statValue}>{totalWeight > 0 ? `${totalWeight.toFixed(2)} kg` : '—'}</span>
          <span className={styles.statLabel}>Total Weight</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statValue}>{totalValue > 0 ? formatCurrency(totalValue) : '—'}</span>
          <span className={styles.statLabel}>Declared Value</span>
        </div>
      </div>

      {/* Package list */}
      <div className={styles.packageSection}>
        <p className={styles.packageSectionTitle}>Package Details</p>
        <div className={styles.packageList}>
          {packages.map((pkg, i) => {
            const hasDetails = pkg.label || pkg.weight || pkg.length;
            return (
              <div key={pkg.id} className={styles.packageCard}>
                <div className={styles.packageCardHeader}>
                  <div className={styles.packageCardLeft}>
                    <span className={styles.packageIdx}>P{i + 1}</span>
                    <span className={styles.packageName}>{pkg.label || `Package ${i + 1}`}</span>
                  </div>
                  {pkg.declaredValue && (
                    <span className={styles.packageValue}>{formatCurrency(pkg.declaredValue)}</span>
                  )}
                </div>

                {hasDetails && (
                  <div className={styles.packageDetails}>
                    {pkg.weight && (
                      <span className={styles.detailChip}>⚖️ {pkg.weight} kg</span>
                    )}
                    {(pkg.length && pkg.width && pkg.height) && (
                      <span className={styles.detailChip}>📐 {pkg.length}×{pkg.width}×{pkg.height} cm</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerLogo}>⬡ ShipForge</div>
        <span className={styles.footerText}>Auto-generated preview · Not a shipping label</span>
      </div>
    </div>
  );
}
