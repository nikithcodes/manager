import React from 'react';

const TermsPrivacyContent = () => (
  <div className="space-y-6 text-gray-700 text-sm max-h-[60vh] overflow-y-auto pr-2">
    <section>
      <h3 className="text-lg font-semibold mb-2">Terms & Conditions</h3>
      <ul className="list-disc list-inside">
        <li>Users are responsible for account confidentiality.</li>
        <li>No misuse or illegal activities allowed.</li>
        <li>Users manage and own their content.</li>
        <li>Accounts may be suspended for violations.</li>
        <li>Terms may change without prior notice.</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">Privacy Policy</h3>
      <ul className="list-disc list-inside">
        <li>We collect email, password, and usage data.</li>
        <li>Data used only to improve and secure the service.</li>
        <li>No sharing or selling of personal data.</li>
        <li>Cookies used for sessions and analytics.</li>
        <li>Standard security measures to protect data.</li>
      </ul>
    </section>
  </div>
);

export default TermsPrivacyContent;
