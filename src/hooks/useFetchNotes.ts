// export const fetchNotes = async (search: string) => {
//   const url = new URL("https://notehub-public.goit.study/api/notes");

//   if (search) {
//     url.searchParams.append("search", search);
//   }

//   const response = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${import.meta.env.VITE_NTHB_TOKEN}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`Request failed with status ${response.status}`);
//   }

//   return response.json();
// };
