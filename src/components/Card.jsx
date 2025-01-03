export default function Card({ children, title }) {
  return (
    <div className='flex flex-col gap-1'>
      <span className='text-[#333333B2]'>{title}</span>
      <div className='p-4 bg-white shadow-lg'>{children}</div>
    </div>
  );
}