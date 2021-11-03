export default function Button({primary, children, ...props}) {
  if (primary) {
    return <button className="px-6 py-2 rounded-full bg-gray-primary hover:bg-black text-gray-bg text-sm sm:text-base font-mono font-bold transition duration-250 ease-in-out" {...props}>
      {children}
    </button>;
  } else {
    return <button className="px-6 py-2 rounded-full bg-gray-wash text-gray-secondary hover:bg-gray-hover text-sm sm:text-base font-mono font-bold transition duration-250 ease-in-out" {...props}>
      {children}
    </button>;
  }
}
