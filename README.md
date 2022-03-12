# Demo Smart Contract Event Dashboard

- Fetches all events of a given smart contract running on the Ethereum blockchain and lists it in a dashboard
- The dashboard was made with the following template: https://github.com/minimal-ui-kit/material-kit-react
- Current contract implemented in this project is viewable at: https://rinkeby.etherscan.io/address/0x06e0dbe53dd85c2ce896b43b227da65ff679bc8a

## Quick look

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/65627237/158032492-9e8f180b-9427-4568-a6da-8f7ad0e9253d.png">

## Features

- Replace the current contract and contractAdress with your own!
- Use the contract-interactor to build your own node app that interacts with your contract
- Expand the dashboard itself by more information needed for your use case

## Setup

- For frontend:
```
cd web && yarn
yarn start
```

- For backend (Before running choose the function you want to run in the `main()` function:
```
cd contract_interactor && yarn
touch .env
echo -e "WALLET_ADRESS=\nPRIVATE_KEY=\nCONTRACT_ADRESS=" >> .env
yarn start
```
