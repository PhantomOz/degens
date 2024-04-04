# Degen (DGN)

## Overview

An ERC20 Token that can be earned when playing the game from Degen studios.

## Prequisite

1. Install [Node.js](https://nodejs.org)

   Download and install from the official site.

## Local Setup & Initialization

1. Clone Repository into your local terminal

   ```bash
   git clone https://github.com/PhantomOz/Degens.git
   cd Degens
   ```

2. install the node libraries

   ```bash
   npm install
   ```

   Then compile

   ```bash
   npx hardhat compile
   ```

3. Deploy on Localhost
   ```bash
   npx hardhat node
   ```
   Open another terminal
   ```bash
   npx hardhat ignition deploy ./ignition/modules/Degen.ts
   ```

## Testnet

This contract can be found on the Avalanche testnet Fuji with address [0x0917c9EEd9EF51D57AAa27357C5FeE4F3590D42e](https://testnet.snowtrace.io//address/0x0917c9EEd9EF51D57AAa27357C5FeE4F3590D42e#code).

Made with Love @PhantomOz
