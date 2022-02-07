import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/phonebook-actions';
import { getContacts } from '../../redux/phonebook-selector';
import styles from './ContactForm.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (name === '' && number === '') {
      alert('Заполните все поля контакта');
      return;
    }
    contacts.find(contact => name.toLowerCase() === contact.name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      : dispatch(actions.addContact({ name, number }));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formcontacts}>
      <div className={styles.phonebookdata}>
        <label htmlFor="">
          <TextField
            id="standard-basic"
            label="Name"
            size="small"
            onChange={handleChange}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
      </div>
      <div className={styles.phonebookdata}>
        <label htmlFor="">
          <TextField
            id="standard-basic"
            label="Phone"
            size="small"
            onChange={handleChange}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
      </div>
      <Button variant="text" type="submit">
        Add contact
      </Button>
    </form>
  );
}
