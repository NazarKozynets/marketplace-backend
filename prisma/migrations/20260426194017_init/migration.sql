/*
  Warnings:

  - A unique constraint covering the columns `[shortId]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `CollectionItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `Delivery` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `Outfit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `OutfitItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `PostLike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `ProductImage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `ProductPost` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `ProductPromotion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `ProductRecommendation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `SellerSubscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortId]` on the table `UserEvent` will be added. If there are existing duplicate values, this will fail.
  - The required column `shortId` was added to the `Collection` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `CollectionItem` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `Delivery` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `Favorite` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `Order` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `OrderItem` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `Outfit` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `OutfitItem` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `Payment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `Post` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `PostLike` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `Product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `ProductImage` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `ProductPost` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `ProductPromotion` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `ProductRecommendation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `ProductVariant` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `RefreshToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `Review` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `Seller` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `SellerSubscription` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `Shop` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `shortId` was added to the `UserEvent` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CollectionItem" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Outfit" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OutfitItem" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostLike" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductPost" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductPromotion" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductRecommendation" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SellerSubscription" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "shortId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserEvent" ADD COLUMN     "shortId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Collection_shortId_key" ON "Collection"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionItem_shortId_key" ON "CollectionItem"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_shortId_key" ON "Delivery"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_shortId_key" ON "Favorite"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_shortId_key" ON "Order"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_shortId_key" ON "OrderItem"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Outfit_shortId_key" ON "Outfit"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "OutfitItem_shortId_key" ON "OutfitItem"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_shortId_key" ON "Payment"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_shortId_key" ON "Post"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "PostLike_shortId_key" ON "PostLike"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_shortId_key" ON "Product"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImage_shortId_key" ON "ProductImage"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPost_shortId_key" ON "ProductPost"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPromotion_shortId_key" ON "ProductPromotion"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductRecommendation_shortId_key" ON "ProductRecommendation"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_shortId_key" ON "ProductVariant"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_shortId_key" ON "RefreshToken"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_shortId_key" ON "Review"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_shortId_key" ON "Seller"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "SellerSubscription_shortId_key" ON "SellerSubscription"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_shortId_key" ON "Shop"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "User_shortId_key" ON "User"("shortId");

-- CreateIndex
CREATE UNIQUE INDEX "UserEvent_shortId_key" ON "UserEvent"("shortId");
