import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteTransaction = () => {
    deleteTransaction(id)
  }
  return (
    <li className="table-entry">
      <p className="table-entry-value">{title}</p>
      <p className="table-entry-value">Rs {amount}</p>
      <p className="table-entry-value">{type}</p>
      <div className="delete-container">
        <button
          type="button"
          testid="delete"
          className="delete-button"
          onClick={onDeleteTransaction}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
