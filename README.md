# MLM Bot Project

This project aims to implement an MLM structure with functionalities such as deposits, upgrades, and withdrawals, and offer tools for both users and administrators.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [MLM Logic](#mlm-logic)
- [Additional Notes](#additional-notes)
- [Development Progress](#development-progress)
- [MLM Questions](#mlm-questions)

## Features

- User Referral System
- Deposit Wallet Generation
- Display User Balance
- Referrer Chain Creation
- MLM Implementation
- Upgrade and Withdrawal Mechanism
- Admin Force Withdrawal Feature
- Command Panel for Users

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables using the provided `.example.env`.
4. Run the server using `npm start`.

## Usage

**Bot Commands:**
- `/invest` : Start or add to your investment.
- `/plan` : View available investment plans.
- `/wallet` : Access your wallet details.
- `/refer` : Get your referral link.

## Roadmap

- [x] User withdrawal method.
- [x] Implement Pool 1 and Pool 2.
- [x] Super Heroes logic.
- [x] Full documentation for end-users.

## MLM Logic

Details of the MLM logic, such as distribution percentages and pool creation, are currently in development. Further information can be found in the [Development Progress](#development-progress) section.

## Additional Notes

- Ensure you back up the database regularly.
- Address potential concurrency issues to prevent data inconsistencies.
- Consider breaking larger problems into smaller, more manageable tasks.
- Ensure code is modular and maintainable. Focus on creating pure, independent functions for easier collaboration.

## Development Progress

**Done:**
- Referring module basics.
- Deposit Wallet generation.
- Showing balance to users and updating the database.
- Chain creation for referrers.

**Todo:**
- Implement the MLM logic.
- Create user upgrade and withdrawal methods.
- Set up Pools 1 and 2.
- Implement forced withdrawals by admin.
- Finalize Super Heroes logic.
- Set up bot command panel.

## MLM Questions

A section for frequently asked questions or uncertainties related to the MLM structure. This may include clarifications on how deposits are distributed, how upgrades affect user balances, or the logic behind certain features.

---

**Developed by Muneeb Zubair Khan** - Experienced in Solidity, JavaScript, Python, and more. Checkout [Character GPT NFTs](https://mycharacter.ai) and [Bird Money](https://bird.money) for more projects.
