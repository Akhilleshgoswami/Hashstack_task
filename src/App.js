import logo from './logo.svg';
import './App.css';
import ContractInteractionComponent from './components/Home';
import PolygonExplorerLinks from './components/ViewContract';
import ConnectButton from './components/Connect';
import { useEffect } from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi'

import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { mainnet } from 'viem/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import {
bscTestnet
} from 'wagmi/chains';

const projectId = 'b95139b279b9c31242fff354677502a4'


// 2. Set chains
// const mainnet = {
//   chainId: 97,
//   name: 'bsctestnet',
//   currency: 'TBSC',
//   explorerUrl: 'https://etherscan.io',
//   rpcUrl: 'https://cloudflare-eth.com'
// }

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ 
    metadata,
    defaultChainId: 97,
    enableEIP6963: true,
    enableInjected: true,
    enableCoinbase: true,
    rpcUrl: '...' // used for the Coinbase SDK
  }),
  chains: [bscTestnet],
  projectId
})

function App() {
return ( 

<div className="App">
  <ConnectButton/>
<ContractInteractionComponent/>
<PolygonExplorerLinks/>
</div>

  );
}

export default App;
