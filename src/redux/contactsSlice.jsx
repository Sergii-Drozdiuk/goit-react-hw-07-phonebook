import { createSlice } from '@reduxjs/toolkit';
import { initialData } from '../InitialData';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialData.contacts,
  reducers: {
    addContact(state, action) {
      state.push(action.payload);
    },
    delContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const getContacts = state => state.contacts;
export const contactsReducer = contactsSlice.reducer;
export const { addContact, delContact } = contactsSlice.actions;
