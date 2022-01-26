export default function Button({ primary, children, className, ...props }) {
  if (primary) {
    return (
      <button
        className={
          "px-8 py-3 bg-kong-green hover:bg-kong-green-800 text-black uppercase text-sm md:text-base font-mono font-bold transition duration-250 ease-in-out " +
          className
        }
        {...props}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        className={
          "px-6 py-2 bg-gray-wash text-gray-secondary hover:bg-gray-hover text-sm md:text-base font-mono font-bold transition duration-250 ease-in-out " +
          className
        }
        {...props}
      >
        {children}
      </button>
    );
  }
}
