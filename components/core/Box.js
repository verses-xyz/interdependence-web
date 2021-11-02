export default function Box({ title, content }) {
  return (
    <div className="border rounded-lg">
      <h2 className="rounded-t font-mono py-3 bg-gray-wash text-gray-secondary font-bold">{title}</h2>
      <div className="px-6 md:px-8 text-gray-primary">{content}</div>
    </div>
  );
};
