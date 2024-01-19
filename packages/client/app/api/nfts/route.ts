import { getNFTsOnSale } from '@/services';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get('search');
  const nfts = await getNFTsOnSale({ search: search || '' });

  return Response.json({ nfts });
}
