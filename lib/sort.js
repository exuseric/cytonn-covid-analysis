export default function handleSort({ unsorted, sort }) {
  const [sortName, sortType] = sort?.split(":") ?? [];

  return [...unsorted].sort((a, b) => {
    if (sortType === "asc") {
      return a[sortName]?.localeCompare(b[sortName]);
    }
    if (sortType === "desc") {
      return b[sortName]?.localeCompare(a[sortName]);
    } else {
      return [...unsorted];
    }
  });
}
