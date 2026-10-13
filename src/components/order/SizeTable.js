const DRESS = [
  ["S", "40–46", "150–158", "62–66"],
  ["M", "47–52", "155–163", "67–71"],
  ["L", "53–58", "158–166", "72–76"],
  ["XL", "59–65", "160–168", "77–82"],
];

const HOME = [
  ["M", "38–48"],
  ["L", "49–57"],
  ["XL", "58–65"],
  ["Freesize", "40–60"],
];

/** Bảng size gọn — số đo là nội dung mẫu, cập nhật theo rập thật. */
export default function SizeTable({ collection }) {
  const dress = collection === "evening";
  const head = dress ? ["Size", "Kg", "Cao (cm)", "Eo (cm)"] : ["Size", "Cân nặng (kg)"];
  const rows = dress ? DRESS : HOME;

  return (
    <table className="mt-3 w-full overflow-hidden rounded-md text-left text-[12.5px] ring-1 ring-ink/10">
      <thead className="bg-sand text-[10.5px] tracking-wider text-ink-soft uppercase">
        <tr>
          {head.map((h) => (
            <th key={h} className="px-3 py-2 font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white/60">
        {rows.map(([size, ...cells]) => (
          <tr key={size} className="border-t border-ink/10">
            <td className="px-3 py-2 font-semibold text-plum">{size}</td>
            {cells.map((c, i) => (
              <td key={i} className="px-3 py-2 text-ink-soft">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
