import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 1;
export async function POST(req: Request) {
  const { accountKey } = await req.json();

  cookies().set('accountKey', accountKey);

  revalidatePath('/explore/nft/createNft');

  return Response.json({ auth: true });
}
