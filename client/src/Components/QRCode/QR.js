import React from 'react'
import QRCode from "react-qr-code";

export const QR = ({LinkValue}) => {
  return (
    <div className="qrcode-container">
      <QRCode
        value={LinkValue}
        fgColor={"#612d98"}
        bgColor={"#ffff00"}
        size={100}
        viewBox={`0 0 5 5`}
      />
    </div>
  )
}

export default QR; 
