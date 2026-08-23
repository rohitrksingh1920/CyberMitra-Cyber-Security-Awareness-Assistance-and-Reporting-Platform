import React from "react";

export default function MessageMock({item}) {
  if(item.type==="whatsapp") return (
    <div className="mock whatsapp">
      <div className="mock-head"><b>WhatsApp</b><span>••• 9:41</span></div>
      <div className="chat">
        <div className="bubble incoming"><small>Unknown +91 9xxxx-xxxxx</small>{item.message}</div>
        <div className="bubble outgoing">I won't share any details. I'll verify this first.</div>
      </div>
    </div>
  );

  if(item.type==="sms" || item.type==="alert") return (
    <div className="mock sms">
      <div className="sms-head"><b>Messages</b><span>NOW</span></div>
      <div className="sms-body"><small>UNKNOWN SENDER</small><p>{item.message}</p></div>
    </div>
  );

  if(item.type==="email") return (
    <div className="mock email">
      <div className="email-top"><b>Mail</b><span>•••</span></div>
      <div className="email-body"><small>From: security-alert@unknown.net</small><h5>URGENT SECURITY NOTICE</h5><p>{item.message}</p></div>
    </div>
  );

  if(item.type==="call") return (
    <div className="mock call">
      <div className="call-icon">☎</div>
      <b>Incoming video call</b>
      <strong>Unknown • Government Officer</strong>
      <p>{item.message}</p>
      <div className="call-actions"><span>Decline</span><span>Verify first</span></div>
    </div>
  );

  if(item.type==="upi") return (
    <div className="mock upi">
      <div className="upi-brand">UPI</div>
      <div><small>COLLECT REQUEST</small><h4>₹4,999 cashback</h4><p>{item.message}</p></div>
      <div className="upi-buttons"><span>Decline</span><span>Verify</span></div>
    </div>
  );

  return (
    <div className="mock permission">
      <div className="permission-icon">🔦</div>
      <b>Permission request</b>
      <p>{item.message}</p>
      <div className="permission-actions"><span>Deny</span><span>Review</span></div>
    </div>
  );
}
