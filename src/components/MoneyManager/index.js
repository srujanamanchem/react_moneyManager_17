import {Component} from 'react'

import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails/index'

import TransactionItem from '../TransactionItem/index'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updatedTransactionList = transactionList.filter(
      each => each.id !== id,
    )
    this.setState({transactionList: updatedTransactionList})
  }

  onAddTransaction = event => {
    event.preventDefault()

    const {titleInput, amountInput, optionId, transactionList} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState({
      transactionList: [...transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    })
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({optionId: event.target.value})
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expensesAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].optionId) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].optionId) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].optionId) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += expensesAmount
      }
    })
    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expenseAmount = this.getExpenses()

    return (
      <div className="app-container">
        <div className="person-container">
          <h1 className="person-name">Hi, Richard</h1>
          <p className="greetings">
            Welcome back to your
            <span className="highlighter"> Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expenseAmount={expenseAmount}
        />
        <div className="transaction-history-container">
          <form onSubmit={this.onAddTransaction} className="add-transaction">
            <h1 className="heading">Add Transaction</h1>
            <label className="label" htmlFor="title">
              TITLE
            </label>
            <input
              id="title"
              className="input"
              type="text"
              onChange={this.onChangeTitle}
              placeholder="TITLE"
              value={titleInput}
            />
            <label className="label" htmlFor="amount">
              AMOUNT
            </label>
            <input
              id="amount"
              className="input"
              type="text"
              onChange={this.onChangeAmount}
              placeholder="AMOUNT"
              value={amountInput}
            />
            <label className="label" htmlFor="amountType">
              TYPE
            </label>
            <select
              id="amountType"
              className="input"
              onChange={this.onChangeType}
              value={optionId}
            >
              {transactionTypeOptions.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <div className="history-container">
            <h1 className="heading">History</h1>
            <ul className="history-table">
              <li className="table-header">
                <div className="headings-container">
                  <p className="table-header-filed-heading">Title</p>
                  <p className="table-header-filed-heading">Amount</p>
                  <p className="table-header-filed-heading">Type</p>
                </div>
              </li>
              {transactionList.map(each => (
                <TransactionItem
                  key={each.id}
                  transactionDetails={each}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
