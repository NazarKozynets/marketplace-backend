import { PrismaClient, Role, SellerStatus, ProductStatus, ProductCondition } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.collectionItem.deleteMany();
    await prisma.collection.deleteMany();
    await prisma.favorite.deleteMany();
    await prisma.review.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.shop.deleteMany();
    await prisma.seller.deleteMany();
    await prisma.user.deleteMany();

    const passwordHash = await bcrypt.hash('password1234', 10);

    const sellerUser = await prisma.user.create({
        data: {
            email: 'seller@vieuxfou.com',
            passwordHash,
            role: Role.SELLER,
            firstName: 'Vieux',
            lastName: 'Seller',
        },
    });

    const buyer = await prisma.user.create({
        data: {
            email: 'buyer@vieuxfou.com',
            passwordHash,
            role: Role.USER,
            firstName: 'Test',
            lastName: 'Buyer',
        },
    });

    const admin = await prisma.user.create({
        data: {
            email: 'admin@vieuxfou.com',
            passwordHash,
            role: Role.ADMIN,
            firstName: 'Admin',
            lastName: '',
        }
    })

    const seller = await prisma.seller.create({
        data: {
            userId: sellerUser.id,
            status: SellerStatus.APPROVED,
            displayName: 'Vieux Fou Seller',
            bio: 'Curated Ukrainian streetwear and archive pieces.',
        },
    });

    const shop = await prisma.shop.create({
        data: {
            name: 'Archive Kyiv',
            slug: 'archive-kyiv',
            description: 'Archive, streetwear and old money pieces from Ukraine.',
            ownerId: seller.id,
            instagram: '@archive.kyiv',
        },
    });

    const product = await prisma.product.create({
        data: {
            title: 'Oversized Black Hoodie',
            description: 'Minimal black oversized hoodie for streetwear outfits.',
            price: 1200,
            brand: 'Local Brand',
            category: 'Hoodies',
            style: 'streetwear',
            condition: ProductCondition.NEW,
            status: ProductStatus.ACTIVE,
            tags: ['black', 'oversized', 'streetwear'],
            attributes: {
                material: 'cotton',
                gender: 'unisex',
            },
            shopId: shop.id,
            variants: {
                create: [
                    {
                        size: 'M',
                        color: 'Black',
                        stock: 5,
                    },
                    {
                        size: 'L',
                        color: 'Black',
                        stock: 3,
                    },
                ],
            },
            images: {
                create: [
                    {
                        url: 'https://placehold.co/800x1000?text=Black+Hoodie',
                        alt: 'Black hoodie',
                        sortOrder: 1,
                    },
                ],
            },
        },
    });

    await prisma.favorite.create({
        data: {
            userId: buyer.id,
            productId: product.id,
        },
    });

    await prisma.review.create({
        data: {
            userId: buyer.id,
            productId: product.id,
            rating: 5,
            comment: 'Looks clean and stylish.',
        },
    });

    await prisma.collection.create({
        data: {
            title: 'Streetwear under 1500 UAH',
            slug: 'streetwear-under-1500',
            description: 'Affordable streetwear pieces.',
            isFeatured: true,
            items: {
                create: [
                    {
                        productId: product.id,
                        sortOrder: 1,
                    },
                ],
            },
        },
    });

    console.log('✅ Seed completed ✅');
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });