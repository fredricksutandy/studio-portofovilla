'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import CTASection from '../../../../../components/CTAaltone';

const RegionPage = () => {
  const pathname = usePathname(); // e.g. '/pages/region/bali'
  const [regionId, setRegionId] = useState<string | null>(null);

  useEffect(() => {
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    setRegionId(lastSegment);
  }, [pathname]);

  return (
    <div>
      <section>
        <h1>{regionId}</h1>
        <p>{regionId} region description</p>
      </section>

      <a href="#lorem">lorem</a>
      <a href={`/pages/sare-01`}>lorem</a>
      

      {regionId && <CTASection regionId={regionId} />}
    </div>
  );
};

export default RegionPage;
