import React from "react";

interface WhatsAppIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  size?: number;
}

export default function WhatsAppIcon({
  className = "w-5 h-5",
  size = 24,
  ...props
}: WhatsAppIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/whatsapp.png"
      alt="WhatsApp"
      width={size}
      height={size}
      className={`inline-block object-contain select-none pointer-events-none ${className}`}
      {...props}
    />
  );
}
