import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PiUserCirclePlusLight, PiUserCircleLight, PiPhoneLight } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../redux/operations';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { selectContacts } from '../redux/selectors';

export function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  console.log('form');

  return (
    <Formik
      initialValues={{ name: '', phone: '' }}
      onSubmit={({ name, phone }, actions) => {
        const nameExists = contacts.some(
          contact => contact.name.trim().toLowerCase() === name.trim().toLowerCase()
        );
        const numberExists = contacts.some(contact => contact.phone === phone);
        if (nameExists) {
          Notify.warning(`${name}' is already in contacts.`);
        } else if (numberExists) {
          Notify.warning(`${phone}' is already in contacts.`);
        } else {
          dispatch(addContact({ id: nanoid(), name, phone }));
          Notify.success(`${name} has been successfully added to your contacts`);
          actions.resetForm();
        }
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .min(2, 'Too Short!')
          .matches(
            /^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$/,
            'Name may contain only letters, apostrophe, dash, and spaces.'
          )
          .required('This is a required field'),
        phone: Yup.string()
          .matches(
            /^\+?\d{1,4}?[ .\-s]?(\(\d{1,3}?\))?([ .\-s]?\d{1,4}){1,4}$/,
            'Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +'
          )
          .required('This is a required field')
          .min(9, 'Please enter at least 9 characters'),
      })}
    >
      <Form className='mb-2 flex flex-col items-center gap-3 py-3'>
        <label className='flex flex-col items-center gap-2'>
          <div className='flex flex-row items-center gap-2'>
            <PiUserCircleLight />
            <Field
              name='name'
              type='text'
              className='rounded-lg pl-2 text-black'
              placeholder='User name'
            />
          </div>
          <ErrorMessage name='name' />
        </label>
        <label className='flex flex-col items-center gap-2'>
          <div className='flex flex-row items-center gap-2'>
            <PiPhoneLight />
            <Field
              name='phone'
              type='tel'
              className='rounded-lg pl-2 text-black'
              placeholder='Phone number'
            />
          </div>
          <ErrorMessage name='phone' />
        </label>
        <button
          type='submit'
          className='flex items-center justify-center gap-1 rounded-lg bg-emerald-500 px-2 py-[2px] hover:bg-emerald-700 active:bg-emerald-700'
        >
          <PiUserCirclePlusLight />
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
