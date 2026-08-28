import { useState } from 'react'
import './App.css'

const initialForm = {
  gadgetName: '',
  category: '',
  manufacturer: '',
  healthRating: '',
  techBrandName: '',
  userRole: '',
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const validateField = (name, value) => {
    if (name === 'gadgetName') {
      if (!value.trim()) {
        return 'Gadget name is required.'
      }

      if (value.trim().length < 3) {
        return 'Gadget name must contain at least 3 characters.'
      }
    }

    if (name === 'category' && !value) {
      return 'Please select a category.'
    }

    if (name === 'manufacturer' && !value.trim()) {
      return 'Manufacturer is required.'
    }

    if (name === 'healthRating') {
      if (value === '') {
        return 'Health rating is required.'
      }

      if (Number(value) < 1 || Number(value) > 100) {
        return 'Health rating must be between 1 and 100.'
      }
    }

    if (name === 'techBrandName' && !value.trim()) {
      return 'Tech brand name is required.'
    }

    if (name == 'userRole' && !value) {
      return 'Please select Engineer or Tester'
    }

    return ''
  }

  // const validateGadgetName = (value) => {
  //   if (!value.trim()) {
  //     return 'Gadget name is required.'
  //   }

  //   if (value.trim().length < 3) {
  //     return 'Gadget name must contain at least 3 characters.'
  //   }

  //   return ''
  // }

  const handleChange = (event) => {
    const { name , value } = event.target

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }))

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: validateField(name,value),
    }))
  }

  // const handleGadgetNameChange = (event) => {
  //   const { value } = event.target

  //   setForm((previousForm) => ({
  //     ...previousForm,
  //     gadgetName: value,
  //   }))

  //   setErrors((previousErrors) => ({
  //     ...previousErrors,
  //     gadgetName: validateGadgetName(value),
  //   }))
  // }

  return (
    <main className='min-h-screen bg-slate-100 px-4 py-10'>
      <div className='mx-auto max-w-4xl'>
        <header className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-900 md:text-4xl'>
            Tech Gadget and Inventory Hub
          </h1>
          <p className='mt-2 text-slate-600'>
            Register and monitor technology inventory records.
          </p>
        </header>

        <section className='rounded-2xl bg-white p-6 shadow-lg md:p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-slate-900'>
              Gadget Registration
            </h2>
            <p className='mt-1 text-sm text-slate-500'>
              Complete all the required gadget information.
            </p>
          </div>

          <form onSubmit={(event) => event.preventDefault()} noValidate>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
              <div>
                <label
                  htmlFor='gadgetName'
                  className='mb-2 block text-sm font-semi-bold text-slate-700'
                >
                  Gadget Name
                </label>

                <input
                  id='gadgetName'
                  type='text'
                  name='gadgetName'
                  value={form.gadgetName}
                  onChange={handleChange}
                  placeholder='Example: Galaxy Watch 8'
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                    errors.gadgetName
                      ? 'border-red-50 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-'
                  }`}
                />

                {errors.gadgetName && (
                  <p className='mt-1 text-sm font-medium text-red-600'>
                    {errors.gadgetName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='category'
                  className='mb-2 block text-sm font-semibold text-slate-700'
                >
                  Category
                </label>

                <select
                  id='category'
                  name='category'
                  value={form.category}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-white px-4 py-3 outline-none transition ${
                    errors.category
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                  }`}
                >
                  <option value=''>Select a category</option>
                  <option value='Smartphone'>Smartphone</option>
                  <option value='Laptop'>Laptop</option>
                  <option value='Wearable'>Wearable</option>
                  <option value='Audio'>Audio</option>
                </select>

                {errors.category && (
                  <p className='mt-1 text-sm font-medium text-red-600'>
                    {errors.category}
                  </p>
                )}
              </div>

              <div className='md:col-span-2'>
                <label
                  htmlFor='manufacturer'
                  className='mb-2 block text-sm font-semibold text-slate-700'
                >
                  Manufacturer
                </label>

                <input
                  id='manufacturer'
                  type='text'
                  name='manufacturer'
                  value={form.manufacturer}
                  onChange={handleChange}
                  placeholder='Example: Samsung Electronics'
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                    errors.manufacturer
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                  }`}
                />

                {errors.manufacturer && (
                  <p className='mt-1 text-sm font-medium text-red-600'>
                    {errors.manufacturer}
                  </p>
                )}
              </div>

              <div className='md:col-span-2'>
                <label
                  htmlFor='healthRating'
                  className='mb-2 block text-sm font-semibold text-slate-700'
                >
                  Health Rating
                </label>

                <input
                  id='healthRating'
                  type='number'
                  name='healthRating'
                  min='1'
                  max='100'
                  value={form.healthRating}
                  onChange={handleChange}
                  placeholder='Enter a rating from 1 to 100'
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                    errors.healthRating
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                  }`}
                />

                {errors.healthRating && (
                  <p className='mt-1 text-sm font-medium text-red-600'>
                    {errors.healthRating}
                  </p>
                )}
              </div>

              <div className='md:col-span-2'>
                <label
                  htmlFor='techBrandName'
                  className='mb-2 block text-sm font-semibold text-slate-700'
                >
                  Tech Brand Name
                </label>

                <input
                  id='techBrandName'
                  type='text'
                  name='techBrandName'
                  value={form.techBrandName}
                  onChange={handleChange}
                  placeholder='Example: Galaxy'
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                    errors.techBrandName
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                  }`}
                />

                {errors.techBrandName && (
                  <p className='mt-1 text-sm font-medium text-red-600'>
                    {errors.techBrandName}
                  </p>
                )}
              </div>

              <fieldset className='md:col-span-2'>
                <legend className='mb-3 text-sm font-semibold text-slate-700'>
                  User Role
                </legend>
                
                <div className='flex flex-col gap-3 sm:flex-row'>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition ${
                      form.userRole === 'Engineer'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-300 bg-2hite text-slate-700'
                    }`}
                  >
                    <input
                      type='radio'
                      name='userRole'
                      value='Engineer'
                      checked={form.userRole === 'Engineer'}
                      onChange={handleChange}
                      className='h-4 w-4 accent-blue-600'
                    />

                    <span className='font-medium'>Engineer</span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition ${
                      form.userRole === 'Tester'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-300 bg-2hite text-slate-700'
                    }`}
                  >
                    <input
                      type='radio'
                      name='userRole'
                      value='Tester'
                      checked={form.userRole === 'Tester'}
                      onChange={handleChange}
                      className='h-4 w-4 accent-blue-600'
                    />

                    <span className='font-medium'>Tester</span>
                  </label>
                </div>

                {errors.userRole && (
                  <p className='mt-2 text-sm font-medium text-red-600'>
                    {errors.userRole}
                  </p>
                )}
              </fieldset>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

export default App
