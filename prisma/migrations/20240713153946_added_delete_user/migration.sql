-- AlterEnum
ALTER TYPE "EVerificationOtp" ADD VALUE 'deleteUser';

-- DropForeignKey
ALTER TABLE "CrowdFund" DROP CONSTRAINT "CrowdFund_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_ownById_fkey";

-- DropForeignKey
ALTER TABLE "Flipping" DROP CONSTRAINT "Flipping_ownById_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_replyId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_sendById_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_crowdFundId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_flippingId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_orderById_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_wealthBankId_fkey";

-- DropForeignKey
ALTER TABLE "PromotionInterest" DROP CONSTRAINT "PromotionInterest_ownById_fkey";

-- DropForeignKey
ALTER TABLE "PromotionInterest" DROP CONSTRAINT "PromotionInterest_promotionId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_locationId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyState" DROP CONSTRAINT "PropertyState_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "SavedCrowdFund" DROP CONSTRAINT "SavedCrowdFund_crowdFundId_fkey";

-- DropForeignKey
ALTER TABLE "SavedCrowdFund" DROP CONSTRAINT "SavedCrowdFund_ownById_fkey";

-- DropForeignKey
ALTER TABLE "SavedFlipping" DROP CONSTRAINT "SavedFlipping_flippingId_fkey";

-- DropForeignKey
ALTER TABLE "SavedFlipping" DROP CONSTRAINT "SavedFlipping_ownById_fkey";

-- DropForeignKey
ALTER TABLE "SavedPropertry" DROP CONSTRAINT "SavedPropertry_ownById_fkey";

-- DropForeignKey
ALTER TABLE "SavedPropertry" DROP CONSTRAINT "SavedPropertry_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "SeenMessage" DROP CONSTRAINT "SeenMessage_groupId_fkey";

-- DropForeignKey
ALTER TABLE "SeenMessage" DROP CONSTRAINT "SeenMessage_seenById_fkey";

-- DropForeignKey
ALTER TABLE "VerificationOtp" DROP CONSTRAINT "VerificationOtp_ownById_fkey";

-- AddForeignKey
ALTER TABLE "VerificationOtp" ADD CONSTRAINT "VerificationOtp_ownById_fkey" FOREIGN KEY ("ownById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyState" ADD CONSTRAINT "PropertyState_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedPropertry" ADD CONSTRAINT "SavedPropertry_ownById_fkey" FOREIGN KEY ("ownById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedPropertry" ADD CONSTRAINT "SavedPropertry_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_crowdFundId_fkey" FOREIGN KEY ("crowdFundId") REFERENCES "CrowdFund"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_flippingId_fkey" FOREIGN KEY ("flippingId") REFERENCES "Flipping"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_wealthBankId_fkey" FOREIGN KEY ("wealthBankId") REFERENCES "Bank"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_orderById_fkey" FOREIGN KEY ("orderById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrowdFund" ADD CONSTRAINT "CrowdFund_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCrowdFund" ADD CONSTRAINT "SavedCrowdFund_ownById_fkey" FOREIGN KEY ("ownById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCrowdFund" ADD CONSTRAINT "SavedCrowdFund_crowdFundId_fkey" FOREIGN KEY ("crowdFundId") REFERENCES "CrowdFund"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flipping" ADD CONSTRAINT "Flipping_ownById_fkey" FOREIGN KEY ("ownById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedFlipping" ADD CONSTRAINT "SavedFlipping_ownById_fkey" FOREIGN KEY ("ownById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedFlipping" ADD CONSTRAINT "SavedFlipping_flippingId_fkey" FOREIGN KEY ("flippingId") REFERENCES "Flipping"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_ownById_fkey" FOREIGN KEY ("ownById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionInterest" ADD CONSTRAINT "PromotionInterest_ownById_fkey" FOREIGN KEY ("ownById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionInterest" ADD CONSTRAINT "PromotionInterest_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatGroupId_fkey" FOREIGN KEY ("chatGroupId") REFERENCES "ChatGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sendById_fkey" FOREIGN KEY ("sendById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeenMessage" ADD CONSTRAINT "SeenMessage_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "ChatGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeenMessage" ADD CONSTRAINT "SeenMessage_seenById_fkey" FOREIGN KEY ("seenById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
