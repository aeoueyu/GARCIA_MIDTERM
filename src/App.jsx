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

  const validateGadgetName = (value) => {
    if (!value.trim()) {
      return 'Gadget name is required.'
    }

    if (value.trim().length < 3) {
      return 'Gadget name must contain at least 3 characters.'
    }

    return ''
  }

  const handleGadgetNameChange = (event) => {
    const { value } = event.target

    setForm((previousForm) => ({
      ...previousForm,
      gadgetName: value,
    }))

    setErrors((previousErrors) => ({
      ...previousErrors,
      gadgetName: validateGadgetName(value),
    }))
  }

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
                onChange={handleGadgetNameChange}
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
          </form>
        </section>
      </div>
    </main>
  )
}

export default App
