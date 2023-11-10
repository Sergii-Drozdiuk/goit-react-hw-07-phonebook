import { PiUserCircleMinusDuotone } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { delContact, getContacts } from '../redux/contactsSlice';
import { getFilter } from '../redux/filterSlice';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const visibleContacts = filter
    ? contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
    : contacts;

  return (
    <ul>
      {visibleContacts.length ? (
        visibleContacts.map(({ id, name, number }) => (
          <li key={id} className='mb-2 flex items-center justify-between gap-2'>
            <div className='flex items-center justify-between w-10/12'>
              <span className='w-1/2 overflow-hidden max-[375px]:text-xs'>{name}:</span>
              <span className='overflow-hidden max-[375px]:text-xs'>{number}</span>
            </div>
            <button
              type='button'
              onClick={() => dispatch(delContact(id))}
              className='flex rounded-lg bg-rose-500 px-2 py-[2px] hover:bg-rose-700 hover:stroke-black active:bg-rose-700 max-[375px]:text-xs max-[375px]:gap-1'
            >
              <PiUserCircleMinusDuotone />
            </button>
          </li>
        ))
      ) : (
        <p className='text-center'>Contacts not found</p>
      )}
    </ul>
  );
};
