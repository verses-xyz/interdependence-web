export default function Box({ title, content }) {
  return (
    <div className="mt-5 border rounded-lg">
      <h2 className="rounded-t font-mono py-2 bg-brown-80">{title}</h2>
      <div className="px-6 md:px-8">{content}</div>
    </div>
  );
};
