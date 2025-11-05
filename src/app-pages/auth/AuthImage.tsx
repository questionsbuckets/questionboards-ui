import Image from 'next/image'
import React from 'react'

function AuthImage() {
  return (
    <div className="hidden md:flex w-[60%] h-full relative">
      <Image
        src="/images/auth-login.png"
        alt="banner"
        width={500}
        height={400}
        className="rounded-2xl p-2 w-full object-cover -scale-x-100"
      />
    </div>
  )
}

export default AuthImage
