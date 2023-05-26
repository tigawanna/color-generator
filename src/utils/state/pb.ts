

// export const pb = new PocketBase(pb_url);

// export const getUser = async () => pb.authStore.model as unknown as AppUser

// export const loginUser = async ({ email, password }: { email: string; password: string }) => {
//     try {
//         return await pb.collection('staff').authWithPassword(email, password);
//     } catch (error) {
//         throw error;
//     }

// }

// export const appendToCache = async (
//     index: [string],
//     queryClient: QueryClient,
//     newData: unknown
// ) => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     queryClient.setQueryData(index, (old: any) => {
//         // //no-console("old to be unshifted === ",old)
//         //     //no-console(" new data === ",newData)
//         if (old) {
//             old.items.unshift(newData);
//             return old;
//         }
//         return newData;
//     });
// };

// export const makeImageUrl = (
//     coll_name: string,
//     record_id: string,
//     media_name: string
// ) => {
//     if (media_name) {
//         return `${pb_url}/api/files/${coll_name}/${record_id}/${media_name}`;
//     }
//     return 'https://i.pravatar.cc/300';
// };

// export const realTime = async (index: [string], queryClient: QueryClient) =>
//     pb.realtime.subscribe(index[0], (e) => {
//         //no-console('new real time response', e.record);
//         appendToCache(index, queryClient, e.record);

//         //    queryClient.setQueryData(["peeps", { id: e.record.id }], e.record);
//     });
