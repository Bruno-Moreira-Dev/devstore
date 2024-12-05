import { z } from 'zod'
import data from '../data.json'

interface ProductProps {
  params: Promise<{ slug: string }>
}

export async function GET(_: Request, { params }: ProductProps) {
  const { slug: alias } = await params
  const slug = z.string().parse(alias)

  const product = data.products.find((product) => product.slug === slug)

  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 404 })
  }

  return Response.json(product)
}
