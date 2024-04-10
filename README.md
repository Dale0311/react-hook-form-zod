## React hook form

### three role of a react hook form

1. Manage form data

2. Submit form data

3. Enforce validation and provide visual feedback

### Advantage of react hook form

1. uncontrolled - meaning it doesn't rerender the page every keystroke

### props

##### register - allows us to track the input state

```js
const { register } = useForm();

<input type="email" id="email" {...register('email')} />;
```

##### devtools

```js
npm i -D @hookform/devtools
import {devtools}
```

### example

```js
import { useForm } from 'react-hook-form';

// register allows us to control an input
// control allows us to see devtools
// handleSubmit a callback that we pass to onSubmit
const { register, control, handleSubmit } = useForm()<FormDataTypes>;

//returns name, value, onmchange, onblur
<input type="email" id="email" {...register('email')} />;

// submitting data
const submitData = (data: FormDataTypes) => {
  console.log(data);
};
<form onSubmit={handleSubmit(submitData)}>
```

### form validation

```js

// first i need to invoke noValidate to the form so that react-hook-form can validate
<form onSubmit={handleSubmit(submitData)} noValidate />

// by passing an object to the 2nd argument to the register. it allows me to set validation
<input type="email" id="email" {...register('email', {required: "Email is required"})} />;

// or
<input type="email" id="email" {...register('email', {required: {
  value: true,
  messsage: "Email is required."
}})} />;
```

### formState - allow us to access errors and data in our form

```js
const { register, control, handleSubmit, formState } = useForm<FormDataTypes>()
const {errors} = formState

// get the error of email if there's one.
{errors?.email && (
  <p className="text-red-500 text-sm">{errors.email.message}</p>
)}
```

### custom form validation

by instantiating the validate in register field.

```js
<input
  type="email"
  id="email"
  {...register('email', {
    validate: (fieldValue) => {
      return (
        fieldvalue !== 'admin@gmail.com' || 'admin@gmail.com is already taken'
      );
    },
    //or when creating multiple custom validation
    validate: {
      adminReserved: (fieldValue) => {
        return (
          fieldValue !== 'admin@gmail.com' || 'admin@gmail.com is already taken'
        );
      },
      notSupported: (fieldValue) => {
        const isBlackListed = fieldValue.endsWith('@yahoo.com');
        if (isBlackListed) return 'Inputted Domain is not supported';
        return fieldValue;

        // or

        return (
          !fieldValue.endsWith('@yahoo.com') ||
          'Inputted Domain is not supported'
        );
      },
    },
  })}
/>
```

### default value - allows me to pass a default value and props of the form

```js
const { register, control, handleSubmit, formState } =
  useForm <
  FormDataTypes >
  {
    defaultValue: { email: '', username: '', channel: '' },

    // or if it is coming from external resource
    defaultValue: ()=>{
      const data = // api fetching here
      return {username: data.username, email: data.email, channel: data.channel}
    }
};
```

### both array and object uses dot notation to access input state

```js
<input
  type="text"
  id="twitter"
  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
  {...register('social.twitter', {
    required: 'Twitter is required',
  })}
/>
```

### quick recap

##### reset

allows me to reset all inputs back to their default value

```js
const { register, reset } = useForm < FormDataTypes > {};
```

##### formState

allows me to access the inputs value, error, state(isSubmitting, isDirty)

##### setters and getters

allows me to access and manipulate the data manually

##### watch

allows me to keeps track of the updated value of an input.
<br><b>NOTE:</b> if I do this this will rerender my component everytime i changes the value of the input

```js
const watchUsername = watch('username'); // keeps track of the updated value, renders every keystroke

// or it can be a callback

const watchUsername = watch((fieldVal) => {
  //do something here
});
```

##### disabled

disabled inputs, buttons. and it can be conditional aswell.

### zod integration

- zod helps us dealing with validation, it offers a huge pre built validation that we can use in our inputs.
- zod helps us to not write simple validation because it already have those
- zod let us extends its prebuilt validation and we can make our custom super specific validation

##### integrating zod in our react-hook-form

- npm i zod
- npm i @hookform/resolvers
- import z from zod
- create schema

```js
export const FormSchema = z.object({
  email: z
    .string()
    .email('Input must be a valid email')
    .endsWith('@gmail.com', 'Provider must be a gmail'),
  username: z
    .string()
    .min(4, 'Username must be atleast 4 characters long')
    .max(10, 'Username must not exceed 10 characters long'),
});

// then we finna infer the schema to the type
export type FormDataTypes = z.infer<typeof FormSchema>;
```

- add the schema to the resolver of the useForm

```js
const { register, control, handleSubmit, formState, reset } =
  useForm <
  FormDataTypes >
  {
    defaultValues: {
      email: '',
      username: '',
    },
    resolver: zodResolver(FormSchema),
  };
```
