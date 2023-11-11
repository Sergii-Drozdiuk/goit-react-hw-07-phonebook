import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { FcBusinessContact } from 'react-icons/fc';
import { PiAddressBookDuotone } from 'react-icons/pi';

export function App() {
  console.log('app');
  return (
    <div className='w-[310px] rounded-lg border p-3 min-[375px]:w-[365px]'>
      <h1 className='mb-4 flex items-center justify-center gap-2 text-2xl'>
        <FcBusinessContact />
        Phonebook
      </h1>
      <ContactForm />
      <h2 className='mb-4 flex items-center justify-center gap-2 text-xl'>
        <PiAddressBookDuotone />
        Contacts
      </h2>
      <Filter />
      <ContactList />
    </div>
  );
}
