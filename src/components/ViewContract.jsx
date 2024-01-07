import React from 'react';

function PolygonExplorerLinks() {
  const contracts = [
    { name: 'DiamondCutFacet', address: '0xA1c310E5a0D1faF61d0Dfa4754eED83bA556FabA' },
    { name: 'DiamondLoupeFacet', address: '0xF0d494A191638d34e5b91Bf92Bcd9d6f3395Df42' },
    { name: 'OwnershipFacet', address: '0xc96Eb9aecF23Fb6a50a6400b1272cA8abbA233D9' },
    { name: 'ContractA', address: '0xcc024D5736ca32c7c20815970a77108DBfeA6dC2' },
    { name: 'ContractAUpagedable', address: '0x646a25B42a9c4bAFD3AD45bC1Edd2cE443E4B312' },
    // Add more contracts as needed
  ];
  // https://testnet.bscscan.com/address/0xA1c310E5a0D1faF61d0Dfa4754eED83bA556FabA#code
  const explorerURL = ' https://testnet.bscscan.com/address/';

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
  };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#333',
    margin: '8px 0',
  };

  const iconStyle = {
    marginRight: '10px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center' }}>BNB Explorer Links</h1>
      <ul style={listStyle}>
        {contracts.map((contract, index) => (
          <li key={index}>
            <a
              href={`${explorerURL}${contract.address}/#code`}
              style={linkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={iconStyle}>
                <path d="M3 3h18v18H3V3zm5.53 4.88L12 6.5l3.47 1.38L12 9.26l-3.47-1.38zm0 4L12 10.5l3.47 1.38L12 13.26l-3.47-1.38zm0 4L12 14.5l3.47 1.38L12 17.26l-3.47-1.38zm0 4L12 18.5l3.47 1.38L12 21.26l-3.47-1.38z" />
              </svg>
              {contract.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PolygonExplorerLinks;
