export const Alert = ({ alert }) => {
  return (
    <div className={`${alert.error ? 'from-red-500 to-red-600' : 'from-sky-400 to-sky-600'} bg-gradient-to-br text-center p-3 uppercase text-white font-bold text-sm my-10 rounded-lg`}>
        {alert.message}
    </div>
  )
}
