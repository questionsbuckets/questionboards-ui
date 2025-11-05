import VerifyNumber from '@/app-pages/auth/VerifyNumber'
import React, { Suspense } from 'react'

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyNumber />
    </Suspense>
  );
}

export default page
