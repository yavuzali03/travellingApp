import React, { useState } from 'react';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  content: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
  },
  title: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '1rem',
    color: '#555',
    fontWeight: 500
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.2s'
  },
  inputFocus: {
    outline: 'none',
    borderColor: '#007bff'
  },
  select: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: 'white',
    transition: 'border-color 0.2s'
  },
  participantsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  participantCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1rem'
  },
  button: {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    color: '#495057',
    border: '1px solid #dee2e6'
  },
  cancelButtonHover: {
    backgroundColor: '#e9ecef'
  },
  saveButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none'
  },
  saveButtonHover: {
    backgroundColor: '#0056b3'
  }
};

const ExpenseModal = ({ isOpen, onClose, onSave, participants }) => {
  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    paidBy: '',
    splitBetween: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(expense);
    setExpense({
      title: '',
      amount: '',
      paidBy: '',
      splitBetween: []
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.content}>
        <h2 style={styles.title}>Yeni Harcama</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="title" style={styles.label}>Harcama Adı</label>
            <input
              type="text"
              id="title"
              value={expense.title}
              onChange={(e) => setExpense({ ...expense, title: e.target.value })}
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.border}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="amount" style={styles.label}>Tutar</label>
            <input
              type="number"
              id="amount"
              value={expense.amount}
              onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.border}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="paidBy" style={styles.label}>Ödeyen</label>
            <select
              id="paidBy"
              value={expense.paidBy}
              onChange={(e) => setExpense({ ...expense, paidBy: e.target.value })}
              required
              style={styles.select}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.border}
            >
              <option value="">Seçiniz</option>
              {participants.map((participant) => (
                <option key={participant.id} value={participant.id}>
                  {participant.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Bölüşenler</label>
            <div style={styles.participantsList}>
              {participants.map((participant) => (
                <label key={participant.id} style={styles.participantCheckbox}>
                  <input
                    type="checkbox"
                    checked={expense.splitBetween.includes(participant.id)}
                    onChange={(e) => {
                      const newSplitBetween = e.target.checked
                        ? [...expense.splitBetween, participant.id]
                        : expense.splitBetween.filter(id => id !== participant.id);
                      setExpense({ ...expense, splitBetween: newSplitBetween });
                    }}
                    style={styles.checkbox}
                  />
                  {participant.name}
                </label>
              ))}
            </div>
          </div>

          <div style={styles.actions}>
            <button 
              type="button" 
              style={{...styles.button, ...styles.cancelButton}}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.cancelButtonHover.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.cancelButton.backgroundColor}
              onClick={onClose}
            >
              İptal
            </button>
            <button 
              type="submit" 
              style={{...styles.button, ...styles.saveButton}}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.saveButtonHover.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.saveButton.backgroundColor}
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
