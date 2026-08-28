import { useState , useMemo , useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
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
  const [gadgets, setGadgets] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [selectedGadgetId, setSelectedGadgetId] = useState(null)
  const [activeGadget, setActiveGadget] = useState(null)
  const [roleFilter, setRoleFilter] = useState('All')

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

    setSuccessMessage('')
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

  const handleSubmit = (event) => {
    event.preventDefault()

    const newErrors = {}

    Object.entries(form).forEach(([name, value]) => {
      const errorMessage = validateField(name, value)

      if (errorMessage) {
        newErrors[name] = errorMessage
      }
    })

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setSuccessMessage('')
      return
    }

    const newGadget = {
      id: Date.now(),
      ...form,
      healthRating: Number(form.healthRating),
    }

    setGadgets((previousGadgets) => [
      ...previousGadgets,
      newGadget,
    ])

    setForm(initialForm)
    setErrors({})
    setSuccessMessage('Gadget successfully registered!')
  }

  useEffect(() => {
    const selectedGadget =
      gadgets.find((gadget) => gadget.id === selectedGadgetId) ?? null

    setActiveGadget(selectedGadget)
  }, [selectedGadgetId, gadgets])

  const filteredGadgets = useMemo(() => {
    if (roleFilter === 'All') {
      return gadgets
    }

    return gadgets.filter(
      (gadget) => gadget.userRole === roleFilter,
    )
  }, [gadgets, roleFilter])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'gadgetName',
        header: 'Gadget Name',
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'manufacturer',
        header: 'Manufacturer',
      },
      {
        accessorKey: 'healthRating',
        header: 'Health Rating',
        cell: (info) => `${info.getValue()}/100`,
      },
      {
        accessorKey: 'techBrandName',
        header: 'Tech Brand',
      },
      {
        accessorKey: 'userRole',
        header: 'User Role',
      },
    ],
    [],
  )

  const table = useReactTable({
    data: filteredGadgets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 3,
      },
    },
  })

  return (
    <main className='min-h-screen bg-slate-950 px-4 py-10 text-slate-100'>
      <div className='mx-auto max-w-6xl'>
        <header className='mb-8 border-l-4 border-indigo-500 pl-5'>
          <h1 className='text-3xl font-black tracking-tight text-white md:text-5xl'>
            Tech Gadget and Inventory Hub
          </h1>
          <p className='mt-2 text-slate-400'>
            Register and monitor technology inventory records.
          </p>
        </header>

        <section className='rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-indigo-950/30 md:p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white'>
              Gadget Registration
            </h2>
            <p className='mt-1 text-sm text-slate-400'>
              Complete all the required gadget information.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {successMessage && (
              <div className='mb-5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-300 shadow-lg shadow-emerald-950/20'>
                <p className='font-semibold'>
                  {successMessage}
                </p>

                <p className='mt-1 text-sm'>
                  Total registered gadgets: {gadgets.length}
                </p>
              </div>
            )}
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
              <div>
                <label
                  htmlFor='gadgetName'
                  className='mb-2 block text-sm font-semibold text-slate-300'
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
                  className={`w-full rounded-lg border bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 ${
                    errors.gadgetName
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />

                {errors.gadgetName && (
                  <p className='mt-1 text-sm font-medium text-red-400'>
                    {errors.gadgetName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='category'
                  className='mb-2 block text-sm font-semibold text-slate-300'
                >
                  Category
                </label>

                <select
                  id='category'
                  name='category'
                  value={form.category}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-slate-950 px-4 py-3 text-white outline-none transition ${
                    errors.category
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                >
                  <option value=''>Select a category</option>
                  <option value='Smartphone'>Smartphone</option>
                  <option value='Laptop'>Laptop</option>
                  <option value='Wearable'>Wearable</option>
                  <option value='Audio'>Audio</option>
                </select>

                {errors.category && (
                  <p className='mt-1 text-sm font-medium text-red-400'>
                    {errors.category}
                  </p>
                )}
              </div>

              <div className='md:col-span-2'>
                <label
                  htmlFor='manufacturer'
                  className='mb-2 block text-sm font-semibold text-slate-300'
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
                  className={`w-full rounded-lg border bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 ${
                    errors.manufacturer
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />

                {errors.manufacturer && (
                  <p className='mt-1 text-sm font-medium text-red-400'>
                    {errors.manufacturer}
                  </p>
                )}
              </div>

              <div className='md:col-span-2'>
                <label
                  htmlFor='healthRating'
                  className='mb-2 block text-sm font-semibold text-slate-300'
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
                  className={`w-full rounded-lg border bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 ${
                    errors.healthRating
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />

                {errors.healthRating && (
                  <p className='mt-1 text-sm font-medium text-red-400'>
                    {errors.healthRating}
                  </p>
                )}
              </div>

              <div className='md:col-span-2'>
                <label
                  htmlFor='techBrandName'
                  className='mb-2 block text-sm font-semibold text-slate-300'
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
                  className={`w-full rounded-lg border bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 ${
                    errors.techBrandName
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />

                {errors.techBrandName && (
                  <p className='mt-1 text-sm font-medium text-red-400'>
                    {errors.techBrandName}
                  </p>
                )}
              </div>

              <fieldset className='md:col-span-2'>
                <legend className='mb-3 text-sm font-semibold text-slate-300'>
                  User Role
                </legend>
                
                <div className='flex flex-col gap-3 sm:flex-row'>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition ${
                      form.userRole === 'Engineer'
                        ? 'border-indigo-500 bg-indigo-500/15 text-indigo-300 shadow-lg shadow-indigo-950/30'
                        : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-indigo-500'
                    }`}
                  >
                    <input
                      type='radio'
                      name='userRole'
                      value='Engineer'
                      checked={form.userRole === 'Engineer'}
                      onChange={handleChange}
                      className='h-4 w-4 accent-indigo-500'
                    />

                    <span className='font-medium'>Engineer</span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition ${
                      form.userRole === 'Tester'
                        ? 'border-cyan-500 bg-cyan-500/15 text-cyan-300 shadow-lg shadow-cyan-950/30'
                        : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-500'
                    }`}
                  >
                    <input
                      type='radio'
                      name='userRole'
                      value='Tester'
                      checked={form.userRole === 'Tester'}
                      onChange={handleChange}
                      className='h-4 w-4 accent-indigo-500'
                    />

                    <span className='font-medium'>Tester</span>
                  </label>
                </div>

                {errors.userRole && (
                  <p className='mt-2 text-sm font-medium text-red-400'>
                    {errors.userRole}
                  </p>
                )}
              </fieldset>
            </div>

            <button
              type='submit'
              className='mt-7 w-full rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-950/40 transition hover:from-indigo-500 hover:to-cyan-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/30'
            >
              Register Gadget
            </button>
          </form>
        </section>

        <section className='mt-8 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-indigo-950/30 md:p-8'>
          <div className='mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm font-bold uppercase tracking-widest text-cyan-400'>
                Inventory
              </p>

              <h2 className='text-2xl font-bold text-white'>
                Gadget Registry
              </h2>
            </div>
            
            <div className='rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300'>
              {gadgets.length} registered
            </div>
          </div>

          <div className='mb-5 flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950/80 p-4 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <label
                htmlFor='roleFilter'
                className='mr-3 text-sm font-semibold text-slate-300'
              >
                Filter by User Role
              </label>

              <select
                id='roleFilter'
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
                className='rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              >
                <option value='All'>All Roles</option>
                <option value='Engineer'>Engineer</option>
                <option value='Tester'>Tester</option>
              </select>
            </div>

            <p className='text-sm text-slate-400'>
              Showing {filteredGadgets.length} of {gadgets.length} records
            </p>
          </div>

          <div className='overflow-x-auto rounded-xl border border-slate-800'>
            <table className='w-full border-collapse text-left'>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className='border-b border-slate-700 bg-slate-950'
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className='whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wider text-indigo-300'
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedGadgetId(row.original.id)}
                    className={`cursor-pointer border-b border-slate-800 transition ${
                      activeGadget?.id === row.original.id
                        ? 'bg-indigo-500/20 shadow-[inset_4px_0_0_#6366f1]'
                        : 'bg-slate-900 hover:bg-slate-800'
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className='whitespace-nowrap px-4 py-4 text-sm text-slate-300'
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {table.getRowModel().rows.length == 0 && (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className='bg-slate-900 px-4 py-12 text-center text-slate-500'
                    >
                      No gadgets registered yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className='mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-5 sm:flex-row'>
            <p className='text-sm text-slate-400'>
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {Math.max(table.getPageCount(), 1)}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className='rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-indigo-500 hover:text-indigo-300 disabled:cursor-not-allowed disabled:opacity-40'
              >
                Previous
              </button>

              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className='rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-600'
              >
                Next
              </button>
            </div>
          </div>

          <div className='mt-8 border-t border-slate-800 pt-6'>
            <p className='text-sm font-bold uppercase tracking-widest text-cyan-400'>
              Active Item Profile
            </p>

            {activeGadget ? (
              <div className='mt-4 rounded-xl border border-indigo-500/40 bg-gradient-to-br from-indigo-500/15 to-cyan-500/5 p-5 shadow-xl shadow-indigo-950/30'>
                <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                  <div>
                    <h3 className='text-2xl font-black text-white'>
                      {activeGadget.gadgetName}
                    </h3>

                    <p className='mt-1 text-slate-400'>
                      {activeGadget.techBrandName}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-sm font-bold ${
                      activeGadget.userRole === 'Engineer'
                        ? 'border border-indigo-400 bg-indigo-500/20 text-indigo-200'
                        : 'border border-cyan-400 bg-cyan-500/20 text-cyan-200'
                    }`}
                  >
                    {activeGadget.userRole}
                  </span>
                </div>

                <dl className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div>
                    <dt className='text-xs font-bold uppercase tracking-wider text-cyan-400'>
                      Category
                    </dt>
                    <dd className='mt-1 font-semibold text-white'>
                      {activeGadget.category}
                    </dd>
                  </div>

                  <div>
                    <dt className='text-xs font-bold uppercase tracking-wider text-cyan-400'>
                      Manufacturer
                    </dt>
                    <dd className='mt-1 font-semibold text-white'>
                      {activeGadget.manufacturer}
                    </dd>
                  </div>

                  <div>
                    <dt className='text-xs font-bold uppercase tracking-wider text-cyan-400'>
                      Health Rating
                    </dt>
                    <dd className='mt-1 font-semibold text-white'>
                      {activeGadget.healthRating}/100
                    </dd>
                  </div>

                  <div>
                    <dt className='text-xs font-bold uppercase tracking-wider text-cyan-400'>
                      Tech Brand
                    </dt>
                    <dd className='mt-1 font-semibold text-white'>
                      {activeGadget.techBrandName}
                    </dd>
                  </div>
                </dl>
              </div>
            ) : (
              <div className='mt-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center text-slate-500'>
                Click a gadget row to display its complete details.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
