'use client';
// Official supplied COSMOS Innovation Labs logo (proportions preserved).
import logo from '@/assets/cosmos-logo-official.png';

export function CosmosLogo() {
  return (
    <span className="cosmos-logo">
      <img src={logo.src} alt="COSMOS Innovation Labs" width={520} height={406} />
    </span>
  );
}
