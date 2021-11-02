export default function Box({ title, content }) {
  return (
    <div className="border border-gray-detail rounded-md overflow-hidden">
      <h2 className="font-mono py-3 bg-gray-primary text-gray-wash font-bold">{title}</h2>
      <div className="px-4 py-2 md:px-8 text-gray-primary">{content}</div>
    </div>
  );
};
