import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NAME = "Degen";
const SYMBOL = "DGN";
const AMOUNT = 1_000_000_000;

const DegenModule = buildModule("degenModule", (m) => {
  const name = m.getParameter("_name", NAME);
  const symbol = m.getParameter("_symbol", SYMBOL);
  const amount = m.getParameter("_amount", AMOUNT);

  const degen = m.contract("Degen", [name, symbol, amount]);

  return { degen };
});

export default DegenModule;
