import { Loader } from 'lucide-react'

export default function Progress({ status }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Loader className="w-12 h-12 animate-spin" style={{ color: '#86F06F' }} />
      <p className="text-gray-300 text-lg">{status}</p>
      <div className="w-full max-w-md rounded-full h-2" style={{ backgroundColor: '#333333' }}>
        <div className="h-2 rounded-full animate-pulse w-2/3" style={{ backgroundColor: '#86F06F' }}></div>
      </div>
    </div>
  )
}

