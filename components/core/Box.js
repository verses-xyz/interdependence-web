export default function Box({ title, content, includeBorder = true }) {
  return (
    <div
      className={"overflow-hidden" + (includeBorder && " border border-white")}
    >
      <h2 className="font-mono py-3 bg-white text-black border-b border-white font-bold">
        {title}
      </h2>
      <div className="px-4 py-2 sm:px-8 text-white">{content}</div>
    </div>
  );
}
