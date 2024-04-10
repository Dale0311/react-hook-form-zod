import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { FormDataTypes, FormSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
function App() {
  const { register, control, handleSubmit, formState, reset } =
    useForm<FormDataTypes>({
      defaultValues: {
        email: '',
        username: '',
      },
      resolver: zodResolver(FormSchema),
    });
  const { errors, isSubmitting } = formState;

  const emailErrorStyle = errors?.email
    ? 'border-red-500 focus:border-red-500 '
    : '';

  const submitData = (data: FormDataTypes) => {
    console.log(data);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-1/4 mx-auto border rounded">
        <form
          className="mx-auto p-12"
          onSubmit={handleSubmit(submitData)}
          noValidate
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 ${emailErrorStyle}`}
              {...register('email')}
            />
            {errors?.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              {...register('username')}
            />
            {errors?.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <DevTool control={control} />
    </div>
  );
}

export default App;
