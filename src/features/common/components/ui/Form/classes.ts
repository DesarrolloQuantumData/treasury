const baseInputClasses =
  'w-full px-4 py-2 pl-10 text-gray-900 placeholder:text-primaryText-50 rounded-2xl focus:outline-none focus:border-primaryBorder focus:ring focus:ring-primaryBorder focus:ring-opacity-40 bg-primaryBackground bg-opacity-40 border-primaryBorder border-2'
const disabledInputClasses = 'disabled:bg-gray-100 disabled:text-gray-400 '
const readOnlyInputClasses = 'read-only:text-gray-700'

export const inputClasses = `${baseInputClasses} ${disabledInputClasses} ${readOnlyInputClasses}`
