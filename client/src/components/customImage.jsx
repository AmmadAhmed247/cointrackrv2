import { Image } from '@imagekit/react';



export default function Page({alt,src,w,h,className}) {
  return (
    <Image
      urlEndpoint={`${import.meta.env.VITE_IK_END_POINT}`}
      src={src}
      width={w}
      height={h}
      alt={alt}
      className={className}
    />
  )
}