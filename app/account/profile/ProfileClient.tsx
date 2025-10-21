'use client';

import { User } from '@/app/generated/prisma';
import { updateUser } from '@/app/lib/actions';
import { useFormStatus } from 'react-dom';

export default function ProfileClient({
  userId,
  user,
}: {
  userId: string;
  user: { name: string; email: string; address: string; national_id: string };
}) {
  const { name, email, address: userAddress, national_id } = user;

  async function handleForm(formData: any) {
    const address = formData.get('address');
    const nationalId = formData.get('nationalId');

    await updateUser({ userId, address, nationalId });
  }

  return (
    <div>
      <h1 className="text-purple-600 font-semibold text-2xl mb-4">
        Update your guest profile
      </h1>
      <p className="mb-4">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <form
        className="bg-gray-200 px-10 py-5 flex flex-col gap-4 rounded-md"
        action={handleForm}
      >
        <div>
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            value={name}
            name="name"
            disabled
            className="w-full px-6 py-3 bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Email address</label>
          <input
            type="text"
            value={email}
            name="email"
            className="w-full px-6 py-3 bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Address</label>
          <textarea
            rows={5}
            name="address"
            defaultValue={userAddress}
            className="w-full px-6 py-3 bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">National ID </label>
          <input
            name="nationalId"
            defaultValue={national_id}
            type="text"
            className="w-full px-6 py-3 bg-gray-100"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button />
        </div>
      </form>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`${
        pending
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-orange-500 hover:bg-orange-600'
      }  px-4 py-2 text-white rounded-md font-medium`}
    >
      {pending ? 'Updating...' : 'Update Profile'}
    </button>
  );
}
