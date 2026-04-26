import { Module } from '@nestjs/common';
import { PrismaCollectionRepository } from '../../infrastructure/repositories/prisma-collection.repository';
import { PrismaOutfitRepository } from '../../infrastructure/repositories/prisma-outfit.repository';
import { PrismaPostRepository } from '../../infrastructure/repositories/prisma-post.repository';
import {
  COLLECTION_REPOSITORY,
  OUTFIT_REPOSITORY,
  POST_REPOSITORY,
} from '../../infrastructure/repositories/repository.tokens';
import { FeedController, CollectionsController, OutfitsController } from './content.controller';
import { ContentService } from './content.service';

@Module({
  controllers: [FeedController, CollectionsController, OutfitsController],
  providers: [
    ContentService,
    { provide: POST_REPOSITORY, useClass: PrismaPostRepository },
    { provide: COLLECTION_REPOSITORY, useClass: PrismaCollectionRepository },
    { provide: OUTFIT_REPOSITORY, useClass: PrismaOutfitRepository },
  ],
})
export class ContentModule {}
