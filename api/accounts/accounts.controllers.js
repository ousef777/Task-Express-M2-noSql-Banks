let accounts = require('../../accounts');
let Account = require('./account.model');

// exports.tasksGet = (req, res) => {
//   try {
//     const tasks = Account.find();
//     console.log('tasks', tasks);
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ "message": error });
//   }
// };

exports.accountCreate = async (req, res) => {
  try {
    // const id = accounts[accounts.length - 1].id + 1;
    const newAccount = await Account.create(req.body);//{ ...req.body, funds: 0, id };
    accounts.push(newAccount);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountDelete = (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = Account.findById(accountId);
    if (foundAccount == null) {
      console.log(foundAccount);
      res.status(404).json({ message: 'Account not found' });
    } else {
      Account.deleteOne(foundAccount);
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountUpdate = async (req, res) => {
  // const { accountId } = req.params;
  // const foundAccount = Account.findById(accountId);//accounts.find((account) => account.id === +accountId);
  // if (foundAccount) {
  //   // foundAccount.funds = req.body.funds;
  //   // Account.updateOne(foundAccount);
  //   await foundAccount.updateOne(req.body);
  //   res.status(204).end();
  // } else {
  //   res.status(404).json({ message: 'Account not found' });
  // }

  const { accountId } = req.params;
  const foundAccount = await Account.findById(accountId);
  if (foundAccount == null) {
    console.log(foundAccount);
    res.status(404).json({ message: 'Account not found' });
  }
  try {
    await foundAccount.updateOne(req.body);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    const list = await Account.find();
    console.log(list);
    res.status(200).json(list);
    // res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAccountByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const list = await Account.find();
    const foundAccount = list.find(account => account.username === username);
    if (foundAccount) {
      console.log(foundAccount);
      res.status(404).json({ message: 'Account not found' });
    }
    //console.log(foundAccount);
    if (req.query.currency === 'usd') {
      const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
      res.status(201).json(accountInUsd);
    }
    else res.status(201).json(foundAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
